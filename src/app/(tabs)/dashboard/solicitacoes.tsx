import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Alert } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = "https://api-horas-complementares.onrender.com";

interface SolicitacaoBackend {
  id: string;
  titulo: string;
  categoria: string;
  cargaHoraria: number;
  status: "PENDENTE" | "APROVADA" | "REJEITADA";
  dataEnvio: string;
  podeEditar: boolean;
}

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoBackend[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      buscarSolicitacoes();
    }, [])
  );

  const buscarSolicitacoes = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync('userToken');

      if (!token) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/aluno-portal/solicitacoes?ordenarData=desc`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar solicitações");
      }

      setSolicitacoes(data.solicitacoes);

    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro de Conexão", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataIso: string) => {
    if (!dataIso) return "";
    const data = new Date(dataIso);
    return data.toLocaleDateString('pt-BR');
  };

  const getCorStatus = (status: string) => {
    const statusLimpo = status ? status.trim().toUpperCase() : "PENDENTE";

    switch (statusLimpo) {
      case "APROVADA": return { corTexto: "#155724", corFundo: "#d4edda" };
      case "REJEITADA": return { corTexto: "#721c24", corFundo: "#f8d7da" };
      case "PENDENTE": 
      default: 
        return { corTexto: "#856404", corFundo: "#fff3cd" };
    }
  };

  const renderItem = ({ item }: { item: SolicitacaoBackend }) => {
    const estiloStatus = getCorStatus(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.topcard}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.titulo}
          </Text>
          <Text style={[styles.status, { color: estiloStatus.corTexto, backgroundColor: estiloStatus.corFundo }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.detalhes}>
          {item.cargaHoraria}h | Enviado em: {formatarData(item.dataEnvio)}
        </Text>

        <Pressable style={styles.button} onPress={() => console.log("Abrir detalhes do ID:", item.id)}>
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Solicitações</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0B5AA2" />
          <Text style={{ marginTop: 10, color: "#666" }}>Carregando histórico...</Text>
        </View>
      ) : solicitacoes.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={{ color: "#666", fontSize: 16 }}>Você ainda não enviou atividades.</Text>
        </View>
      ) : (
        <FlatList
          data={solicitacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  topcard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    marginRight: 10,
    color: '#333'
  },
  status: {
    fontSize: 11,
    fontWeight: 'bold',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden', 
  },
  detalhes: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  }
});