import {Modal,View,Text,TouchableOpacity,StyleSheet,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  fechar: () => void;
  finalizar: () => void;
}

export default function UploadModal({
  visible,
  fechar,
  finalizar,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={fechar}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Upload de Comprovante
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.textoGrande}>
            Envie o comprovante
          </Text>

          <Text style={styles.subtitulo}>
            PDF, JPG ou PNG
          </Text>

          <View style={styles.caixa}>
            <Ionicons
              name="cloud-upload-outline"
              size={60}
              color="#0B5AA2"
            />

            <Text style={styles.textoUpload}>
              Toque para enviar
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={finalizar}
          >
            <Text style={styles.textoBotao}>
              Escolher arquivo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D97B2D",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },

  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textoGrande: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#fff",
    marginBottom: 30,
    marginTop: 10,
  },

  caixa: {
    width: 280,
    height: 220,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  textoUpload: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  botao: {
    backgroundColor: "#0B5AA2",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: 280,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});