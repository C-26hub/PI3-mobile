import {
  Modal,
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

interface Props {
  visible: boolean;
  fechar: () => void;
  proximo: (dadosExtraidos: any) => void;
}

export default function UploadModal({ visible, fechar, proximo }: Props) {
  const [loading, setLoading] = useState(false);

  // Coloque sua chave gratuita do Google AI Studio aqui
  const GEMINI_API_KEY = "";

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
        encoding: 'base64',
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Analise este certificado e retorne APENAS um objeto JSON puro, sem blocos de código markdown, com as chaves: 'titulo', 'horas', 'data', 'categoria'." },
              { inline_data: { mime_type: file.mimeType || "image/jpeg", data: base64Image } }
            ]
          }],
          generationConfig: { 
            response_mime_type: "application/json" // Força a IA a devolver apenas JSON
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Erro na API do Gemini");
      }

      // Pega o texto da resposta e converte para objeto
      const jsonText = data.candidates[0].content.parts[0].text;
      const dadosExtraidos = JSON.parse(jsonText);

      dadosExtraidos.uriDaImagem = file.uri;

      setLoading(false);
      proximo(dadosExtraidos);

    } catch (error: any) {
      console.error("ERRO COMPLETO:", error);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível ler o certificado.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={fechar}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Upload de Comprovante</Text>
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
                  Lendo certificado...
                </Text>
              </View>
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={60}
                  color="#0B5AA2"
                />
                <Text style={styles.textoUpload}>Toque para enviar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D97B2D", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 50 },
  titulo: { color: "#fff", fontSize: 24, fontWeight: "bold", marginLeft: 15 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoGrande: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  subtitulo: { color: "#fff", marginBottom: 30, marginTop: 10 },
  caixa: {
    width: 280,
    height: 220,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textoUpload: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
});
