import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import usePetContext from "../../components/context/usePetContext";
import { Ionicons } from "@expo/vector-icons";
import RecordButton from "../../components/RecordButton";
import Footer from "../../components/Footer";
import * as ImagePicker from "expo-image-picker";

export default function PetDetail() {
  const { id, readonly } = useLocalSearchParams();
  const isReadOnly = readonly === "true";

  const { pets, updatePetImage, getPetById } = usePetContext();
  const pet = getPetById(id);

  const [photo, setPhoto] = useState(pet?.photo || "");

  useEffect(() => setPhoto(pet?.photo || ""), [pet]);

  if (!pet) return <Text style={{ padding: 20 }}>Pet não encontrado</Text>;

  const handlePickImage = async () => {
    if (isReadOnly) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      updatePetImage(pet.id, uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Pressable style={styles.arrowBack} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>

        {/* FOTO – apenas isso fica bloqueado no modo readonly */}
        <Pressable onPress={handlePickImage} disabled={isReadOnly}>
          <Image
            source={photo ? { uri: photo } : require("@/assets/imagens/1.png")}
            style={[styles.image, isReadOnly && { opacity: 0.6 }]}
          />
        </Pressable>

        <Text style={styles.name}>{pet.name}</Text>

        <View style={styles.ageBox}>
          <Text style={styles.age}>{pet.breed}</Text>
          <Text style={styles.age}>{pet.age} anos</Text>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Text style={styles.text}>Ficha do Animal</Text>
        <View style={styles.grid}>
          <RecordButton
            title={"Contato"}
            onPress={() => router.navigate("/contact")}
          />

          <RecordButton
            title={"Problemas de Saúde"}
            onPress={() =>
              router.push({ pathname: "/health", params: { petId: String(pet.id) } })
            }
          />

          <RecordButton
            title={"Vacinas"}
            onPress={() => router.navigate("/vaccine")}
          />

          <RecordButton
            title={"Alimentação"}
            onPress={() =>
              router.push({ pathname: "/food", params: { petId: String(pet.id) } })
            }
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Footer text="Apaixonados por animais" textColor="#fff" showImage={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141496", alignItems: "center", paddingTop: 10 },
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
  arrowBack: { position: "absolute", top: 15, left: 15, zIndex: 10, padding: 5 },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#fff", marginTop: 15 },
  ageBox: { flexDirection: "row", justifyContent: "center", marginVertical: 15, gap: 15 },
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
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 13 },
  footer: { top: 60 },
});
