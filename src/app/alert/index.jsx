import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import usePetContext from "../../components/context/usePetContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notifications() {
  const { pets } = usePetContext();
  const petPhoto = pets[0]?.photo;

  const [notifications, setNotifications] = useState([]);

  const notificationsRef = useRef([]);

  const simulatedAlerts = [
    {
      title: "Bateria da Tag Baixa",
      text: "Atenção: A bateria da tag está em 10%. Recarregue em breve.",
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
    async function loadData() {
      const saved = await AsyncStorage.getItem("alert_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        notificationsRef.current = parsed;
        setNotifications(parsed);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!petPhoto) return;

    let index = 0;

    const interval = setInterval(async () => {
      if (index < simulatedAlerts.length) {
        const newAlert = {
          ...simulatedAlerts[index],
          id: Date.now() + index,
          photo: petPhoto,
        };

        notificationsRef.current = [...notificationsRef.current, newAlert];

        setNotifications([...notificationsRef.current]);

        await AsyncStorage.setItem(
          "alert_list",
          JSON.stringify(notificationsRef.current)
        );

        index++;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [petPhoto]);

  const clearAlerts = async () => {
    notificationsRef.current = [];
    setNotifications([]);
    await AsyncStorage.removeItem("alert_list");
  };

  return (
     <View style={styles.container}>
         <View style={styles.header}>
           <TouchableWithoutFeedback onPress={() => router.back()}>
             <Ionicons name="arrow-back" size={28} color="#fdcb58" />
           </TouchableWithoutFeedback>
           <Text style={styles.headerTitle}>Problemas de Saúde</Text>
           <View />
         </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="warning" size={80} color="#1e1c89" />
        </View>

        {notifications.length > 0 && (
          <Pressable style={styles.clearBtn} onPress={clearAlerts}>
            <Ionicons name="trash" size={16} color="#fff" />
            <Text style={styles.clearText}>Limpar cachê</Text>
          </Pressable>
        )}

        {notifications.map((n) => (
          <View key={n.id} style={styles.notification}>
            <Image source={{ uri: n.photo }} style={styles.photo} />

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
    backgroundColor: "#002E9D",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  content: {
    padding: 20,
    flexGrow: 1, 
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  clearBtn: {
    flexDirection: "row",
    backgroundColor: "#c62828",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 15,
    alignItems: "center",
  },
  clearText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
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
