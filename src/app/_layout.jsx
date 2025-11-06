import { Stack } from "expo-router";
import { PetProvider } from "../components/context/PetProvider";

export default function Layout() {
  return (
    <PetProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PetProvider>
  );
}
