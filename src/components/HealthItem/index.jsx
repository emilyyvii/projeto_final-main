import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isReadOnly && isEditing) {
      setIsEditing(false);
      setEditedText(item.text);
    }
  }, [isReadOnly]);

  const handleSave = () => {
    if (!isReadOnly && editedText.trim()) {
      onEdit(item.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.itemContainer}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[
              styles.input,
              isReadOnly && { opacity: 0.4 }
            ]}
            value={editedText}
            onChangeText={setEditedText}
            placeholder="Editar problema..."
            editable={!isReadOnly}
          />

          {!isReadOnly && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <MaterialIcons name="check" size={22} color="black" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.text}>{item.text}</Text>

          {!isReadOnly && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <MaterialIcons name="edit" size={22} color="#002E9D" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <MaterialIcons name="delete" size={22} color="#E53935" />
              </TouchableOpacity>
            </View>
          )}
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
