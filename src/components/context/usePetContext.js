import { useContext } from "react";
import { PetContext } from "./PetProvider";

export default function usePetContext() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("Tentando acessar o contexto fora do PetProvider");
  }

  return context;
}
