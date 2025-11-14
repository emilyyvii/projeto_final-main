import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import usePetContext from "../../components/context/usePetContext";

export default function Food() {
  const { petId } = useLocalSearchParams(); 
  const { pets } = usePetContext();
  const pet = pets.find((p) => String(p.id) === String(petId));

  const [tipoRacao, setTipoRacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [evitar, setEvitar] = useState("");

  const STORAGE_KEY = `@food_data_${petId}`; 

  // Carrega dados do pet específico
  useEffect(() => {
    const loadData = async () => {
      if (!petId) return;
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const data = JSON.parse(savedData);
          setTipoRacao(data.tipoRacao || "");
          setQuantidade(data.quantidade || "");
          setEvitar(data.evitar || "");
        }
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
      }
    };
    loadData();
  }, [petId]);

  // Salva automaticamente ao alterar campos
  useEffect(() => {
    const saveData = async () => {
      if (!petId) return;
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ tipoRacao, quantidade, evitar })
        );
      } catch (error) {
        console.log("Erro ao salvar dados:", error);
      }
    };
    saveData();
  }, [tipoRacao, quantidade, evitar, petId]);

  // Limpa campo individual
  const limparCampo = (campo) => {
    if (campo === "tipoRacao") setTipoRacao("");
    if (campo === "quantidade") setQuantidade("");
    if (campo === "evitar") setEvitar("");
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
          Pet não encontrado
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.titleTop}>Alimentação</Text>
      </View>

      {/* Nome do pet */}
      <Text style={styles.petName}>🐾 {pet.name}</Text>

      {/* Corpo */}
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.title}>Dieta Atual</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Informe o tipo de ração"
              placeholderTextColor="#fff"
              value={tipoRacao}
              onChangeText={setTipoRacao}
            />
            <Pressable onPress={() => limparCampo("tipoRacao")}>
              <Ionicons name="trash" size={22} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Informe a quantidade diária"
              placeholderTextColor="#fff"
              value={quantidade}
              onChangeText={setQuantidade}
            />
            <Pressable onPress={() => limparCampo("quantidade")}>
              <Ionicons name="trash" size={22} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Alimentos a evitar</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Informe os alimentos a evitar"
              placeholderTextColor="#fff"
              value={evitar}
              onChangeText={setEvitar}
            />
            <Pressable onPress={() => limparCampo("evitar")}>
              <Ionicons name="trash" size={22} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7C843" },
  header: {
    backgroundColor: "#142A8C",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 18,
  },
  titleTop: {
    color: "#F7C843",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
  },
  petName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#142A8C",
    marginTop: 25,
  },
  body: { marginTop: 50, alignItems: "center" },
  card: {
    backgroundColor: "#142A8C",
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    width: 350,
  },
  title: {
    color: "#F7C843",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#729cf2",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 8,
  },
});
