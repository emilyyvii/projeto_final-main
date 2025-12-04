import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function VacinasScreen() {
  const router = useRouter();
  const { readonly, petId } = useLocalSearchParams();

  const isReadOnly = readonly === "true";
  const STORAGE_KEY = `@vacinas_${petId}`;

  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    const loadVacinas = async () => {
      if (!petId) return;

      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setVacinas(JSON.parse(saved));
      } catch (err) {
        console.log("Erro ao carregar vacinas:", err);
      }
    };

    loadVacinas();
  }, [petId]);

  useEffect(() => {
    if (isReadOnly) return;

    const saveVacinas = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vacinas));
      } catch (err) {
        console.log("Erro ao salvar vacinas:", err);
      }
    };

    saveVacinas();
  }, [vacinas, isReadOnly]);

  const addVacina = () => {
    if (isReadOnly) return;

    const nova = {
      id: Date.now(),
      nome: "",
      aplicacao: "",
      validade: "",
    };

    setVacinas((prev) => [...prev, nova]);
  };

  const editarCampo = (id, campo, valor) => {
    if (isReadOnly) return;
    setVacinas((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [campo]: valor } : v))
    );
  };

  const excluirVacina = (id) => {
    if (isReadOnly) return;
    setVacinas((prev) => prev.filter((v) => v.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      
      {/* Nome */}
      {!isReadOnly ? (
        <TextInput
          style={[styles.cell, { flex: 2 }]}
          placeholder="Nome da Vacina"
          placeholderTextColor="#ddd"
          value={item.nome}
          onChangeText={(t) => editarCampo(item.id, "nome", t)}
        />
      ) : (
        <Text style={[styles.cell, { flex: 2 }]}>{item.nome || "-"}</Text>
      )}

      {/* Data */}
      {!isReadOnly ? (
        <TextInput
          style={styles.cell}
          placeholder="Data"
          placeholderTextColor="#ddd"
          value={item.aplicacao}
          onChangeText={(t) => editarCampo(item.id, "aplicacao", t)}
        />
      ) : (
        <Text style={styles.cell}>{item.aplicacao || "-"}</Text>
      )}

      {/* Validade */}
      {!isReadOnly ? (
        <TextInput
          style={styles.cell}
          placeholder="Validade"
          placeholderTextColor="#ddd"
          value={item.validade}
          onChangeText={(t) => editarCampo(item.id, "validade", t)}
        />
      ) : (
        <Text style={styles.cell}>{item.validade || "-"}</Text>
      )}

      {/* Lixeira só para o dono */}
      {!isReadOnly && (
        <TouchableOpacity onPress={() => excluirVacina(item.id)}>
          <Ionicons name="trash" size={22} color="#fff" style={styles.trash} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.headerTitle}>Vacinas</Text>
      </View>

      <View style={styles.tableVaccine}>
        <View style={[styles.row, styles.columTable]}>
          <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>
            Vacinas
          </Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Data</Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Validade</Text>
          <View style={{ width: 30 }} />
        </View>

        <ScrollView style={{ maxHeight: 380 }}>
          <FlatList
            data={vacinas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma vacina adicionada</Text>
            }
          />
        </ScrollView>

        {/* Botão de adicionar só para o dono */}
        {!isReadOnly && (
          <TouchableOpacity style={styles.addButton} onPress={addVacina}>
            <Ionicons name="add" size={28} color="#fdcb58" />
          </TouchableOpacity>
        )}
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

  tableVaccine: {
    marginTop: 50,
    width: "90%",
    alignSelf: "center",
  },

  columTable: {
    backgroundColor: "#141496",
    borderRadius: 10,
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
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 10,
    color: "#fff",
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
  },

  emptyText: {
    textAlign: "center",
    color: "#002E9D",
    marginTop: 10,
  },
});
