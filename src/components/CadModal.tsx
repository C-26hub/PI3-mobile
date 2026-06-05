import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

interface Props {
  visible: boolean;
  fechar: () => void;
  finalizar: () => void;
  // Recebe os dados como prop
  dadosOcr: { titulo: string; categoria: string; data: string; horas: string };
}

export default function CadModal({ visible, fechar, finalizar, dadosOcr }: Props) {
  // Cria estados para os inputs
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [horas, setHoras] = useState("");
  const [descricao, setDescricao] = useState("");

  // Quando o modal abre ou os dados mudam, preenche os inputs
  useEffect(() => {
    if (visible && dadosOcr) {
      setTitulo(dadosOcr.titulo || "");
      setCategoria(dadosOcr.categoria || "");
      setData(dadosOcr.data || "");
      setHoras(dadosOcr.horas || "");
    }
  }, [visible, dadosOcr]);

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        {/* ... Header igualzinho ao que tinhas ... */}

        <Text style={styles.label}>Título da Atividade</Text>
        <TextInput 
          style={styles.input} 
          value={titulo} 
          onChangeText={setTitulo} 
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput 
          style={styles.input} 
          value={categoria} 
          onChangeText={setCategoria} 
        />

        <View style={styles.row}>
          <View style={styles.metade}>
            <Text style={styles.label}>Data</Text>
            <TextInput 
              style={styles.input} 
              value={data} 
              onChangeText={setData} 
            />
          </View>

          <View style={styles.metade}>
            <Text style={styles.label}>Horas</Text>
            <TextInput 
              style={styles.input} 
              value={horas} 
              onChangeText={setHoras} 
            />
          </View>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput 
          style={styles.textArea} 
          multiline 
          value={descricao} 
          onChangeText={setDescricao} 
        />

        <TouchableOpacity style={styles.botao} onPress={finalizar}>
          <Text style={styles.textoBotao}>Próximo</Text>
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