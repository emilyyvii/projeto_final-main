import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import usePetContext from "../../components/context/usePetContext";

export default function VacinasScreen() {
  const router = useRouter();

  const { readonly, petId, petName: paramPetName, petPhoto: paramPetPhoto } =
    useLocalSearchParams();
  const isReadOnly = readonly === "true";
  const STORAGE_KEY = `@vacinas_${petId}`;

  const { pets } = usePetContext();
  const petFromContext = pets.find((p) => String(p.id) === String(petId));
  const petName = paramPetName ?? petFromContext?.name ?? "";
  const petPhoto = paramPetPhoto ?? petFromContext?.photo ?? "";

  const [vacinas, setVacinas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!petId) return;
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setVacinas(JSON.parse(saved));
      } catch (err) {
        console.log("Erro ao carregar vacinas:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    load();
  }, [petId]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isReadOnly) return;
    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vacinas));
      } catch (err) {
        console.log("Erro ao salvar vacinas:", err);
      }
    };
    save();
  }, [vacinas, isLoaded, isReadOnly]);

  const addVacina = () => {
    if (isReadOnly) return;
    const nova = {
      id: Date.now().toString(),
      nome: "",
      aplicacao: "",
      validade: "",
    };
    setVacinas((prev) => [...prev, nova]);
  };

  const editarCampo = (id, campo, valor) => {
    if (isReadOnly) return;
    setVacinas((prev) => prev.map((v) => (v.id === id ? { ...v, [campo]: valor } : v)));
  };

  const excluirVacina = (id) => {
    if (isReadOnly) return;
    setVacinas((prev) => prev.filter((v) => v.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TextInput
        style={[styles.cell, { flex: 2, color: isReadOnly ? "#ccc" : "#fff" }]}
        placeholder="Nome da Vacina"
        placeholderTextColor={isReadOnly ? "#999" : "#ddd"}
        value={item.nome}
        editable={!isReadOnly}
        onChangeText={(t) => editarCampo(item.id, "nome", t)}
      />

      <TextInput
        style={[styles.cell, { color: isReadOnly ? "#ccc" : "#fff" }]}
        placeholder="Data"
        placeholderTextColor={isReadOnly ? "#999" : "#ddd"}
        value={item.aplicacao}
        editable={!isReadOnly}
        onChangeText={(t) => editarCampo(item.id, "aplicacao", t)}
      />

      <TextInput
        style={[styles.cell, { color: isReadOnly ? "#ccc" : "#fff" }]}
        placeholder="Validade"
        placeholderTextColor={isReadOnly ? "#999" : "#ddd"}
        value={item.validade}
        editable={!isReadOnly}
        onChangeText={(t) => editarCampo(item.id, "validade", t)}
      />

      {!isReadOnly && (
        <TouchableOpacity onPress={() => excluirVacina(item.id)}>
          <Ionicons name="trash" size={22} color="#fff" style={styles.trash} />
        </TouchableOpacity>
      )}
    </View>
  );

  if (!petId) {
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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.headerTitle}>Vacinas</Text>
      </View>

      <View style={styles.petInfo}>
        <Image
          source={petPhoto ? { uri: petPhoto } : require("@/assets/imagens/1.png")}
          style={styles.petImage}
        />
        <Text style={styles.petName}>{petName}</Text>
      </View>

      <View style={styles.tableVaccine}>
        <View style={[styles.row, styles.columTable]}>
          <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Vacinas</Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Data</Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Validade</Text>
          <View style={{ width: 30 }} />
        </View>

        <FlatList
          data={vacinas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ maxHeight: 360 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma vacina cadastrada</Text>
          }
        />

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

  /* FOTO + NOME */
  petInfo: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  petImage: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 3,
    borderColor: "#002E9D",
  },
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#002E9D",
    marginTop: 10,
  },

  tableVaccine: {
    marginTop: 25,
    width: "90%",
    alignSelf: "center",
    flex: 1,
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
