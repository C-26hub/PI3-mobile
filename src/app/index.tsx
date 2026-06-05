import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Link, router } from "expo-router";
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { login as loginService } from '../services/authService';
import { salvarUsuario } from '../services/authStorage';
import * as SecureStore from 'expo-secure-store';

export default function Home() {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setErro('');
    setLoading(true);

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
        setErro(errorData.error || errorData.erro || 'E-mail ou senha incorretos.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      const usuarioParaSalvar = data.usuario || data; 
      await SecureStore.setItemAsync('usuarioLogado', JSON.stringify(usuarioParaSalvar));

      router.replace('/(tabs)/dashboard');
    } catch (error) {
      setErro('Erro ao tentar fazer login.');
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >

        <View style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/Senac_logo.png')} />

          <View style={styles.card}>

            <StatusBar style="auto" />

            <Text style={styles.text}>
              Informe seus dados para prosseguir
            </Text>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="account" size={22} color="#999" />

              <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#999"
                value={login}
                onChangeText={setLogin}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock" size={22} color="#999" />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
            </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 140,
    marginTop: 120,
  },

  link: {
    color: '#004A8D',
    marginVertical: 20,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 50,
    marginTop: 10,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
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
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
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