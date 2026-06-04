import {Modal,View,Text,TouchableOpacity,StyleSheet,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  fechar: () => void;
}

export default function SucessoModal({
  visible,
  fechar,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Ionicons
            name="checkmark-circle"
            size={90}
            color="#0B5AA2"
          />

          <Text style={styles.titulo}>
            Atividade cadastrada!
          </Text>

          <Text style={styles.texto}>
            Sua atividade foi enviada com sucesso.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={fechar}
          >
            <Text style={styles.textoBotao}>
              Finalizar
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    backgroundColor: "#D97B2D",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },

  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  texto: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0B5AA2",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});