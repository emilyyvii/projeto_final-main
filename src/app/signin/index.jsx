import Button from "@/components/Button";
import { router } from "expo-router";
import { Image, View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Footer from "../../components/Footer";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("@/assets/imagens/1.png")} />

      <View style={styles.card}>
      <View style={styles.socialContainer}>
         <FontAwesome name="google" size={40} color="#EA4335" />
         <FontAwesome name="facebook" size={40}  color="#1877F2" />
         <Ionicons name="logo-apple" size={40} color="#000" />
      </View>
        <Text style={styles.title}>Bem vindo(a)!</Text>

        {/* Campo Login */}
        <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Login"
            placeholderTextColor="#000"
          />
        </View>

        {/* Campo Senha */}
        <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#000"
            secureTextEntry
          />
        </View>

        {/* Esqueci a senha */}
        <Pressable onPress={() => router .navigate('/reset')}>
          <Text style={styles.password}>Esqueci a senha</Text>
        </Pressable>

        {/* Botão Entrar */}
        <Button title={"ENTRAR"} onPress={() => router.navigate("/home")} />

        {/* Criar conta */}
        <Text style={{ textAlign: "center" }}>
          Não possui uma conta?{" "}
          <Text
            style={styles.password}
            onPress={() => router.navigate("/signup")}
          >
            Criar conta
          </Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Footer
          text="Apaixonados por animal"
          textColor="#fff"
          showImage={false}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141496",
    justifyContent: "center",
    alignItems: "center",
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: 10,
  },
  image: {
    top: -60,
    width: 250
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "80%",
    padding: 35,
    gap: 20,
    bottom: 5,
    alignItems: "stretch",
    height: 550,
  },
  title: {
    color: "#fdcb58",
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
    margin: 20
  },
  icon: {
    marginRight: 8,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 10,
    left: 37,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#000",
    paddingVertical: 4,
  },
  password: {
    color: "#0c3f8c",
    textDecorationLine: "underline",
    textAlign: "left",
    margin: 15
  },
  footer:{
    top: 50
  }
});
