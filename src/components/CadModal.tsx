import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

interface Props {
  visible: boolean;
  fechar: () => void;
  finalizar: (dados: any) => void | Promise<void>;
  dadosOcr: {
    titulo: string;
    categoria: string;
    data: string;
    horas: string;
    uriDaImagem?: string;
  };
}

export default function CadModal({
  visible,
  fechar,
  finalizar,
  dadosOcr,
}: Props) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [horas, setHoras] = useState("");
  const [descricao, setDescricao] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible && dadosOcr) {
      setTitulo(dadosOcr.titulo || "");
      setCategoria(dadosOcr.categoria || "");
      setData(dadosOcr.data || "");
      setHoras(dadosOcr.horas || "");
      setDescricao("");
    }
  }, [visible, dadosOcr]);

  const handleValidarEEnviar = async () => {
    if (!titulo || !categoria || !data || !horas || !descricao) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Ajusta a data de DD/MM/AAAA para AAAA-MM-DD
      const dataFormatada = data.includes("/")
        ? data.split("/").reverse().join("-")
        : data;

      const dadosParaOBackend = {
        titulo,
        categoria: categoria.trim().toUpperCase(),
        data: dataFormatada,
        horas,
        descricao,
      };

      await finalizar(dadosParaOBackend);
      
    } catch (error) {
      console.error("Erro ao finalizar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Nova Atividade</Text>
        </View>

        <Text style={styles.label}>Título da Atividade</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          editable={!isSubmitting}
        />

        <Text style={styles.label}>Categoria (ENSINO, PESQUISA, EXTENSAO)</Text>
        <TextInput
          style={styles.input}
          value={categoria}
          onChangeText={setCategoria}
          autoCapitalize="characters"
          editable={!isSubmitting}
        />

        <View style={styles.row}>
          <View style={styles.metade}>
            <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
            <TextInput
              style={styles.input}
              value={data}
              onChangeText={setData}
              keyboardType="numbers-and-punctuation"
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.metade}>
            <Text style={styles.label}>Horas</Text>
            <TextInput
              style={styles.input}
              value={horas}
              onChangeText={setHoras}
              keyboardType="numeric"
              editable={!isSubmitting}
            />
          </View>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={descricao}
          onChangeText={setDescricao}
          editable={!isSubmitting}
        />

        <TouchableOpacity
          style={[styles.botao, isSubmitting && { opacity: 0.7 }]}
          onPress={handleValidarEEnviar}
          disabled={isSubmitting}
        >
          <Text style={styles.textoBotao}>
            {isSubmitting ? "Enviando..." : "Enviar Atividade"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={fechar}
          disabled={isSubmitting}
        >
          <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
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
  botaoCancelar: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  textoBotaoCancelar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});