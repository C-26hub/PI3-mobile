import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function PasswordChangedModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.title}>
            Sua senha foi alterada !
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.buttonText}>
              Voltar para login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    backgroundColor: "#F58220",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
  },

  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  check: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },

  button: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});