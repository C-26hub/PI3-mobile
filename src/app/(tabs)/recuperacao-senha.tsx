import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import PasswordChangedModal from "../components/PasswordChangedModal";

export default function RecuperacaoSenha() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handleSalvarSenha() {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/senac-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Recuperar senha</Text>

        <Text style={styles.label}>Nova senha *</Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Confirme nova senha *</Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <View style={styles.rules}>
          <Text style={styles.rule}>• Mínimo 8 caracteres</Text>
          <Text style={styles.rule}>• Uma letra maiúscula</Text>
          <Text style={styles.rule}>• Um número</Text>
          <Text style={styles.rule}>• Um caractere especial</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSalvarSenha}
        >
          <Text style={styles.buttonText}>
            Salvar nova senha
          </Text>
        </TouchableOpacity>
      </View>

      <PasswordChangedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0055A5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
    padding: 24,
  },

  logo: {
    width: 100,
    height: 45,
    alignSelf: "center",
    marginBottom: 8,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },

  input: {
    height: 42,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    marginBottom: 14,
    paddingHorizontal: 10,
  },

  rules: {
    marginBottom: 20,
  },

  rule: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#F58220",
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});