import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import usePetContext from "../../components/context/usePetContext";
import { Ionicons } from "@expo/vector-icons";
import RecordButton from "../../components/RecordButton";
import Footer from "../../components/Footer";


export default function PetDetail() {
  const { id } = useLocalSearchParams();
  const { pets } = usePetContext();
  const pet = pets.find((p) => p.id === id);

  if (!pet) return <Text>Pet não encontrado</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Pressable style={styles.arrowBack} onPress={() => router.navigate("/mypets")}>
          <Ionicons name="arrow-back" size={28} color="#fdcb58" />
        </Pressable>

        <Image source={{ uri: pet.photo }} style={styles.image} />
        <Text style={styles.name}>{pet.name}</Text>

        <View style={styles.ageBox}>
          <Text style={styles.age}>{pet.breed}</Text>
          <Text style={styles.age}>{pet.age} anos</Text>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Text style={styles.text}>Ficha do Animal</Text>
        <View style={styles.grid}>
          {/* 👇 Aqui o dono acessa com tipo=dono */}
          <RecordButton title={"Contato"} onPress={() => router.navigate("/contact?tipo=dono")} />
          <RecordButton title={"Problemas de Saúde"} onPress={() => router.navigate("/health")} />
          <RecordButton title={"Vacinas"} onPress={() => router.navigate("/vaccine")} />
          <RecordButton title={"Alimentação"} onPress={() => router.navigate("/home")} />
        </View>
      </View>

      <Footer text="Apaixonados por animais" textColor="#fff" showImage={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141496",
    alignItems: "center",
    paddingTop: 10,
  },
  containerInfo: {
    backgroundColor: "#2e63ce",
    borderRadius: 16,
    width: "90%",
    maxWidth: 380,
    marginTop: 50,
    paddingVertical: 25,
    paddingHorizontal: 20,
    position: "relative",
  },
  arrowBack: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 15,
  },
  ageBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    gap: 15,
  },
  age: {
    backgroundColor: "#5B8DEE",
    color: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  containerButton: {
    backgroundColor: "#FEC744",
    borderRadius: 16,
    width: "90%",
    maxWidth: 380,
    marginTop: 25,
    padding: 20,
    flex: 1,
    maxHeight: 350,
    gap: 10,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#729cf2",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 13,
  },
});
