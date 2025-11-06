
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";

export default function MyPets() {
  const { pets } = usePetContext();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.arrowBack} onPress={() => router.navigate("/home")}>
          <Ionicons name="arrow-back" size={24} color="#FFD400" />
        </Pressable>
        <Text style={styles.title}>Meus Pets</Text>
      </View>

      <View style={styles.petListContainer}>
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "center" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.petCard}
              onPress={() => router.push(`/petdetail/${item.id}`)}
            >
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add-pet")}>
        <Ionicons name="add" size={30} color="#002E9D" />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Footer
          text="Apaixonados por animal"
          textColor="#000"
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

  petListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  petCard: {
    alignItems: "center",
    margin: 15,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: "#002E9D",
    fontWeight: "600",
  },
  addButton: {
    position: "absolute",
    bottom: 200,
    right: 25,
    backgroundColor: "#FFD400",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  footer: {
    marginBottom: 80
  }
});
