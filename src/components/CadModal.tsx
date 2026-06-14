import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
// 1. O novo import do SecureStore
import * as SecureStore from 'expo-secure-store';

interface Props {
  visible: boolean;
  fechar: () => void;
  finalizar: () => void; 
  dadosOcr: { titulo: string; categoria: string; data: string; horas: string; uriDaImagem?: string };
}

// Lembre-se de colocar a URL do Render
const API_BASE_URL = "https://api-horas-complementares.onrender.com"; 

export default function CadModal({ visible, fechar, finalizar, dadosOcr }: Props) {
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

  const handleEnviarAtividade = async () => {
    if (!titulo || !categoria || !data || !horas || !descricao) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Lendo os dados do cofre seguro do Expo
      const jsonSalvo = await SecureStore.getItemAsync('usuarioLogado');
      const usuario = jsonSalvo ? JSON.parse(jsonSalvo) : null;
      
      if (!usuario?.id) {
        Alert.alert("Sessão Expirada", "Faça login novamente.");
        setIsSubmitting(false);
        return;
      }

      // 3. Monta o Payload "traduzido" para a API (Zod)
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("categoria", categoria.trim().toUpperCase()); // Força ENSINO, PESQUISA ou EXTENSAO
      
      // Ajusta a data de DD/MM/AAAA para AAAA-MM-DD
      const dataFormatada = data.includes('/') 
        ? data.split('/').reverse().join('-') 
        : data;
      formData.append("dataInicio", dataFormatada);
      
      formData.append("cargaHoraria", horas);
      formData.append("descricao", descricao);

      // 4. Anexa a Imagem (MÉTODO BLINDADO)
      if (dadosOcr && dadosOcr.uriDaImagem) {
        // 🚨 O Soro da Verdade: Vamos ver se a foto realmente chegou no Modal
        console.log("=== ENVIANDO FOTO ===");
        console.log("URI:", dadosOcr.uriDaImagem);

        // Forçamos o nome e o tipo ideais para o Multer não reclamar
        formData.append("comprovante", {
          uri: dadosOcr.uriDaImagem,
          name: "comprovante_seguro.jpg", // Nome blindado com extensão clara
          type: "image/jpeg"              // Carimbo oficial do padrão web
        } as any); 
      } else {
        console.log("⚠️ ATENÇÃO: Nenhuma URI de imagem foi encontrada no dadosOcr!");
      }

      // 5. Dispara o fetch para a rota da API (SEM HEADERS DE CONTENT-TYPE)
      const url = `${API_BASE_URL}/api/aluno-portal/${usuario.id}/solicitacoes`;
      
      const response = await fetch(url, {
        method: "POST",
        // Deixe apenas o body! O React Native cuidará do boundary e do Content-Type.
        body: formData,
      });

      if (!response.ok) {
        const erroBackend = await response.json();
        console.log("Erro da API:", erroBackend);
        
        // Trata a exibição do erro caso seja validação do Zod
        if (erroBackend.detalhes) {
            const mensagens = Object.values(erroBackend.detalhes).flat().join("\n");
            Alert.alert("Erro de Validação", mensagens);
        } else {
            Alert.alert("Erro", erroBackend.error || erroBackend.erro || "Falha ao enviar atividade.");
        }
        setIsSubmitting(false);
        return;
      }

      Alert.alert("Sucesso", "Atividade enviada para aprovação!");
      finalizar(); // Atualiza a lista pai
      fechar(); // Fecha o modal

    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Falha de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header visual */}
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
          onPress={handleEnviarAtividade}
          disabled={isSubmitting}
        >
          <Text style={styles.textoBotao}>
            {isSubmitting ? "Enviando..." : "Enviar Atividade"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoCancelar} onPress={fechar} disabled={isSubmitting}>
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
    borderColor: "#fff"
  },
  textoBotaoCancelar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }
});
