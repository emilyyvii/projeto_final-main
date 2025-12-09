import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import Footer from "../../components/Footer";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Image
          style={styles.header}
          source={require("@/assets/imagens/header.png")}
        />
        
        <View style={styles.iconsRow}>
          <Pressable
            style={styles.profileButton}
            onPress={() => router.navigate("/userprofile")}
          >
            <Ionicons name="person-circle-sharp" size={42} color="#142A8C" />
          </Pressable>

          <Pressable
            style={styles.bellButton}
            onPress={() => router.navigate("/alert")}
          >
            <Ionicons name="notifications" size={38} color="#142A8C" />
          </Pressable>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.item}>
          <Pressable
            style={styles.button}
            onPress={() => router.navigate("/location")}
          >
            <Image
              style={styles.icon}
              source={require("@/assets/imagens/localizacao.png")}
            />
          </Pressable>
          <Text style={styles.text}>Localização{"\n"}em Tempo Real</Text>
        </View>

        <View style={styles.item}>
          <Pressable
            style={styles.button}
            onPress={() => router.navigate("/tag")}
          >
            <Image
              style={styles.icon}
              source={require("@/assets/imagens/tag.png")}
            />
          </Pressable>
          <Text style={styles.text}>Tag</Text>
        </View>

        <View style={styles.item}>
          <Pressable
            style={styles.button}
            onPress={() => router.navigate("/mypets")}
          >
            <Image
              style={styles.icon}
              source={require("@/assets/imagens/meuspets.png")}
            />
          </Pressable>
          <Text style={styles.text}>Meus Pets</Text>
        </View>

        <View style={styles.item}>
          <Pressable
            style={styles.button}
            onPress={() => router.navigate("/report")}
          >
            <Image
              style={styles.icon}
              source={require("@/assets/imagens/relatorio.png")}
            />
          </Pressable>
          <Text style={styles.text}>
            Relatórios{"\n"}do Animal
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.supportButton}
        onPress={() => router.navigate("/support")}
      >
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </Pressable>

      <View style={styles.footer}>
        <Footer text="Apaixonados por animal" textColor="000" showImage={true} />
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

  headerContainer: {
    width: "100%",
    alignItems: "center",
  },

  header: {
    width: 413,
    height: 180,
    resizeMode: "cover",
  },

  iconsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10, 
  },

  profileButton: {
    right: 290
  },

  bellButton: {},

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 80,
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
    marginTop: 60,
  },

  supportButton: {
    position: "absolute",
    bottom: 40,
    right: 25,
    backgroundColor: "#142A8C",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

