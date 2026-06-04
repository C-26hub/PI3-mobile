import {Modal, View,Text,TouchableOpacity,TextInput,ScrollView,StyleSheet,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  fechar: () => void;
  proximo: () => void;
}

export default function CadModal({
  visible,
  fechar,
  proximo,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={fechar}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Nova Atividade
          </Text>
        </View>

        <Text style={styles.label}>
          Título da Atividade
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Curso de React"
        />

        <Text style={styles.label}>
          Categoria
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Selecione"
        />

        <View style={styles.row}>
          <View style={styles.metade}>
            <Text style={styles.label}>
              Data
            </Text>

            <TextInput
              style={styles.input}
              placeholder="00/00/0000"
            />
          </View>

          <View style={styles.metade}>
            <Text style={styles.label}>
              Horas
            </Text>

            <TextInput
              style={styles.input}
              placeholder="00h"
            />
          </View>
        </View>

        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Digite..."
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={proximo}
        >
          <Text style={styles.textoBotao}>
            Próximo
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D97B2D",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },

  titulo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 15,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metade: {
    width: "48%",
  },

  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#0B5AA2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});