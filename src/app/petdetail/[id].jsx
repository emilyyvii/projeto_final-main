import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import usePetContext from "../../components/context/usePetContext";
import { Ionicons } from "@expo/vector-icons";
import RecordButton from "../../components/RecordButton";
import Footer from "../../components/Footer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function PetDetail() {
  const { id, readonly } = useLocalSearchParams();

  const isReadOnly = readonly === "true";

  const { pets, updatePet, deletePet } = usePetContext();

  const pet = pets.find((p) => p.id === id);

  const [photo, setPhoto] = useState(pet?.photo || "");

  if (!pet)
    return (
      <View>
        <Text>Pet não encontrado</Text>
      </View>
    );

  const handlePickImage = async () => {
    if (isReadOnly)
      return Alert.alert(
        "Acesso Restrito",
        "Apenas o dono pode alterar a foto do pet."
      );

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setPhoto(newUri);
      updatePet(pet.id, { photo: newUri });
    }
  };

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "—";

    const [dia, mes, ano] = dataNascimento.split("/").map(Number);
    const nascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (
      hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() &&
        hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  const idade = calcularIdade(pet.birthDate);

  const handleDelete = () => {
    if (isReadOnly)
      return Alert.alert(
        "Acesso Restrito",
        "Apenas o dono pode excluir o pet."
      );

    Alert.alert("Excluir Pet", `Tem certeza que deseja excluir ${pet.name}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deletePet(pet.id);
          router.replace("/mypets");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Pressable style={styles.arrowBack} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>

        <Pressable onPress={handlePickImage} disabled={isReadOnly}>
          <Image
            source={photo ? { uri: photo } : require("@/assets/imagens/1.png")}
            style={[styles.image, isReadOnly && { opacity: 0.6 }]}
          />
        </Pressable>

        <Text style={styles.name}>{pet.name}</Text>

        <View style={styles.ageBox}>
          <Text style={styles.age}>{pet.breed}</Text>
          <Text style={styles.age}>{idade} anos</Text>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Text style={styles.text}>Ficha do Animal</Text>

        <View style={styles.grid}>
  <RecordButton
    title="Contato"
    onPress={() =>
      router.push({
        pathname: "/contact",
        params: {
          readonly: String(isReadOnly),
          petId: String(pet.id),
          petName: pet.name,
          petPhoto: photo,
        },
      })
    }
  />

  <RecordButton
    title="Problemas de Saúde"
    onPress={() =>
      router.push({
        pathname: "/health",
        params: {
          readonly: String(isReadOnly),
          petId: String(pet.id),
          petName: pet.name,
          petPhoto: photo,
        },
      })
    }
  />

  <RecordButton
    title="Vacinas"
    onPress={() =>
      router.push({
        pathname: "/vaccine",
        params: {
          readonly: String(isReadOnly),
          petId: String(pet.id),
          petName: pet.name,
          petPhoto: photo,
        },
      })
    }
  />

  <RecordButton
    title="Alimentação"
    onPress={() =>
      router.push({
        pathname: "/food",
        params: {
          readonly: String(isReadOnly),
          petId: String(pet.id),
          petName: pet.name,
          petPhoto: photo,
        },
      })
    }
  />
</View>


        {!isReadOnly && (
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteText}>Excluir Pet</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.footer}>
        <Footer text="Apaixonados por animais" textColor="#fff" showImage={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141496",
    alignItems: "center",
    paddingTop: 10,
  },
  containerInfo: {
    backgroundColor: "#2e63ce",
    borderRadius: 16,
    width: "90%",
    maxWidth: 380,
    marginTop: 50,
    paddingVertical: 25,
    paddingHorizontal: 20,
    position: "relative",
  },
  arrowBack: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 15,
  },
  ageBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    gap: 15,
  },
  age: {
    backgroundColor: "#5B8DEE",
    color: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  containerButton: {
    backgroundColor: "#FEC744",
    borderRadius: 16,
    width: "90%",
    maxWidth: 380,
    marginTop: 25,
    padding: 20,
    flex: 1,
    maxHeight: 350,
    gap: 10,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#729cf2",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 13,
  },
  deleteButton: {
    marginTop: 25,
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    borderRadius: 12,
    top: 10,
  },
  deleteText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    top: 80,
  },
});
