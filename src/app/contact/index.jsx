import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_TELEFONE = "@contact_telefone";
const KEY_EMAIL = "@contact_email";

export default function Contact() {
  const router = useRouter();

  const { readonly, petName, petPhoto } = useLocalSearchParams();

  const isReadOnly = readonly === "true";

  // 🔥 Correção importante:
  // quando petPhoto vem "undefined", "null" ou "", NÃO tenta carregar
  const fotoValida =
    petPhoto &&
    petPhoto !== "undefined" &&
    petPhoto !== "null" &&
    petPhoto !== "";

  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [editandoTelefone, setEditandoTelefone] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem(KEY_TELEFONE);
        const e = await AsyncStorage.getItem(KEY_EMAIL);
        if (t) setTelefone(t);
        if (e) setEmail(e);
      } catch (err) {
        console.warn("Erro ao carregar dados:", err);
      }
    })();
  }, []);

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value ?? "");
    } catch (err) {
      console.warn("Erro ao salvar:", err);
    }
  };

  const toggleEditTelefone = () => {
    if (isReadOnly) return;

    const novo = !editandoTelefone;
    if (editandoTelefone && !novo) {
      saveToStorage(KEY_TELEFONE, telefone);
      Keyboard.dismiss();
    }
    setEditandoTelefone(novo);
  };

  const toggleEditEmail = () => {
    if (isReadOnly) return;

    const novo = !editandoEmail;
    if (editandoEmail && !novo) {
      saveToStorage(KEY_EMAIL, email);
      Keyboard.dismiss();
    }
    setEditandoEmail(novo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>
        <Text style={styles.headerTitle}>Informações de contato</Text>
      </View>

      <View style={styles.petInfo}>
        {fotoValida ? (
          <Image source={{ uri: petPhoto }} style={styles.petImage} />
        ) : (
          // 🔥 fallback só se REALMENTE não tiver foto
          <Image
            source={require("@/assets/imagens/1.png")}
            style={styles.petImage}
          />
        )}

        <Text style={styles.petName}>{petName}</Text>
      </View>

      <View style={styles.Content}>
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Text style={styles.label}>Número de telefone</Text>

            {!isReadOnly && (
              <Pressable onPress={toggleEditTelefone}>
                <MaterialIcons name="edit" size={22} color="#F7C843" />
              </Pressable>
            )}
          </View>

          {editandoTelefone && !isReadOnly ? (
            <TextInput
              style={styles.input}
              placeholder="Digite o novo número..."
              placeholderTextColor="#999"
              value={telefone}
              onChangeText={setTelefone}
              onSubmitEditing={toggleEditTelefone}
              returnKeyType="done"
            />
          ) : (
            <Text style={styles.value}>{telefone || "—"}</Text>
          )}
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Text style={styles.label}>E-mail</Text>

            {!isReadOnly && (
              <Pressable onPress={toggleEditEmail}>
                <MaterialIcons name="edit" size={22} color="#F7C843" />
              </Pressable>
            )}
          </View>

          {editandoEmail && !isReadOnly ? (
            <TextInput
              style={styles.input}
              placeholder="Digite o novo e-mail..."
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={toggleEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
            />
          ) : (
            <Text style={styles.value}>{email || "—"}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7C843" },
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

  Content: { marginTop: 20 },
  infoBox: {
    backgroundColor: "#142A8C",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { color: "#fdcb58", fontSize: 16, fontWeight: "bold" },
  value: { color: "#fff", fontSize: 15 },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
  },
});
