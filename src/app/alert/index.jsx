import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";
 
export default function Notifications() {

  const { pets } = usePetContext(); 
  const petPhoto = pets[0]?.photo; 
  const petName = pets[0]?.name || "Seu pet";
  const [notifications, setNotifications] = useState([]);
  const simulatedAlerts = [
    {
      title: "Bateria da Tag Baixa",
      text: "Atenção: A bateria da tag está em 10%. Recarregue em breve.",
    },
    {
      title: "Pet Encontrado (via QR Code)",
      text: "Alguém escaneou o QR Code do pet às 17:45.",
    },
    {
      title: "Alerta de Saúde",
      text: "A frequência cardíaca do pet está abaixo do normal. Verifique sua condição.",
    },
    {
      title: "Movimentação Incomum",
      text: "Movimentação incomum detectada às 03:00. Verifique o local.",
    },
  ];
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < simulatedAlerts.length) {
        setNotifications((prev) => [
          ...prev,
          { ...simulatedAlerts[index], photo: petPhoto },
        ]);
        index++;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [petPhoto]);

  return (
<View style={styles.container}>
    <View style={styles.header}>
        <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
            onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Notificações de Alertas</Text>
    </View>
 
    <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
            <Ionicons name="warning" size={80} color="#1e1c89" />
        </View>{notifications.map((n, index) => (
        <View key={index} style={styles.notification}>
            <Image
                source={{ uri: n.photo }}
                style={styles.photo}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{n.title}</Text>
                <Text style={styles.text}>{n.text}</Text>
            </View>
        </View>
        ))}
    </ScrollView>
</View>
  );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#f4c44e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1c89",
    padding: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  notification: {
    flexDirection: "row",
    backgroundColor: "#1e1c89",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 13,
    color: "#ddd",
    marginTop: 3,
  },
});

 