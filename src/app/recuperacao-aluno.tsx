import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function RecuperacaoAluno() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Senac_logo.svg',
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.text}>
          Informações para recuperação de acesso
        </Text>

        <Text style={styles.description}>
          Um link para redefinição de senha será enviado
        </Text>

        <Text style={styles.description}>
          para o seu e-mail cadastrado no sistema.
        </Text>

        <Text style={styles.warning}>
          Caso não receba o e-mail, verifique sua caixa
        </Text>

        <Text style={styles.warning}>
          de spam ou entre em contato com a secretaria
        </Text>

        <Text style={styles.label}>Matrícula</Text>

        <TextInput
          style={styles.input}
        />

        <Text style={styles.label}>E-mail</Text>

        <TextInput
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar link</Text>
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
    width: 340,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20,
  },

  logo: {
    width: 90,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },

  text: {
  fontSize: 12,
  textAlign: 'center',
  color: '#000',
  marginBottom: 8,
  fontWeight: 'bold',

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

  label: {
    fontSize: 11,
    color: '#000',
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: 35,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: '#F58220',
    marginTop: 20,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});