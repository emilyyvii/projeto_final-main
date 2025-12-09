import Button from "@/components/Button";
import { router } from "expo-router";
import {Image,View,Text,Pressable,StyleSheet,TextInput,Alert,KeyboardAvoidingView,Platform,} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import { useState } from "react";
import useUserContext from "../../components/context/useUserContext";

export default function SignUp() {
  const { register } = useUserContext();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const handleCreateAccount = () => {
    if (!nome || !email || !telefone || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Atenção", "Digite um e-mail válido.");
      return;
    }

    register({ nome, email, telefone, senha, login: email }); 
    Alert.alert("Sucesso", "Conta criada! Agora faça login.");
    router.replace("/signin");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Pressable style={styles.arrowBack} onPress={() => router.navigate("/signin")}>
        <Ionicons name="arrow-back" size={24} color={stylesColors.highlight} />
      </Pressable>

      <Image style={styles.image} source={require("@/assets/imagens/1.png")} />

      <View style={styles.card}>
        <View style={styles.socialContainer}>
          <FontAwesome name="google" size={40} color={stylesColors.google} />
          <FontAwesome name="facebook" size={40} color={stylesColors.facebook} />
          <Ionicons name="mail" size={40} color={stylesColors.textPrimary} />
        </View>

        <Text style={styles.title}>Bem vindo(a)!</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color={stylesColors.textPrimary} />
          <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={stylesColors.placeholder} value={nome} onChangeText={setNome} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color={stylesColors.textPrimary} />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={stylesColors.placeholder} keyboardType="email-address" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call" size={20} color={stylesColors.textPrimary} />
          <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor={stylesColors.placeholder} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color={stylesColors.textPrimary} />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={stylesColors.placeholder} secureTextEntry value={senha} onChangeText={setSenha} />
        </View>

        <Button title={"CRIAR CONTA"} onPress={handleCreateAccount} />
      </View>

      <View style={styles.footer}>
        <Footer text="Apaixonados por animal" textColor="#fff" showImage={false} />
      </View>
    </KeyboardAvoidingView>
  );
}

const stylesColors = {
  primary: "#141496",
  highlight: "#fdcb58",
  textPrimary: "#000",
  placeholder: "#666",
  google: "#EA4335",
  facebook: "#1877F2",
};

const styles = StyleSheet.create({
  container: {
     flex: 1, 
    backgroundColor: stylesColors.primary,
     justifyContent: "center", 
     alignItems: "center" 
    },
  image: {
     top: -40,
     width: 250 
    },
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 20,
     width: "85%", 
     paddingVertical: 30, 
     paddingHorizontal: 24, 
     alignItems: "stretch",
      gap: 14, 
      elevation: 5, 
      bottom: 5 
    },
  title: {
     color: stylesColors.highlight, 
     fontSize: 22,
     textAlign: "center",
     fontWeight: "bold",
     marginBottom: 6
    },
  socialContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 14 
  },
  inputContainer: { 
    flexDirection: "row",
     alignItems: "center", 
     borderBottomWidth: 1,
      borderBottomColor: "#ddd", 
      paddingVertical: 8,
      
      marginVertical: 6 },
  input: { 
    flex: 1, 
    color: stylesColors.textPrimary, 
    fontSize: 16, 
    paddingVertical: 4 },
  footer: { 
    top: 20 
  },
  arrowBack: { 
    position: "absolute",
     top: 40, 
     left: 20 
    },
});
