import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';

export default function RecuperacaoAluno() {

  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.logo} source={require('../../assets/Senac_logo.png')}/>

        <Text style={styles.text}>
          Informações para recuperação de acesso
        </Text>

        <Text style={styles.description}>
          Um link para redefinição de senha será enviado para o seu e-mail cadastrado no sistema.
        </Text>

        <Text style={styles.description}>
          Caso não receba o e-mail, verifique sua caixa de spam ou entre em contato com a secretaria
        </Text>
        
        <TextInput
                  style={[styles.input, styles.marginTop]}
                  placeholder="Matricula"
                  placeholderTextColor="#999"
                  value={matricula}
                  onChangeText={setMatricula}
                />

        <TextInput
                  style={[styles.input, styles.marginTop]}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                />

        <TouchableOpacity style={[styles.botao, (!matricula || !email) && { opacity: 0.5 }]}
                disabled={!matricula || !email}>
                  <Text style={styles.textoBotao}>Entrar</Text>
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

  },

  description: {
    fontSize: 11,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },

  warning: {
    fontSize: 13,
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
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

  label: {
    fontSize: 11,
    color: '#000',
    marginTop: 15,
    marginBottom: 5,
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