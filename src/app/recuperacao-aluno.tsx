import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function RecuperacaoAluno() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperar = async () => {
    if (!email) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api-horas-complementares.onrender.com/api/auth/recuperar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), 
        }
      );

      const textoBruto = await response.text();

      if (!response.ok) {
        let mensagemErro = "Erro ao solicitar recuperação.";
        try {
          const errorData = JSON.parse(textoBruto);
          mensagemErro = errorData.error || errorData.erro || mensagemErro;
        } catch {
          mensagemErro = `Erro do servidor: ${textoBruto}`;
        }
        
        Alert.alert("Erro", mensagemErro);
        setLoading(false);
        return;
      }

      Alert.alert(
        "Link Enviado!",
        "Se os dados estiverem corretos, um link de recuperação foi enviado para o seu e-mail.",
        [
          { text: "Voltar ao Login", onPress: () => router.replace('/') }
        ]
      );

    } catch (error) {
      Alert.alert("Erro de Conexão", "Não foi possível processar a solicitação no momento.");
      console.error("Erro na recuperação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.logo} source={require('../../assets/Senac_logo.png')} />

        <Text style={styles.text}>
          Informações para recuperação de acesso
        </Text>

        <Text style={styles.description}>
          Um link para redefinição de senha será enviado para o seu e-mail cadastrado no sistema.
        </Text>

        <Text style={styles.description}>
          Caso não receba o e-mail, verifique sua caixa de spam ou entre em contato com a secretaria.
        </Text>

        <TextInput
          style={[styles.input, styles.marginTop]}
          placeholder="E-mail cadastrado"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.botao, (!email || loading) && { opacity: 0.5 }]}
          disabled={!email || loading}
          onPress={handleRecuperar}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.textoBotao}>Enviar link</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/')} style={{ marginTop: 20 }}>
           <Text style={{ color: '#00539C', fontSize: 13, fontWeight: '600' }}>Voltar para o Login</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00539C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  logo: {
    width: 100,
    height: 60,
    margin: 20,
  },
  text: {
    color: '#0A0A0A',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 11,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 42,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  marginTop: {
    marginTop: 10,
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