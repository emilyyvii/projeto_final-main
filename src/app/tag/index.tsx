import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";

export default function Tag() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.arrowBack} onPress={() => router.navigate("/home")}>
          <Ionicons name="arrow-back" size={24} color="#FFD400" />
        </Pressable>
        <Text style={styles.title}>Tag</Text>
      </View>

      <View style={styles.yellowContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.tagImage}
            source={require("@/assets/imagens/tags.png")}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.batteryBox}>
          <Image style={styles.image} source={require("@/assets/imagens/1.png")} />
          <Text style={styles.batteryText}>bateria da etiqueta</Text>
        </View>

        <View style={styles.footer}> <Footer text="Apaixonados por animal" textColor="#fff" showImage={false} /> </View>
      </View>

        <Image style={styles.esquerdo} source={require("@/assets/imagens/esquerdo.png")} />
        <Image style={styles.direito} source={require("@/assets/imagens/direito.png")} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101078",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002E9D",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  arrowBack: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  image:{
    width: 120,
    height: 30,

  },
  yellowContainer: {
    backgroundColor: "#FDCC58",
    flex: 1.1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  tagImage: {
    width: 350,
    height: 450,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#101078",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  batteryBox: {
    backgroundColor: "#0d0d60",
    width: 280,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  brand: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  batteryText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
  footer: { 
    marginTop: 200 
},
  esquerdo: {
    position: "absolute",
    bottom: 60,        
    left: -50,        
    width: 180,      
    height: 180,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,   
  },
   direito: {
    position: "absolute",
    bottom: 20,        
    right: -90,        
    width: 180,       
    height: 180,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,      
  },

});