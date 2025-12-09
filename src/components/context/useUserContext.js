import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext deve ser usado dentro do UserProvider");
  }

  return context;
}
