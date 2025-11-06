import Button from "@/components/Button";
import { router } from "expo-router";
import { Image, View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Footer from "../../components/Footer";

export default function SignUp(){
    return(
        <View style={styles.container}>
          <Pressable style={styles.arrowBack} onPress={() => router.navigate('/signin')}>
            <Ionicons name="arrow-back" size={24} color="#fdcb58" style={styles.icon} />
          </Pressable>
          <Image style={styles.image} source={require("@/assets/imagens/1.png")} />
  
          <View style={styles.card}>
          <View style={styles.socialContainer}>
           <FontAwesome name="google" size={40} color="#EA4335" />
           <FontAwesome name="facebook" size={40}  color="#1877F2" />
           <Ionicons name="mail" size={40} color="#000" />
          </View>
            <Text style={styles.title}>Bem vindo(a)!</Text>
  
          {/* Campo Nome */}
          <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#000"
            />
          </View>

           {/* Campo Email */}
           <View style={styles.inputContainer}>
           <Ionicons name="mail" size={20} color="#000" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#000"
            />
          </View>

           {/* Campo Telefone */}
           <View style={styles.inputContainer}>
           <Ionicons name="call" size={20} color="#000" />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
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
  
          {/* Botão Criar */}
          <Button title={"CRIAR CONTA"} onPress={() => router.navigate("/home")} />
        </View>
        <View style={styles.footer}>
          <Footer
            text="Apaixonados por animal"
            textColor="#fff"
            showImage={false}
          />
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#141496",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
        top: -40,
        width: 250
      },
    card: {
      backgroundColor: "#fff",
      borderRadius: 20,
      width: "85%",
      paddingVertical: 40,
      paddingHorizontal: 30,
      alignItems: "stretch",
      gap: 20,
      elevation: 5, // sombra no Android
      bottom: 5
    },
    title: {
      color: "#fdcb58",
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 15,
    },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    socialIcon: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingVertical: 8,
      marginVertical: 10,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      color: "#000",
      fontSize: 16,
      paddingVertical: 4,
    },
    password: {
      color: "#0c3f8c",
      textDecorationLine: "underline",
      textAlign: "left",
      marginVertical: 10,
    },
    button: {
      backgroundColor: "#141496",
      paddingVertical: 12,
      borderRadius: 10,
      marginTop: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    footer: {
      top:40
    },
   arrowBack: {
    bottom: 70,
    right: 175
   }
  });
  