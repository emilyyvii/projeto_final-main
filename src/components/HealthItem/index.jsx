import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HealthItem({ item, onEdit, onDelete, isReadOnly }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(item.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.itemContainer}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            placeholder="Editar problema..."
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <MaterialIcons name="check" size={22} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.text}>{item.text}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => !isReadOnly && setIsEditing(true)}
              style={{ opacity: isReadOnly ? 0.3 : 1 }}
            >
              <MaterialIcons
                name="edit"
                size={22}
                color={isReadOnly ? "transparent" : "#002E9D"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => !isReadOnly && onDelete(item.id)}
              style={{ opacity: isReadOnly ? 0.3 : 1 }}
            >
              <MaterialIcons
                name="delete"
                size={22}
                color={isReadOnly ? "transparent" : "#E53935"}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "column",
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#fdcb58",
    marginLeft: 6,
    borderRadius: 8,
    padding: 6,
  },
});
