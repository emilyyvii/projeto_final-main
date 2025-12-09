import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import useUserContext from "../../components/context/useUserContext";
import { Ionicons } from "@expo/vector-icons";

export default function UserProfile() {
  const { user, updateUser, logout } = useUserContext();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", senha: "" });

  useEffect(() => {
    if (user) {
      setForm({
        nome: user.nome || "",
        email: user.email || "",
        telefone: user.telefone || "",
        senha: user.senha || "",
      });
    }
  }, [user]);

  const handleSave = () => {
    if (!form.nome || !form.email) {
      Alert.alert("Atenção", "Nome e email são obrigatórios.");
      return;
    }
    updateUser({ nome: form.nome, email: form.email, telefone: form.telefone, senha: form.senha, login: form.email });
    Alert.alert("Sucesso", "Perfil atualizado.");
    setEditing(false);
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Você não está logado.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/signin")}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-sharp" size={120} color="#142A8C" style={{ marginBottom: 12 }} />

      {editing ? (
        <>
          <TextInput style={styles.input} value={form.nome} onChangeText={(t) => setForm((s) => ({ ...s, nome: t }))} />
          <TextInput style={styles.input} value={form.email} onChangeText={(t) => setForm((s) => ({ ...s, email: t }))} keyboardType="email-address" />
          <TextInput style={styles.input} value={form.telefone} onChangeText={(t) => setForm((s) => ({ ...s, telefone: t }))} />
          <TextInput style={styles.input} value={form.senha} onChangeText={(t) => setForm((s) => ({ ...s, senha: t }))} secureTextEntry />
        </>
      ) : (
        <>
          <Text style={styles.name}>{form.nome}</Text>
          <Text style={styles.email}>{form.email}</Text>
          <Text style={styles.value}>{form.telefone}</Text>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={() => (editing ? handleSave() : setEditing(true))}>
        <Text style={styles.buttonText}>{editing ? "Salvar" : "Editar Perfil"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout}onPress={() => router.back()}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: "#fff", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  center: {
     flex: 1, 
     justifyContent: "center", 
     alignItems: "center" 
    },
  name: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#142A8C"
   },
  email: { 
    fontSize: 16, 
    color: "#555", 
    marginTop: 6 
  },
  value: { 
    fontSize: 16, 
    color: "#333",
    marginTop: 8 
  },
  input: { 
    width: "90%", 
    backgroundColor: "#F2F6FF", 
    padding: 12, borderRadius: 10, 
    marginVertical: 8, borderWidth: 1, 
    borderColor: "#FFCC00", 
    color: "#142A8C" 
  },
  button: { 
    backgroundColor: "#142A8C", 
    padding: 14, 
    borderRadius: 12,
    width: "70%",
    alignItems: "center", 
    marginTop: 12 
    },
  buttonText: { 
    color: "#FFCC00", 
    fontWeight: "bold", 
    fontSize: 16
   },
  logout: { 
    marginTop: 12,
    width: "70%",
    alignItems: "center", 
    padding: 12,
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: "#142A8C" 
  },
  logoutText: {
    color: "#142A8C", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});

 