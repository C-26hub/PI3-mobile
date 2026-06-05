import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Link, router } from "expo-router";
import { useState } from 'react';
import { login as loginService } from '../services/authService';
import { salvarUsuario } from '../services/authStorage';

export default function Home() {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setErro('');

    try {
      const response = await fetch('https://api-horas-complementares.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: login, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
      }

      const data = await response.json();
      router.push('/(tabs)/dashboard');

    } catch (error) {
      setErro('Erro ao tentar fazer login.');
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/Senac_logo.png')}/>

      <View style={styles.card}>

        <StatusBar style="auto" />

        <Text style={styles.text}>
          Informe seus dados para prosseguir
        </Text>

        <TextInput
          style={[styles.input, styles.marginTop]}
          placeholder="Login"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          style={[styles.input, styles.marginBottom]}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {erro ? (
          <Text style={styles.erro}>
            {erro}
          </Text>
        ) : null}

        <TouchableOpacity style={[styles.botao, (!login || !senha || loading) && { opacity: 0.5 }]}
        disabled={!login || !senha || loading}
        onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.textoBotao}>
              Entrar
            </Text>
          )}
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '85%',
    marginTop: 110,
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
    marginBottom: 150,
    marginTop: 100,
  },

  link: {
    color: '#004A8D',
    marginVertical: 20,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    height: 42,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  marginTop: {
    marginTop: 10,
  },

  marginBottom: {
    marginBottom: 10,
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

  erro: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});