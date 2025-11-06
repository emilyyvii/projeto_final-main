import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Footer({ text, textColor = "#000", showImage = false }) {
  return (
    <View style={styles.container}>
      {showImage && (
        <Image
          source={require("@/assets/imagens/2.png")} 
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 45,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});

