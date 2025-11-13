import { Stack } from "expo-router";
import { PetProvider } from "../components/context/PetProvider";
import { HealthProvider } from "../components/context/HealthProvinder";

export default function Layout() {
  return (
    <PetProvider>
      <HealthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </HealthProvider>
    </PetProvider>
  );
}
