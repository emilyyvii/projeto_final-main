import {View,Text,Image,TextInput,StyleSheet,Pressable,TouchableOpacity,ScrollView} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function Food() {
  const { petId, readonly, petName, petPhoto } = useLocalSearchParams();
  const isReadOnly = readonly === "true";

  const [dietItems, setDietItems] = useState([]);
  const [avoidItems, setAvoidItems] = useState([]);

  const [newFood, setNewFood] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [showDietInput, setShowDietInput] = useState(false);

  const [newAvoid, setNewAvoid] = useState("");
  const [showAvoidInput, setShowAvoidInput] = useState(false);

  const STORAGE_KEY = `@food_lists_${petId}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setDietItems(data.dietItems || []);
          setAvoidItems(data.avoidItems || []);
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
        JSON.stringify({ dietItems, avoidItems })
      );
    };

    saveData();
  }, [dietItems, avoidItems, isReadOnly]);

  const addDietItem = () => {
    if (!newFood.trim() || !newQuantity.trim()) return;

    setDietItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        food: newFood,
        quantity: newQuantity,
        editing: false,
      },
    ]);

    setNewFood("");
    setNewQuantity("");
    setShowDietInput(false);
  };

  const addAvoidItem = () => {
    if (!newAvoid.trim()) return;

    setAvoidItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newAvoid, editing: false },
    ]);

    setNewAvoid("");
    setShowAvoidInput(false);
  };

  const toggleEditDiet = (id) => {
    setDietItems((items) =>
      items.map((it) =>
        it.id === id ? { ...it, editing: !it.editing } : it
      )
    );
  };

  const saveDietEdit = (id, newFood, newQuantity) => {
    setDietItems((items) =>
      items.map((it) =>
        it.id === id
          ? { ...it, food: newFood, quantity: newQuantity, editing: false }
          : it
      )
    );
  };

  const deleteDiet = (id) => {
    if (isReadOnly) return;
    setDietItems((items) => items.filter((it) => it.id !== id));
  };

  const toggleEditAvoid = (id) => {
    setAvoidItems((items) =>
      items.map((it) =>
        it.id === id ? { ...it, editing: !it.editing } : it
      )
    );
  };

  const saveAvoidEdit = (id, newText) => {
    setAvoidItems((items) =>
      items.map((it) =>
        it.id === id ? { ...it, text: newText, editing: false } : it
      )
    );
  };

  const deleteAvoid = (id) => {
    if (isReadOnly) return;
    setAvoidItems((items) => items.filter((it) => it.id !== id));
  };

  if (!petId) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", marginTop: 50 }}>Pet não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.titleTop}>Alimentação</Text>
      </View>

      {/* --- FOTO DO PET IGUAL HEALTH --- */}
      <Image
        source={
          petPhoto
            ? { uri: petPhoto }
            : require("@/assets/imagens/1.png")
        }
        style={styles.petImage}
      />

      {/* --- NOME DO PET IGUAL HEALTH --- */}
      <Text style={styles.petName}>{petName}</Text>

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 70 }}>
        
        {/* ----------- DIETA ----------- */}
        <View style={styles.card}>
          <Text style={styles.title}>Dieta Atual</Text>

          {!showDietInput && !isReadOnly && (
            <TouchableOpacity
              style={styles.addIconContainer}
              onPress={() => setShowDietInput(true)}
            >
              <Ionicons name="add" size={28} color="#142A8C" />
            </TouchableOpacity>
          )}

          {showDietInput && !isReadOnly && (
            <View style={{ marginBottom: 10 }}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Alimento"
                  placeholderTextColor="#000"
                  value={newFood}
                  onChangeText={setNewFood}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Quantidade"
                  placeholderTextColor="#000"
                  value={newQuantity}
                  onChangeText={setNewQuantity}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={addDietItem}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}

          {dietItems.map((item) => (
            <View key={item.id} style={styles.listItem}>
              {item.editing ? (
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.inputRow}
                    placeholder="Alimento"
                    placeholderTextColor="#000"
                    value={item.food}
                    onChangeText={(t) =>
                      setDietItems((prev) =>
                        prev.map((it) =>
                          it.id === item.id ? { ...it, food: t } : it
                        )
                      )
                    }
                  />
                  <TextInput
                    style={styles.inputRow}
                    placeholder="Quantidade"
                    placeholderTextColor="#000"
                    value={item.quantity}
                    onChangeText={(t) =>
                      setDietItems((prev) =>
                        prev.map((it) =>
                          it.id === item.id ? { ...it, quantity: t } : it
                        )
                      )
                    }
                  />

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() =>
                      saveDietEdit(item.id, item.food, item.quantity)
                    }
                  >
                    <Text style={styles.saveText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.itemText}>{item.food}</Text>
                    <Text style={styles.itemTextSmall}>{item.quantity}</Text>
                  </View>

                  {!isReadOnly && (
                    <View style={styles.iconRow}>
                      <Pressable onPress={() => toggleEditDiet(item.id)}>
                        <MaterialIcons name="edit" size={22} color="#142A8C" />
                      </Pressable>

                      <Pressable onPress={() => deleteDiet(item.id)}>
                        <MaterialIcons
                          name="delete"
                          size={22}
                          color="red"
                          style={{ marginLeft: 10 }}
                        />
                      </Pressable>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ----------- ALIMENTOS A EVITAR ----------- */}
        <View style={styles.card}>
          <Text style={styles.title}>Alimentos a evitar</Text>

          {!showAvoidInput && !isReadOnly && (
            <TouchableOpacity
              style={styles.addIconContainer}
              onPress={() => setShowAvoidInput(true)}
            >
              <Ionicons name="add" size={28} color="#142A8C" />
            </TouchableOpacity>
          )}

          {showAvoidInput && !isReadOnly && (
            <View style={{ marginBottom: 10 }}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Alimento proibido"
                  placeholderTextColor="#000"
                  value={newAvoid}
                  onChangeText={setNewAvoid}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={addAvoidItem}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}

          {avoidItems.map((item) => (
            <View key={item.id} style={styles.listItem}>
              {item.editing ? (
                <View>
                  <TextInput
                    style={styles.inputRow}
                    placeholder="Alimento"
                    placeholderTextColor="#000"
                    value={item.text}
                    onChangeText={(t) =>
                      setAvoidItems((prev) =>
                        prev.map((it) =>
                          it.id === item.id ? { ...it, text: t } : it
                        )
                      )
                    }
                  />

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => saveAvoidEdit(item.id, item.text)}
                  >
                    <Text style={styles.saveText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.rowBetween}>
                  <Text style={styles.itemText}>{item.text}</Text>

                  {!isReadOnly && (
                    <View style={styles.iconRow}>
                      <Pressable onPress={() => toggleEditAvoid(item.id)}>
                        <MaterialIcons name="edit" size={22} color="#142A8C" />
                      </Pressable>

                      <Pressable onPress={() => deleteAvoid(item.id)}>
                        <MaterialIcons
                          name="delete"
                          size={22}
                          color="red"
                          style={{ marginLeft: 10 }}
                        />
                      </Pressable>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

      </ScrollView>
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

  // --- MESMOS DO HEALTH ---
  petImage: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 3,
    borderColor: "#002E9D",
    alignSelf: "center",
    marginTop: 25,
  },

  petName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#142A8C",
    marginTop: 15,
  },

  card: {
    backgroundColor: "#142A8C",
    marginTop: 35,
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

  addIconContainer: {
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: "#fdcb58",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  inputRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#000",
    paddingVertical: 8,
  },

  input: {
    color: "#000",
  },

  saveButton: {
    backgroundColor: "#fdcb58",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
  },

  saveText: {
    fontWeight: "bold",
    color: "#142A8C",
  },

  listItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  itemTextSmall: {
    color: "#000",
    fontSize: 14,
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
