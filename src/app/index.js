import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Senac Horas</Text>
      <Link href={"/login"}>Clique aqui meu querido e vá para Login</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
