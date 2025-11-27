import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";

export default function Verify() {
  const { getPetById } = usePetContext();
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

    router.push({
      pathname: `/petdetail/${pet.id}`,
      params: { readonly: "true" },
    });
  }

  return (
    <View style={styles.container}>
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
