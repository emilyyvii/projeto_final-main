import { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";

export default function AddPet() {
  const { addPet } = usePetContext();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSave = () => {
    if (!name || !breed || !age || !photo)
      return alert("Preencha todos os campos!");
    addPet({ name, breed, age, photo });
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
        <TextInput
          style={styles.input}
          placeholder="URL da Foto"
          placeholderTextColor="#ccc"
          value={photo}
          onChangeText={setPhoto}
        />
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
          placeholder="Idade"
          placeholderTextColor="#ccc"
          value={age}
          onChangeText={setAge}
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
    backgroundColor: "#141496", // azul de fundo
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
