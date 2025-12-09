import Button from "@/components/Button";
import { router } from "expo-router";
import {Image,View,Text,Pressable,StyleSheet,TextInput,Alert,KeyboardAvoidingView, Platform} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import { useState } from "react";
import useUserContext from "../../components/context/useUserContext";


export default function SignIn() {
  const { login } = useUserContext();
  const [loginField, setLoginField] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!loginField || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const res = login(loginField, senha);
    if (!res.success) {
      Alert.alert("Erro", res.message || "Usuário ou senha incorretos.");
      return;
    }

    router.replace("/home");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Image style={styles.image} source={require("@/assets/imagens/1.png")} />

      <View style={styles.card}>
        <View style={styles.socialContainer}>
          <FontAwesome name="google" size={40} color={stylesColors.google} />
          <FontAwesome name="facebook" size={40} color={stylesColors.facebook} />
          <Ionicons name="logo-apple" size={40} color={stylesColors.textPrimary} />
        </View>

        <Text style={styles.title}>Bem vindo(a)!</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color={stylesColors.textPrimary} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Email ou Nome" placeholderTextColor={stylesColors.placeholder} value={loginField} onChangeText={setLoginField} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color={stylesColors.textPrimary} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={stylesColors.placeholder} secureTextEntry value={senha} onChangeText={setSenha} />
        </View>

        <Pressable onPress={() => router.navigate("/reset")}>
          <Text style={styles.password}>Esqueci a senha</Text>
        </Pressable>

        <Button title={"ENTRAR"} onPress={handleLogin} />

        <Text style={{ textAlign: "center", marginTop: 8 }}>
          Não possui uma conta?{" "}
          <Text style={styles.password} onPress={() => router.navigate("/signup")}>
            Criar conta
          </Text>
        </Text>
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
    top: -60,
     width: 250 
    },
  card: {
     backgroundColor: "#fff", 
     borderRadius: 20,
     width: "80%",
     padding: 26,
     gap: 12, 
     bottom: 5, 
     alignItems: "stretch",
     height: 520
    },
  title: {
     color: stylesColors.highlight,
     fontSize: 24, 
     textAlign: "center", 
     fontWeight: "bold", 
     marginBottom: 6 
    },
  socialContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 12 
  },
  inputContainer: { 
    flexDirection: "row",
     alignItems: "center",
     borderBottomWidth: 1, 
     borderBottomColor: "#ddd", 
     paddingVertical: 8,
     marginVertical: 8, 
     marginHorizontal: 8 
    },
  icon: {
     marginRight: 8 
    },
  input: { 
    flex: 1, 
    backgroundColor: "transparent", 
    color: stylesColors.textPrimary, 
    paddingVertical: 4 
  },
  password: {
      color: "#0c3f8c",
      textDecorationLine: "underline",
      textAlign: "left", 
      margin: 8  
    },
  footer: { 
    top: 20 
  },
});
