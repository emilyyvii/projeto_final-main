import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import Footer from "../../components/Footer";

export default function Home() {  return (
    <View style={styles.container}>
      <Image style={styles.header} source={require("@/assets/imagens/header.png")} />

      <View style={styles.grid}>
         <View style={styles.item}>
           <Pressable style={styles.button} onPress={() => router.navigate('/location')}>
            <Image style={styles.icon} source={require("@/assets/imagens/localizacao.png")} />
           </Pressable>
           <Text style={styles.text}>Localização{"\n"}em Tempo Real</Text>
         </View>

         <View style={styles.item}>
          <Pressable style={styles.button} onPress={() => router.navigate('/tag')}>
            <Image style={styles.icon} source={require("@/assets/imagens/tag.png")} />
          </Pressable>
          <Text style={styles.text}>Tag</Text>
         </View>
    
         <View style={styles.item}>
          <Pressable style={styles.button} onPress={() => router.navigate('/mypets')}>
            <Image style={styles.icon} source={require("@/assets/imagens/meuspets.png")} />
          </Pressable>
          <Text style={styles.text}>Meus Pets</Text>
         </View>

         <View style={styles.item}>
          <Pressable style={styles.button} onPress={() => router.navigate('/report')}>
            <Image style={styles.icon} source={require("@/assets/imagens/relatorio.png")} />
          </Pressable>
          <Text style={styles.text}>Relatórios{"\n"}do Animal</Text>
         </View>
      </View>
      <View style={styles.footer}>
        <Footer
          text="Apaixonados por animal"
          textColor="000"
          showImage={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width:413
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 100,
  },
  item: {
    alignItems: "center",
    margin: 20,
  },
  button: {
    backgroundColor: "#142A8C",
    borderRadius: 100,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  text: {
    marginTop: 8,
    color: "#142A8C",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    marginTop: 60
  }
});
