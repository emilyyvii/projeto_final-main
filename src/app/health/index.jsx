import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import HealthItem from "../../components/HealthItem";

export default function Health() {
  const router = useRouter();
  const { petId, readonly, petName, petPhoto } = useLocalSearchParams();
  const isReadOnly = readonly === "true";

  const [healthIssues, setHealthIssues] = useState([]);
  const [newIssue, setNewIssue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const STORAGE_KEY = `@health_issues_${petId}`;

  useEffect(() => {
    if (!petId) return;

    const loadHealthIssues = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setHealthIssues(JSON.parse(storedData));
        }
      } catch (error) {
        console.log("Erro ao carregar problemas de saúde:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadHealthIssues();
  }, [petId]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isReadOnly) return;

    const saveHealthIssues = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(healthIssues));
      } catch (error) {
        console.log("Erro ao salvar problemas de saúde:", error);
      }
    };
    saveHealthIssues();
  }, [healthIssues, isLoaded, isReadOnly]);

  const handleAdd = () => {
    if (newIssue.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: newIssue,
      };
      setHealthIssues((prev) => [...prev, newItem]);
      setNewIssue("");
      setShowInput(false);
    }
  };

  const handleEdit = (id, newText) => {
    setHealthIssues((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  const handleDelete = (id) => {
    if (isReadOnly) return;
    setHealthIssues((prev) => prev.filter((item) => item.id !== id));
  };

  if (!petId) {
    return (
      <View
        style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      >
        <Text style={{ color: "#fff" }}>Pet não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerTitle}>Problemas de Saúde</Text>
        <View />
      </View>

      <View style={styles.petInfo}>
        <Image
          source={petPhoto ? { uri: petPhoto } : require("@/assets/imagens/1.png")}
          style={styles.petImage}
        />
        <Text style={styles.petName}>{petName}</Text>
      </View>

      <View style={styles.contentHealth}>
        {!showInput ? (
          <TouchableOpacity
            style={[styles.addIconContainer, isReadOnly && { opacity: 0.3 }]}
            onPress={() => !isReadOnly && setShowInput(true)}
            disabled={isReadOnly}
          >
            <Ionicons name="add" size={28} color="#142A8C" />
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAdd}
              disabled={isReadOnly}
            >
              <Text style={styles.addText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={styles.list}>
          {healthIssues.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum problema registrado ainda.</Text>
          ) : (
            healthIssues.map((item) => (
              <HealthItem
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isReadOnly={isReadOnly}
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

  contentHealth: {
    backgroundColor: "#142A8C",
    borderRadius: 14,
    padding: 16,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  addIconContainer: {
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: "#fdcb58",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
