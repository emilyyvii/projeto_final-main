import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Food() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.titleTop}>Alimentação</Text>
      </View>
      
      <View style={styles.body}>
        <View style={styles.firstCard}>
          <Text style={styles.title}>Dieta Atual</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe o tipo de ração"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Informe a quantidade diária"
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.secondCard}>
          <Text style={styles.title}>Alimentos a evitar</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe os alimentos a evitar"
            placeholderTextColor="#fff"
          />
        </View>
      </View>
      
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
    color: "#F7C843",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
  },
  body: { marginTop: 200, alignItems: "center" },
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
    color: "#fff",
    marginBottom: 20,
  },
});
