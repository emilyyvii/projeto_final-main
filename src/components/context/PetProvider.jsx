import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const PetContext = createContext();

function generateId() {
  return Date.now().toString();
}

export function PetProvider({ children }) {
  const STORAGE_KEY = "fokus-pets";
  const [pets, setPets] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setPets(JSON.parse(raw));
      } catch (e) {
        console.log("Erro ao carregar pets:", e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets)).catch((e) =>
      console.log("Erro ao salvar pets:", e)
    );
  }, [pets, ready]);

  const addPet = (newPet) => {
    const petWithId = { ...newPet, id: generateId() };
    setPets((old) => [...old, petWithId]);
    return petWithId;
  };

  const updatePet = (id, updated) => {
    setPets((old) => old.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const updatePetImage = (id, uri) => {
    setPets((old) => old.map((p) => (p.id === id ? { ...p, photo: uri } : p)));
  };

  const deletePet = (id) => {
    setPets((old) => old.filter((p) => p.id !== id));
  };

  const getPetById = (id) => pets.find((p) => p.id === id);

  return (
    <PetContext.Provider
      value={{
        pets,
        addPet,
        updatePet,
        updatePetImage,
        deletePet,
        getPetById,
        ready,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
