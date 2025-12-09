import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import usePetContext from "../../components/context/usePetContext";

export default function Food() {
  const { petId, readonly } = useLocalSearchParams();
  const isReadOnly = readonly === "true";

  const { pets } = usePetContext();
  const pet = pets.find((p) => String(p.id) === String(petId));

  const [tipoRacao, setTipoRacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [evitar, setEvitar] = useState("");

  const STORAGE_KEY = `@food_data_${petId}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setTipoRacao(data.tipoRacao || "");
          setQuantidade(data.quantidade || "");
          setEvitar(data.evitar || "");
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [petId]);

  useEffect(() => {
    if (isReadOnly) return;
    const saveData = async () => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ tipoRacao, quantidade, evitar })
      );
    };
    saveData();
  }, [tipoRacao, quantidade, evitar, petId, isReadOnly]);

  const limparCampo = (campo) => {
    if (isReadOnly) return;

    if (campo === "tipoRacao") setTipoRacao("");
    if (campo === "quantidade") setQuantidade("");
    if (campo === "evitar") setEvitar("");
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", marginTop: 50 }}>Pet não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.titleTop}>Alimentação</Text>
      </View>

      {/* Pet name */}
      <Text style={styles.petName}>🐾 {pet.name}</Text>

      <View style={styles.body}>
        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={styles.title}>Dieta Atual</Text>

          {/* Tipo ração */}
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, isReadOnly && styles.inputDisabled]}
              placeholder="Informe o tipo de ração"
              placeholderTextColor="#fff"
              value={tipoRacao}
              editable={!isReadOnly}
              onChangeText={setTipoRacao}
            />
            {!isReadOnly && (
              <Pressable onPress={() => limparCampo("tipoRacao")}>
                <Ionicons name="trash" size={22} color="#fff" />
              </Pressable>
            )}
          </View>

          {/* Quantidade */}
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, isReadOnly && styles.inputDisabled]}
              placeholder="Informe a quantidade diária"
              placeholderTextColor="#fff"
              value={quantidade}
              editable={!isReadOnly}
              onChangeText={setQuantidade}
            />
            {!isReadOnly && (
              <Pressable onPress={() => limparCampo("quantidade")}>
                <Ionicons name="trash" size={22} color="#fff" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={styles.title}>Alimentos a evitar</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, isReadOnly && styles.inputDisabled]}
              placeholder="Informe os alimentos a evitar"
              placeholderTextColor="#fff"
              value={evitar}
              editable={!isReadOnly}
              onChangeText={setEvitar}
            />
            {!isReadOnly && (
              <Pressable onPress={() => limparCampo("evitar")}>
                <Ionicons name="trash" size={22} color="#fff" />
              </Pressable>
            )}
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
    color: "#fff",
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
  inputDisabled: {
    opacity: 0.5,
  },
});
