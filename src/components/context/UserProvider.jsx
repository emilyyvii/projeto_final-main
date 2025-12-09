import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const STORAGE_KEY = "fokus-user";

  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    async function loadUser() {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
      setLoaded(true);
    }
    loadUser();
  }, []);

  
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  function register(data) {
    setUser(data);
    return true;
  }

  function login(emailOuNome, senha) {
    if (!user) return { success: false };

    const matchesEmail = user.email === emailOuNome;
    const matchesNome = user.nome === emailOuNome;

    if ((matchesEmail || matchesNome) && user.senha === senha) {
      return { success: true, user };
    }

    return { success: false };
  }

  function updateUser(newData) {
    setUser((prev) => ({ ...prev, ...newData }));
  }

  return (
    <UserContext.Provider value={{ user, register, login, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
