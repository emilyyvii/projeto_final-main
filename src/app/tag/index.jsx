import React from "react";
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import { useContext } from "react";
import { PetContext } from "../../components/context/PetProvider";
import QRCode from "react-native-qrcode-svg";

export default function Tag() {
  const { id } = useLocalSearchParams();
  const { pets } = useContext(PetContext);

  // Pet selecionado ou o primeiro da lista
  const pet = pets.find((p) => p.id === id) || pets[0];

  // Código simples baseado no ID (pode ser outro valor se preferir)
  const petCode = String(pet.id).toUpperCase(); 

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.arrowBack} onPress={() => router.navigate("/")}>
          <Ionicons name="arrow-back" size={26} color="#FFD400" />
        </Pressable>
        <Text style={styles.title}>Tag do Pet</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.yellowContainer}>

          {/* PETS EM CIMA */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              {pets.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.footerItem}
                  onPress={() => router.replace(`/tag?id=${item.id}`)}
                >
                  <Image
                    source={item.photo ? { uri: item.photo } : require("@/assets/imagens/1.png")}
                    style={[
                      styles.footerPetImage,
                      item.id === pet.id && { borderColor: "#FFD400", borderWidth: 3 }
                    ]}
                  />
                  <Text style={styles.footerName}>{item.name}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <Text style={styles.label}>QR Code para Coleira</Text>

          {/* QR CODE */}
          <View style={styles.qrContainer}>
            {pet && (
              <QRCode
                size={180}
                value={`myapp://verify?code=${petCode}`} 
              />
            )}
          </View>

          {/* CÓDIGO MANUAL */}
          <Text style={styles.codeLabel}>Código da Coleira</Text>
          <Text style={styles.codeBox}>{petCode}</Text>

          <Text style={styles.info}>
            O profissional pode escanear o QR ou digitar o código para ver as informações do pet.
          </Text>

        </View>

        <View style={styles.bottomContainer}>
          <Footer text="Apaixonados por animal" textColor="#fff" showImage={false} />
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101078" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002E9D",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },

  arrowBack: { marginRight: 10 },

  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },

  yellowContainer: {
    backgroundColor: "#FDCC58",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

  qrContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#142A8C",
    marginTop: 10,
  },

  codeLabel: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#142A8C",
  },

  codeBox: {
    marginTop: 5,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 3,
  },

  info: {
    textAlign: "center",
    color: "#142A8C",
    marginTop: 10,
    fontSize: 14,
    paddingHorizontal: 40,
  },

  footerItem: { alignItems: "center", marginHorizontal: 12 },

  footerPetImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },

  footerName: { color: "#fff", marginTop: 5, fontSize: 13, fontWeight: "500" },

  bottomContainer: { paddingTop: 35, alignItems: "center" },
});
