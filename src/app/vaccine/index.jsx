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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Vacine() {
  const router = useRouter();
  const { petId, readonly, petName, petPhoto } = useLocalSearchParams();
  const isReadOnly = readonly === "true";

  const [vacineIssues, setVacineIssues] = useState([]);
  const [newIssue, setNewIssue] = useState("");
  const [newDate, setNewDate] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const STORAGE_KEY = `@vacine_issues_${petId}`;

  useEffect(() => {
    if (!petId) return;

    const loadVacineIssues = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setVacineIssues(JSON.parse(storedData));
        }
      } catch (error) {
        console.log("Erro ao carregar vacinas:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadVacineIssues();
  }, [petId]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isReadOnly) return;

    const saveVacineIssues = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vacineIssues));
      } catch (error) {
        console.log("Erro ao salvar vacinas:", error);
      }
    };

    saveVacineIssues();
  }, [vacineIssues, isLoaded, isReadOnly]);

  const handleAdd = () => {
    if (newIssue.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: newIssue,
        date: newDate,
        editing: false,
      };
      setVacineIssues((prev) => [...prev, newItem]);
      setNewIssue("");
      setNewDate("");
      setShowInput(false);
    }
  };

  const handleDelete = (id) => {
    if (isReadOnly) return;
    setVacineIssues((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id, newText, newDateValue, editingState) => {
    setVacineIssues((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              text: newText !== undefined ? newText : item.text,
              date: newDateValue !== undefined ? newDateValue : item.date,
              editing:
                editingState !== undefined ? editingState : item.editing,
            }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerTitle}>Vacinas</Text>
        <View />
      </View>

      <View style={styles.petInfo}>
        <Image
          source={
            petPhoto ? { uri: petPhoto } : require("@/assets/imagens/1.png")
          }
          style={styles.petImage}
        />
        <Text style={styles.petName}>{petName}</Text>
      </View>

      <View style={styles.contentVacine}>
        {!showInput ? (
          <TouchableOpacity
            style={[styles.addIconContainer, isReadOnly && { opacity: 0.3 }]}
            onPress={() => !isReadOnly && setShowInput(true)}
            disabled={isReadOnly}
          >
            <Ionicons name="add" size={28} color="#142A8C" />
          </TouchableOpacity>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vacina aplicada</Text>
            <TextInput
              style={styles.input}
              placeholder="Descreva a vacina..."
              placeholderTextColor="#ccc"
              value={newIssue}
              onChangeText={setNewIssue}
            />

            <Text style={[styles.label, { marginTop: 12 }]}>
              Data de aplicação
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10/02/2025"
              placeholderTextColor="#ccc"
              value={newDate}
              onChangeText={setNewDate}
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
          {vacineIssues.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhuma vacina registrada ainda.
            </Text>
          ) : (
            vacineIssues.map((item) => (
              <View key={item.id} style={styles.itemBox}>
                {item.editing ? (
                  <>
                    <Text style={styles.label}>Vacina aplicada</Text>
                    <TextInput
                      style={styles.input}
                      value={item.text}
                      onChangeText={(text) =>
                        handleEdit(item.id, text, item.date)
                      }
                      placeholder="Descreva a vacina..."
                      placeholderTextColor="#ccc"
                    />

                    <Text style={[styles.label, { marginTop: 10 }]}>
                      Data de aplicação
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={item.date}
                      onChangeText={(date) =>
                        handleEdit(item.id, item.text, date)
                      }
                      placeholder="Ex: 12/03/2025"
                      placeholderTextColor="#ccc"
                    />

                    <TouchableOpacity
                      onPress={() =>
                        handleEdit(item.id, item.text, item.date, false)
                      }
                      style={[styles.addButton, { marginTop: 12 }]}
                    >
                      <Text style={styles.addText}>Salvar edição</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.itemText}>{item.text}</Text>
                    {item.date ? (
                      <Text style={styles.itemDate}>
                        Aplicada em: {item.date}
                      </Text>
                    ) : null}

                    {!isReadOnly && (
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 10,
                          gap: 15,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleEdit(
                              item.id,
                              item.text,
                              item.date,
                              true
                            )
                          }
                        >
                          <MaterialIcons name="edit"
                            size={22}
                            color="#142A8C"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDelete(item.id)}
                        >
                          <MaterialIcons name="delete"
                            size={22}
                            color="red"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdcb58" },

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

  petInfo: { alignItems: "center", marginTop: 25, marginBottom: 10 },

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

  contentVacine: {
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

  inputGroup: { marginBottom: 12 },

  label: {
    color: "#fdcb58",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#fdcb58",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    height: 40,
  },

  addButton: {
    backgroundColor: "#fdcb58",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 14,
    alignItems: "center",
  },

  addText: { 
    color: "black", 
    fontWeight: "bold" 
  },

  list: { marginTop: 8 },

  emptyText: {
    textAlign: "center",
    color: "#fdcb58",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
   
    
  },

  itemBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },

  itemText: { 
    color: "#000", 
    fontSize: 16,
    fontWeight: "bold"
  },

  itemDate: { 
    color: "#000", 
    marginTop: 4, 
    fontSize: 14 
  },
});
