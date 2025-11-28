import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@chat_messages_support";

const botResponses = [
  "Olá! Como posso ajudar você hoje?",
  "Entendi! Vou verificar isso para você.",
  "Certo! Obrigado por entrar em contato.",
  "Posso ajudar com mais alguma coisa?",
  "Anotado! Nossa equipe vai analisar."
];

function botResponse() {
  const index = Math.floor(Math.random() * botResponses.length);
  return botResponses[index];
}

export default function Support() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Erro ao carregar:", e);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    } catch (e) {
      console.log("Erro ao salvar:", e);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newUserMessage = {
      id: Date.now(),
      text: message,
      sender: "user"
    };

    const updated = [...messages, newUserMessage];
    setMessages(updated);
    saveMessages(updated);
    setMessage("");

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: botResponse(),
        sender: "bot"
      };

      const updated2 = [...updated, botMsg];
      setMessages(updated2);
      saveMessages(updated2);
    }, 600);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={router.back}>
          <Ionicons name="arrow-back" size={26} color="#fdcb58" />
        </Pressable>
        <Text style={styles.headerText}>Suporte ao Usuário</Text>
      </View>

      <ScrollView
        style={styles.chatArea}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userBubble : styles.botBubble
            ]}
          >
            <Text
                style={[styles.messageText, msg.sender === "user" ? { color: "#fff" } : { color: "#000" }]}
            >
                {msg.text}
            </Text>
          </View>
        ))}

        {messages.length === 0 && (
          <Text style={styles.startText}>
            Este é o início da sua conversa conosco. Envie uma mensagem para começar.
          </Text>
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Enviar uma mensagem..."
          value={message}
          onChangeText={setMessage}
        />

        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={22} color="#fff" />
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb58",
  },

  header: {
    backgroundColor: "#002E9D",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  chatArea: {
    flex: 1,
    padding: 15,
  },

  startText: {
    color: "#555",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: "#002E9D",
    alignSelf: "flex-end"
  },
  botBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#000",
    fontSize: 15,
  },

  inputArea: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fdcb58",
    bottom: 50
  },

  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    fontSize: 16,
  },

  sendButton: {
    backgroundColor: "#002E9D",
    marginLeft: 10,
    padding: 12,
    borderRadius: 25,
  },
});
