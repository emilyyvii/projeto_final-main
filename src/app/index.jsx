import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Footer from "../components/Footer";
import usePetContext from "../components/context/usePetContext";

export default function Index() {
  const { pets } = usePetContext();
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("@/assets/imagens/1.png")}
      />

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        const petId = pets.length > 0 ? pets[0].id : null;
        if (petId) {
          router.navigate("/mypets");
        } else {
          alert("Nenhum pet cadastrado ainda!");
        }
      }}
    >
      <Text style={styles.title}>PROFISSIONAL</Text>
    </TouchableOpacity>

      {/* ENCONTREI PET (visitante) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("/contact?tipo=encontrou")}
      >
        <Text style={styles.title}>ENCONTREI PET</Text>
      </TouchableOpacity>

      {/* DONO PET (exemplo) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("/signin")}
      >
        <Text style={styles.title}>DONO PET</Text>
      </TouchableOpacity>

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
      justifyContent: "center",
      alignItems: "center",
      gap: 32,
      padding:60,
      backgroundColor:"#141496"
  },
  title: {
      fontSize: 22,
      fontWeight: "bold",
      color:"black",
      textAlign:"center"
  },
  button:{
      backgroundColor:"#fdcb58",
      borderRadius: 10,
      paddingHorizontal: 32,
      paddingVertical:10,
      width:"100%",
      height:50,
      top: 10
  },
  img:{
      width:300,
      height:75,
      top:-60
  },
  footer: {
      top: 170
  }
})
 
 
