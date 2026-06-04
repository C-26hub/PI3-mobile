import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import { Link, router } from "expo-router";

export default function Home() {
  function handleNavigation() {
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/Senac_logo.png')}/>
      <Pressable style={styles.button} onPress={handleNavigation}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
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
  logo: {
    width: 100,
    height: 60,
    margin: 20,
  },
  button: {
    backgroundColor: "#ef963f",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});