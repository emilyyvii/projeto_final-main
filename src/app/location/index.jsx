import { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";

export default function LocationScreen() {
  const { pets } = usePetContext();
  const [positions, setPositions] = useState({});

  // posição inicial
  useEffect(() => {
    const initial = {};
    pets.forEach((pet) => {
      initial[pet.id] = {
        latitude: -23.55052 + Math.random() * 0.01,
        longitude: -46.633308 + Math.random() * 0.01,
      };
    });
    setPositions(initial);
  }, [pets]);

  // movimento simulado
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) => {
        const updated = {};
        pets.forEach((pet) => {
          const p = prev[pet.id];
          if (!p) return;

          updated[pet.id] = {
            latitude: p.latitude + (Math.random() - 0.5) * 0.0004,
            longitude: p.longitude + (Math.random() - 0.5) * 0.0004,
          };
        });
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [pets]);

  return (
    <View style={styles.container}>

      <Pressable style={styles.arrowBack} onPress={() => router.navigate("/home")}>
        <Ionicons name="arrow-back" size={24} color="#FFD400" />
      </Pressable>

      <Text style={styles.header}>Localização em Tempo Real</Text>

      <MapView
        style={styles.map}
        region={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {pets.map((pet) => (
          positions[pet.id] && (
            <Marker key={pet.id} coordinate={positions[pet.id]}>
              <Image source={{ uri: pet.photo }} style={styles.petIcon} />
            </Marker>
          )
        ))}
      </MapView>

      {/* RODAPÉ */}
      <View style={styles.footerWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.footer}
        >
          {pets.map((pet) => (
            <View key={pet.id} style={styles.footerItem}>
              <Image source={{ uri: pet.photo }} style={styles.footerPetImage} />
              <Text style={styles.footerName}>{pet.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141496",
  },

  arrowBack: {
    position: "absolute",
    zIndex: 10,
    top: 50,
    left: 15,
    padding: 6,
    borderRadius: 8,
  },

  header: {
    textAlign: "center",
    paddingTop: 55,
    paddingBottom: 12,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#141496",
  },

  map: {
    flex: 1,
  },

  // Foto no mapa (sem cortar)
  petIcon: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: "#fff",
    resizeMode: "cover",
    backgroundColor: "#fff",
  },

  footerWrapper: {
    width: "100%",
    backgroundColor: "#141496",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 25,
    marginBottom: 15
  },

  footerItem: {
    alignItems: "center",
    width: 70,
  },

  footerPetImage: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 4,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },

  footerName: {
    color: "#FFD400",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
});