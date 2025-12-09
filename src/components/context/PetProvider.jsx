import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const PetContext = createContext();

export function PetProvider({ children }) {
  const PETS_STORAGE_KEY = "fokus-pets";

  const [pets, setPets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 🔹 Carregar pets do storage
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

  // 🔹 Salvar pets quando mudar
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

  // 🔹 Adicionar pet (CORRIGIDO — NÃO APAGA A FOTO)
  const addPet = (newPet) => {
    setPets((oldPets) => [
      ...oldPets,
      {
        ...newPet, // mantém photo, name, breed, birthDate
        id: Date.now().toString(),
        code: Math.floor(100000 + Math.random() * 900000).toString(),
        healthIssues: [],
        food: { tipoRacao: "", quantidade: "", evitar: "" },
        vaccines: [],
        contact: { telefone: "", email: "" },
      },
    ]);
  };

  // 🔹 Atualizar pet inteiro
  const updatePet = (id, updatedData) => {
    setPets((oldPets) =>
      oldPets.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  // 🔹 Atualizar apenas a foto
  const updatePetImage = (id, newUri) => {
    setPets((oldPets) =>
      oldPets.map((p) => (p.id === id ? { ...p, photo: newUri } : p))
    );
  };

  // 🔹 Deletar pet
  const deletePet = (id) => {
    setPets((oldPets) => oldPets.filter((p) => p.id !== id));
  };

  // 🔹 Buscar pet por ID
  const getPetById = (id) => pets.find((pet) => pet.id === id);

  // 🔹 Buscar pet por código
  const getPetByCode = (code) => pets.find((pet) => pet.code === code);

  // -------------------------
  // 🔹 HEALTH ISSUES
  // -------------------------
  const getHealthIssues = (petId) =>
    pets.find((p) => p.id === petId)?.healthIssues || [];

  const updateHealthIssues = (petId, issues) => {
    setPets((prev) =>
      prev.map((p) => (p.id === petId ? { ...p, healthIssues: issues } : p))
    );
  };

  // -------------------------
  // 🔹 FOOD
  // -------------------------
  const getFood = (petId) =>
    pets.find((p) => p.id === petId)?.food || {
      tipoRacao: "",
      quantidade: "",
      evitar: "",
    };

  const updateFood = (petId, foodData) => {
    setPets((prev) =>
      prev.map((p) => (p.id === petId ? { ...p, food: foodData } : p))
    );
  };

  // -------------------------
  // 🔹 VACCINES
  // -------------------------
  const getVaccines = (petId) =>
    pets.find((p) => p.id === petId)?.vaccines || [];

  const updateVaccines = (petId, vaccines) => {
    setPets((prev) =>
      prev.map((p) => (p.id === petId ? { ...p, vaccines } : p))
    );
  };

  // -------------------------
  // 🔹 CONTACT
  // -------------------------
  const getContact = (petId) =>
    pets.find((p) => p.id === petId)?.contact || { telefone: "", email: "" };

  const updateContact = (petId, contactData) => {
    setPets((prev) =>
      prev.map((p) => (p.id === petId ? { ...p, contact: contactData } : p))
    );
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        addPet,
        updatePet,
        deletePet,
        updatePetImage,
        getPetById,
        getPetByCode,
        getHealthIssues,
        updateHealthIssues,
        getFood,
        updateFood,
        getVaccines,
        updateVaccines,
        getContact,
        updateContact,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
