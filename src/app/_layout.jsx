import { Stack } from "expo-router";
import { UserProvider } from "../components/context/UserProvider";
import { PetProvider } from "../components/context/PetProvider";

export default function Layout() {
  return (
    <UserProvider>
      <PetProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="verify" />
        </Stack>
      </PetProvider>
    </UserProvider>
  );
}
