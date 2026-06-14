import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useState } from "react";

import CadModal from "../../../components/CadModal";

export default function Cursos() {
  const [loading, setLoading] = useState(false);
  const [cadVisible, setCadVisible] = useState(false);
  const [dadosCompartilhados, setDadosCompartilhados] = useState<any>(null);

  const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;


  const handleUploadAndOCR = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      setLoading(true);

      const base64Image = await FileSystem.readAsStringAsync(file.uri, {
        encoding: "base64",
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: "Analise este certificado e retorne APENAS um objeto JSON puro, sem blocos de código markdown, com as chaves: 'titulo', 'horas', 'data', 'categoria'. Em 'categoria', classifique obrigatoriamente em apenas uma destas três opções (exatamente em maiúsculas e sem acentos): 'ENSINO', 'EXTENSAO' ou 'PESQUISA'." },
                  {
                    inline_data: {
                      mime_type: file.mimeType || "image/jpeg",
                      data: base64Image,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              response_mime_type: "application/json",
            },
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Erro na API do Gemini");
      }

      const jsonText = data.candidates[0].content.parts[0].text;
      const dadosExtraidos = JSON.parse(jsonText);

      if (dadosExtraidos.categoria) {
        let catTratada = dadosExtraidos.categoria.toUpperCase().trim();

        if (catTratada === "EXTENSÃO" || catTratada === "EXTENSAO") {
          catTratada = "EXTENSAO";
        }

        const categoriasValidas = ["ENSINO", "EXTENSAO", "PESQUISA"];
        
        if (!categoriasValidas.includes(catTratada)) {
          catTratada = "ENSINO";
        }

        dadosExtraidos.categoria = catTratada;
      } else {
        dadosExtraidos.categoria = "ENSINO";
      }

      dadosExtraidos.uriDaImagem = file.uri;

      setLoading(false);
      setDadosCompartilhados(dadosExtraidos);
      setCadVisible(true); 
    } catch (error: any) {
      console.error("ERRO COMPLETO NO PROCESSO:", error);
      setLoading(false);
      Alert.alert(
        "Erro",
        "Não foi possível ler os dados do certificado automaticamente.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Submeter Atividade</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.textoGrande}>Envie o comprovante</Text>
        <Text style={styles.subtitulo}>Apenas Imagens (JPG ou PNG)</Text>

        <TouchableOpacity
          style={styles.caixa}
          onPress={handleUploadAndOCR}
          disabled={loading}
        >
          {loading ? (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator size="large" color="#0B5AA2" />
              <Text
                style={[
                  styles.textoUpload,
                  { marginTop: 10, color: "#0B5AA2" },
                ]}
              >
                Processando IA...
              </Text>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={60} color="#0B5AA2" />
              <Text style={styles.textoUpload}>Toque para enviar</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <CadModal
        visible={cadVisible}
        fechar={() => setCadVisible(false)}
        finalizar={() => setCadVisible(false)}
        dadosOcr={dadosCompartilhados}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D97B2D", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 50 },
  titulo: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoGrande: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitulo: { color: "rgba(255,255,255,0.8)", marginBottom: 40, fontSize: 14 },
  caixa: {
    width: 260,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  textoUpload: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginTop: 15,
  },
});