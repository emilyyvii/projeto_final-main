import { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, Pressable, ScrollView, StatusBar, Platform, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";

export default function Report() {
  const { pets } = usePetContext();
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id);
  const [petStats, setPetStats] = useState({});

  // inicializa stats por pet
  useEffect(() => {
    const initial = {};
    pets.forEach((pet) => {
      initial[pet.id] = {
        heartRate: 50 + Math.floor(Math.random() * 40), // 50 - 89
        steps: Math.floor(Math.random() * 2000),
        calories: Math.floor(Math.random() * 300),
      };
    });
    setPetStats(initial);
    // se nenhum selecionado, escolhe o primeiro
    if (!selectedPetId && pets[0]) setSelectedPetId(pets[0].id);
  }, [pets]);

  // simula atualização
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats((prev) => {
        const updated = { ...prev };
        pets.forEach((pet) => {
          const p = prev[pet.id];
          if (!p) return;
          // limita valores para não ficarem estranhos
          const newHR = Math.max(35, Math.min(140, p.heartRate + (Math.random() > 0.55 ? 1 : -1)));
          const newSteps = p.steps + Math.floor(Math.random() * 8);
          const newCalories = p.calories + Math.floor(Math.random() * 3);
          updated[pet.id] = {
            heartRate: newHR,
            steps: newSteps,
            calories: newCalories,
          };
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [pets]);

  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const stats = petStats[selectedPetId];

  // status bar padding (funciona bem no Android/iOS)
  const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  if (!selectedPet || !stats) return null;

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: STATUSBAR_HEIGHT }]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.arrowBack} onPress={() => router.navigate("/home")}>
            <Ionicons name="arrow-back" size={26} color="#FFD400" />
          </Pressable>
          <Text style={styles.headerTitle}>Relatório do Animal</Text>
        </View>

        {/* Lista horizontal de pets */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.petList}
          showsHorizontalScrollIndicator={false}
        >
          {pets.map((pet) => (
            <Pressable
              key={pet.id}
              onPress={() => setSelectedPetId(pet.id)}
              style={styles.petItem}
            >
              <Image
                source={{ uri: pet.photo }}
                style={[
                  styles.petImage,
                  selectedPetId === pet.id && styles.petImageSelected,
                ]}
              />
            </Pressable>
          ))}
          {/* espaço vazio para alinhamento visual */}
          <View style={{ width: 16 }} />
        </ScrollView>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* CARD BATIMENTOS */}
          <Text style={styles.sectionTitle}>Batimentos cardíacos</Text>
          <View style={styles.card}>
            <View style={styles.circleContainer}>
              <View style={styles.circle}>
                <View style={styles.bpmRow}>
                  <Text style={styles.bpmNumber}>{stats.heartRate}</Text>
                  <Ionicons name="heart" size={20} color="#FF3B30" style={{ marginLeft: 6 }} />
                </View>
                <Text style={styles.bpmText}>BPM</Text>
              </View>

           
            </View>
          </View>

          {/* ATIVIDADES */}
          <Text style={styles.sectionTitle}>Atividade física</Text>
          <View style={styles.card}>
            <View style={styles.activityRow}>
              <View style={styles.activityCircle}>
                <Text style={styles.activityNumber}>{stats.steps}</Text>
                <Text style={styles.activityText}>Passos</Text>
              </View>

              <View style={styles.verticalLine} />

              <View style={styles.activityCircle}>
                <Text style={styles.activityNumber}>{stats.calories}</Text>
                <Text style={styles.activityText}>Calorias</Text>
              </View>
            </View>
          </View>

          {/* final spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFD45C",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFD45C",
  },
  header: {
    width: "100%",
    backgroundColor: "#141496",
    paddingTop: 12, 
    paddingBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  arrowBack: {
    position: "absolute",
    left: 14,
    top: 12,
    padding: 6,
    zIndex: 20,
  },

  petList: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: -8, 
    gap: 18,
  },
  petItem: {
    alignItems: "center",
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  petImageSelected: {
    borderColor: "#141496",
    borderWidth: 3,
  },

  content: {
    paddingTop: 2,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    backgroundColor: "#141496",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "700",
    color: "#fff",
  },

  card: {
    backgroundColor: "#141496",
    marginHorizontal: 5,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },

  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  bpmRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bpmNumber: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "700",
  },

  bpmText: {
    color: "#fff",
    fontSize: 14,
    marginTop: -6,
  },

  heartbeatImg: {
    width: 150,
    height: 60,
    tintColor: "#fff",
    resizeMode: "contain",
    marginTop: -6,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },

  activityCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  activityNumber: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "700",
  },

  activityText: {
    color: "#fff",
    fontSize: 14,
  },

  verticalLine: {
    width: 2,
    height: 100,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});