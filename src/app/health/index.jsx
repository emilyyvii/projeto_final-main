import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useHealth } from "../../components/context/HealthProvinder";
import HealthItem from "../../components/HealthItem";
 
export default function Health() {
  const router = useRouter();
  const { healthIssues, addIssue, editIssue, deleteIssue } = useHealth();
  const [newIssue, setNewIssue] = useState("");
  const [showInput, setShowInput] = useState(false);
 
  const handleAdd = () => {
    if (newIssue.trim()) {
      addIssue(newIssue);
      setNewIssue("");
      setShowInput(false);
    }
  };
 
  return (
    <View style={styles.container}>
      {/* ======= Header com seta de voltar ======= */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#fdcb58" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Problemas de Saúde</Text>
        <View/>
      </View>
 
    <View style={styles.contentHealth}>
        {/* ======= Botão de adicionar ======= */}
      {!showInput ? (
        <TouchableOpacity
          style={styles.addIconContainer}
          onPress={() => setShowInput(true)}
        >
          <MaterialIcons name="add-circle" size={42} color="#fdcb58" />
        </TouchableOpacity>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Descreva um problema de saúde..."
            placeholderTextColor="#aaa"
            value={newIssue}
            onChangeText={setNewIssue}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
 
      {/* ======= Lista ======= */}
      <ScrollView style={styles.list}>
        {healthIssues.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum problema registrado ainda.</Text>
        ) : (
          healthIssues.map((item) => (
            <HealthItem
              key={item.id}
              item={item}
              onEdit={editIssue}
              onDelete={deleteIssue}
            />
          ))
        )}
      </ScrollView>
    </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb58",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002E9D",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
    contentHealth: {
        backgroundColor: "#142A8C",
        borderRadius: 14,
        padding: 16,
        justifyContent: "center",
        width: "90%",
        height: "auto",
        alignSelf: "center",
        marginTop: 350,
    },
  addIconContainer: {
    alignSelf: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fdcb58",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fdcb58",
  },
  addButton: {
    backgroundColor: "#fdcb58",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 6,
  },
  addText: {
    color: "black",
    fontWeight: "bold",
  },
  list: {
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#fdcb58",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
  },
});