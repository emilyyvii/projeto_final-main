import Button from "@/components/Button";
import Footer from "../../components/Footer";
import { router } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Link(){
    return(
        <View style={styles.container}>
            <Pressable style={styles.arrowBack} onPress={() => router.navigate('/reset/index')}>
      <Ionicons name="arrow-back" size={24} color="#fdcb58" style={styles.icon} />
      </Pressable>
            <Image style={styles.image} source={require("@/assets/imagens/1.png")} />
            <View style={styles.card}>
                <Text style={styles.title}>
                    Bem Vindo(a)!!
                </Text>
                <Image style={styles.img} source={require("@/assets/imagens/redefinir.png")} />
                <View style={styles.bloco}>
                    <Text style={styles.text}>
                        Enviamos um link para seu e-mail, onde você e podera redefinir sua senha.
                    </Text>
                </View>

                 <Button title={"REDEFINIR SENHA"} onPress={() => router.navigate('/reset/password')} />
                
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
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
    image:{
        top: -60,
        width: 250
    },
    img:{
        width: 100,        
        height: 100,       
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10, 
    },
    bloco:{
        backgroundColor: "#0c3f8c",
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '80%', 
        marginBottom: 10,
        borderRadius: 15,

    },
    arrowBack: {
        bottom: 80,
        right: 180
    },
    footer: {
        top:40
    }
})

