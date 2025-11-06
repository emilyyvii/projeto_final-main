import Button from "@/components/Button";
import Footer from "../../components/Footer";
import { router } from "expo-router";
import { View, Text, StyleSheet, TextInput, Image, Pressable } from "react-native";
import { Ionicons} from "@expo/vector-icons";

export default function Reset(){
    return(
        <View style={styles.container}>
            <Pressable style={styles.arrowBack} onPress={() => router.navigate('/signin')}>
                <Ionicons name="arrow-back" size={24} color="#fdcb58" style={styles.icon} />
            </Pressable>
            <Image style={styles.image} source={require("@/assets/imagens/1.png")} />
            <View style={styles.card}>
                <Text style={styles.title}>
                    Bem Vindo(a)!!
                </Text>
                <Image style={styles.img} source={require("@/assets/imagens/redefinir.png")} />
                 <Text style={styles.text}>
                    Informe o e-mail para qual deseja redefinir sua senha
                </Text>
                 <View style={styles.linha}>
          <Ionicons name="mail" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#000"
              secureTextEntry
            />
          </View>
                 <Button title={"ENVIAR"} onPress={() => router.navigate('/reset/link')} />
                
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
        backgroundColor: '#141496',
        alignItems: 'center',
        gap: 25,
        justifyContent: 'center'
    },
    card:{
        backgroundColor: "#fff",
        borderRadius: 20,
        width: "80%",
        padding: 35,
        gap: 20,
        bottom: 40,
        alignItems: "stretch",
        height: 480,
    },
    title:{
          color: "#000",
        fontSize: 26,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: -40,
        
    },
    text:{
        color: '#000',
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 5,
    },
    input:{
        flex: 1,
        backgroundColor: "transparent",
        color: "#000",
        paddingVertical: 4,
    },
    icon: {
        marginRight: 8,
    },
    image:{
        top: -60,
    },
    linha:{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
        marginVertical: 10,
    },
    img:{
          width: 100,        
        height: 100,       
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10, 
    },
    footer: {
        top: 40
    },
    arrowBack: {
        bottom: 80,
        right: 170
    }
})

