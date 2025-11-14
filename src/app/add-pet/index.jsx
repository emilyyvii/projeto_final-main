import { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";
import * as ImagePicker from "expo-image-picker";  

export default function AddPet() {
  const { addPet } = usePetContext();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState(""); // <-- novo campo
  const [photo, setPhoto] = useState("");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !breed || !birthDate || !photo)
      return alert("Preencha todos os campos!");

    const newPet = {
      id: String(Date.now()), 
      name,
      breed,
      birthDate, // <-- salvando data
      photo,
    };

    addPet(newPet);
    router.replace("/mypets");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.arrowBack} onPress={() => router.navigate("/mypets")}>
        <Ionicons name="arrow-back" size={26} color="#fdcb58" />
      </Pressable>

      <Text style={styles.title}>Adicionar Pet</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Foto do Pet:</Text>
        <Pressable style={styles.photoPicker} onPress={handlePickImage}>
          <Ionicons name="image" size={20} color="#141496" />
          <Text style={styles.photoPickerText}>Escolher foto</Text>
        </Pressable>

        {photo ? <Image source={{ uri: photo }} style={styles.preview} /> : null}

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          placeholderTextColor="#ccc"
          value={breed}
          onChangeText={setBreed}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          placeholderTextColor="#ccc"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141496",
    alignItems: "center",
    padding: 20,
  },
  arrowBack: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  title: {
    color: "#fdcb58",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fdcb58",
    width: "95%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    top: 100
  },
  label: {
    fontWeight: "bold",
    color: "#141496",
    marginBottom: 6,
  },
  photoPicker: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  photoPickerText: {
    color: "#141496",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    fontSize: 16,
    color: "#141496",
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#141496",
  },
  saveButton: {
    backgroundColor: "#2e63ce",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
