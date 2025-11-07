import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VacinasScreen() {
  const [vacinas, setVacinas] = useState([]);

  const addVacina = () => {
    const nova = { id: Date.now(), nome: "", aplicacao: "", validade: "" };
    setVacinas([...vacinas, nova]);
  };

  const editarCampo = (id, campo, valor) => {
    setVacinas(
      vacinas.map((v) => (v.id === id ? { ...v, [campo]: valor } : v))
    );
  };

  const excluirVacina = (id) => {
    setVacinas(vacinas.filter((v) => v.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TextInput
        style={[styles.cell, { flex: 2 }]}
        placeholder="Nome da Vacina"
        value={item.nome}
        onChangeText={(t) => editarCampo(item.id, "nome", t)}
      />
      <TextInput
        style={styles.cell}
        placeholder="Data"
        value={item.aplicacao}
        onChangeText={(t) => editarCampo(item.id, "aplicacao", t)}
      />
      <TextInput
        style={styles.cell}
        placeholder="Validade"
        value={item.validade}
        onChangeText={(t) => editarCampo(item.id, "validade", t)}
      />
      <TouchableOpacity onPress={() => excluirVacina(item.id)}>
        <Ionicons name="trash" size={22} color="#fff" style={styles.trash} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
       {/* Topo */}
      <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#fdcb58" />
          </Pressable>
          <Text style={styles.headerTitle}>Informações de contato</Text>
      </View>
      <View style={styles.tableVaccine}>
        {/* Cabeçalho */}
      <View style={[styles.row, styles.columTable]}>
        <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Vacinas</Text>
        <Text style={[styles.cell, { fontWeight: "bold" }]}>Data</Text>
        <Text style={[styles.cell, { fontWeight: "bold" }]}>Validade</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tabela */}
      <FlatList
        data={vacinas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Botão + */}
      <TouchableOpacity style={styles.addButton} onPress={addVacina}>
        <Ionicons name="add" size={28} color="#fdcb58" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb58",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E1E7A",
    marginBottom: 20,
    textAlign: "center",
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
  tableVaccine:{
    marginTop:350,
    width:"90%",
    justifyContent:"center",
     alignSelf: "center",
  },
  columTable: {
    backgroundColor: "#141496",
    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e63ce",
    borderRadius: 10,
    marginVertical: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  cell: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  trash: {
    padding: 6,
  },
  addButton: {
    backgroundColor: "#141496",
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
