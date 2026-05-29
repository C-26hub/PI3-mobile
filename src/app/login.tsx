import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";


export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <StatusBar style="auto" />

        <Image style={styles.logo} source={require('../../assets/Senac_logo.png')}/>

        <Text style={styles.text}>
          Informe seus dados para prosseguir
        </Text>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <Link href="/recuperacao-aluno" style={styles.link}>
          Esqueci minha senha
        </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004A8D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  text: {
    color: '#0A0A0A',
    marginBottom: 15,
    textAlign: 'center',
  },

  logo: {
    width: 100,
    height: 60,
    margin: 20,
  },

  link: {
    color: '#004A8D',
    marginVertical: 20,
    textAlign: 'center',
  },

  botao: {
    backgroundColor: '#F28322',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});