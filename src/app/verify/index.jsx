import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import usePetContext from "../../components/context/usePetContext";

export default function Verify() {
  const { getPetById } = usePetContext();
  const { mode } = useLocalSearchParams(); 

  const [code, setCode] = useState("");

  function handleAccess() {
    if (!code.trim()) {
      Alert.alert("Código inválido", "Digite um código válido.");
      return;
    }

    const pet = getPetById(code.trim());

    if (!pet) {
      Alert.alert("Pet não encontrado", "Nenhum pet foi encontrado com esse código.");
      return;
    }

    if (mode === "professional") {
      router.push({
        pathname: `/petdetail/${pet.id}`,
        params: { readonly: "true" },
      });
      return;
    }

    if (mode === "found") {
      router.push({
        pathname: "/contact",
        params: {
          readonly: "true",
          petId: String(pet.id),
          petName: pet.name,
          petPhoto: pet.photo || "",
        },
      });
      return;
    }

    Alert.alert("Erro", "Modo de acesso inválido. Tente novamente.");
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.arrowBack} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fdcb58" />
      </Pressable>

      <Text style={styles.title}>Verificar Informações do Pet</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o código do pet"
        placeholderTextColor="#ccc"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleAccess}>
        <Text style={styles.buttonText}>Acessar Informações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141496",
    padding: 20,
    justifyContent: "center",
  },
  arrowBack: {
    bottom: 280,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FEC744",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#142A8C",
    fontSize: 18,
    fontWeight: "bold",
  },
});
