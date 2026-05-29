import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Link, router } from "expo-router";

export default function Home() {
  function handleNavigation() {
    router.replace("/dashboard");
  }

  return (
    <View style={styles.container}>
      <Text>Senac Horas</Text>
      <Link href={"/login"}>Clique aqui e vá para Login</Link>
      <Button title="Ir para Dashboard" onPress={handleNavigation} />
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
