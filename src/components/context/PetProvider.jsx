import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const PetContext = createContext();

export function PetProvider({ children }) {

  const PETS_STORAGE_KEY = 'fokus-pets';

  const [pets, setPets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(PETS_STORAGE_KEY);
        const loadedPets = jsonValue != null ? JSON.parse(jsonValue) : [];
        setPets(loadedPets);
        setIsLoaded(true);
      } catch (e) {
        console.log("Erro ao carregar pets:", e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(PETS_STORAGE_KEY, jsonValue);
      } catch (e) {
        console.log("Erro ao salvar pets:", e);
      }
    };

    if (isLoaded) {
      storeData(pets);
    }
  }, [pets]);

  const addPet = (newPet) => {
    setPets((oldPets) => [
      ...oldPets,
      { ...newPet, id: Date.now().toString() },
    ]);
  };

  const updatePet = (id, updatedData) => {
    setPets((oldPets) =>
      oldPets.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deletePet = (id) => {
    setPets((oldPets) => oldPets.filter((p) => p.id !== id));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
}
