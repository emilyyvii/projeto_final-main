import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { IconPencil, IconTrash } from "../Icons";

export function PetItem({ name, imageUrl, onPressEdit, onPressDelete }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <Text style={styles.name}>{name}</Text>

      <View style={styles.actions}>
        {onPressEdit && (
          <Pressable onPress={onPressEdit}>
            <IconPencil />
          </Pressable>
        )}
        {onPressDelete && (
          <Pressable onPress={onPressDelete}>
            <IconTrash />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#98a0a8",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    marginVertical: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f6c441",
  },
  name: {
    color: "#021123",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});
