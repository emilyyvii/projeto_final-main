import { useState, useEffect } from "react";
import { View, Pressable, Text, TextInput, StyleSheet, Image, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePetContext from "../../components/context/usePetContext";

const KEY_RACAO = "@food_racao";
const KEY_QUANTIDADE = "@food_quantidade";
const KEY_EVITAR = "@food_evitar";

export default function Food() {
  const { id, tipo } = useLocalSearchParams();
  const podeEditar = tipo === "dono";

  const { getPetById } = usePetContext();
  const pet = getPetById(id);

  const [racao, setRacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [evitar, setEvitar] = useState("");

  const [editandoRacao, setEditandoRacao] = useState(false);
  const [editandoQuantidade, setEditandoQuantidade] = useState(false);
  const [editandoEvitar, setEditandoEvitar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await AsyncStorage.getItem(KEY_RACAO);
        const q = await AsyncStorage.getItem(KEY_QUANTIDADE);
        const e = await AsyncStorage.getItem(KEY_EVITAR);
        if (r) setRacao(r);
        if (q) setQuantidade(q);
        if (e) setEvitar(e);
      } catch (err) {
        console.warn("Erro ao carregar dados:", err);
      }
    })();
  }, []);

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value ?? "");
    } catch (err) {
      console.warn("Erro ao salvar:", err);
    }
  };

  const toggleEditRacao = () => {
    if (!podeEditar) return;
    const novo = !editandoRacao;
    if (editandoRacao && !novo) {
      saveToStorage(KEY_RACAO, racao);
      Keyboard.dismiss();
    }
    setEditandoRacao(novo);
  };

  const toggleEditQuantidade = () => {
    if (!podeEditar) return;
    const novo = !editandoQuantidade;
    if (editandoQuantidade && !novo) {
      saveToStorage(KEY_QUANTIDADE, quantidade);
      Keyboard.dismiss();
    }
    setEditandoQuantidade(novo);
  };

  const toggleEditEvitar = () => {
    if (!podeEditar) return;
    const novo = !editandoEvitar;
    if (editandoEvitar && !novo) {
      saveToStorage(KEY_EVITAR, evitar);
      Keyboard.dismiss();
    }
    setEditandoEvitar(novo);
  };

  if (!pet) return <Text>Pet não encontrado</Text>;

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.titleTop}>Alimentação</Text>
      </View>

      {/* Foto e Nome */}
      <View style={styles.petInfo}>
        <Image source={{ uri: pet.photo }} style={styles.image} />
        <Text style={styles.petName}>{pet.name}</Text>
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        {/* Dieta Atual */}
        <View style={styles.firstCard}>
          <Text style={styles.title}>Dieta Atual</Text>

          <View style={styles.row}>
            {editandoRacao && podeEditar ? (
              <TextInput
                style={styles.input}
                placeholder="Informe o tipo de ração"
                placeholderTextColor="#fff"
                value={racao}
                onChangeText={setRacao}
                onSubmitEditing={toggleEditRacao}
              />
            ) : (
              <Text style={styles.textValue}>
                {racao || "Tipo de Ração não informado"}
              </Text>
            )}
            {podeEditar && (
              <Pressable onPress={toggleEditRacao}>
                <Ionicons name="pencil" size={20} color="#fdcb58" />
              </Pressable>
            )}
          </View>

          <View style={styles.row}>
            {editandoQuantidade && podeEditar ? (
              <TextInput
                style={styles.input}
                placeholder="Informe a quantidade diária"
                placeholderTextColor="#fff"
                value={quantidade}
                onChangeText={setQuantidade}
                onSubmitEditing={toggleEditQuantidade}
              />
            ) : (
              <Text style={styles.textValue}>
                {quantidade || "Quantidade não informada"}
              </Text>
            )}
            {podeEditar && (
              <Pressable onPress={toggleEditQuantidade}>
                <Ionicons name="pencil" size={20} color="#fdcb58" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Alimentos a evitar */}
        <View style={styles.secondCard}>
          <Text style={styles.title}>Alimentos a evitar</Text>

          <View style={styles.row}>
            {editandoEvitar && podeEditar ? (
              <TextInput
                style={styles.input}
                placeholder="Informe os alimentos a evitar"
                placeholderTextColor="#fff"
                value={evitar}
                onChangeText={setEvitar}
                onSubmitEditing={toggleEditEvitar}
              />
            ) : (
              <Text style={styles.textValue}>
                {evitar || "Nenhum alimento informado"}
              </Text>
            )}
            {podeEditar && (
              <Pressable onPress={toggleEditEvitar}>
                <Ionicons name="pencil" size={20} color="#fdcb58" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7C843",
  },
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
  petInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#142A8C",
  },
  petName: {
    fontSize: 26,
    color: "#142A8C",
    fontWeight: "bold",
    marginTop: 10,
  },
  body: {
    marginTop: 20,
    alignItems: "center",
  },
  firstCard: {
    backgroundColor: "#142A8C",
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    width: 350,
  },
  secondCard: {
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
  input: {
    backgroundColor: "#729cf2",
    borderRadius: 10,
    padding: 8,
    flex: 1,
    color: "#fff",
  },
  textValue: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#729cf2",
    borderRadius: 10,
    marginVertical: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
