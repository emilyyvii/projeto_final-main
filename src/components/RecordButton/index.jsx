import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome} from "@expo/vector-icons";

export default function ({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
       <FontAwesome  name="paw" size={20} color="#141496" />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#729cf2",
        borderRadius: 16,
        width: "48%",
        padding: 20,
        alignItems: "center",
    },
    text: {
        textAlign:"center",
        fontWeight:"bold",
        color: '#fff',
        fontSize: 20,
    },
  });