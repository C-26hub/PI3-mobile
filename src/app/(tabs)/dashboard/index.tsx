import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

//endereço principal do servidor
const API_BASE_URL = "https://api-horas-complementares.onrender.com";

//cria componente dashboard, controla carregamento e guarda iformação do nomde do aluno vindo da api
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [nomeAluno, setNomeAluno] = useState("Aluno");
//informação dos cards
  const [metricas, setMetricas] = useState({
    aprovadas: 0,
    emAnalise: 0,
    rejeitadas: 0,
    meta: 100,
  });
 //cria lista vazia
  const [atividadesRecentes, setAtividadesRecentes] = useState<any[]>([]);
 // buscar dados da api enquanto carrega
  useEffect(() => {
    carregarDadosDoDashboard();
  }, []);
// busca token do aluno 
  async function carregarDadosDoDashboard() {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("userToken");

      if (!token) {
        router.replace("/");
        return;
      }
   // envia token para api em formato json
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
   // requisição para buscar informação do aluno para mosttrar no dashboard
      const resDashboard = await fetch(
        `${API_BASE_URL}/api/aluno-portal/dashboard`,
        { headers },
      );
   // busca atividades recentes
      const resSolicitacoes = await fetch(
        `${API_BASE_URL}/api/aluno-portal/solicitacoes?ordenarData=desc`,
        { headers },
      );
  // converte resposta da api para json
      if (resDashboard.ok) {
        const dataDash = await resDashboard.json();
  // pega o primeiro nome pra mostrar na tela
        if (dataDash.aluno?.nome) {
          setNomeAluno(dataDash.aluno.nome.split(" ")[0]); 
        }
  // atualiza valores dos cards baseado na api
        setMetricas({
          aprovadas: dataDash.cards?.horasAprovadas || 0,
          emAnalise: dataDash.cards?.horasEmAnalise || 0,
          rejeitadas: dataDash.cards?.horasRejeitadas || 0,
          meta: dataDash.progresso?.limiteHoras || 100,
        });
      }

      if (resSolicitacoes.ok) {
        const dataSol = await resSolicitacoes.json();

        const ultimas = dataSol.solicitacoes
          ? dataSol.solicitacoes.slice(0, 3)
          : [];
        setAtividadesRecentes(ultimas);
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar as informações do servidor.",
      );
    } finally {
      setLoading(false);
    }
  }

  // calcula horas faltantes e mostra em % sem o número ficar negativado
  const horasFaltantes = Math.max(0, metricas.meta - metricas.aprovadas);
  const progressoPercentual =
    metricas.meta > 0
      ? Math.min(100, (metricas.aprovadas / metricas.meta) * 100)
      : 0;
//recebe status e devolve cor e texto de acordo
  const getStatusVisual = (status: string) => {
    switch (status) {
      case "APROVADA":
        return { cor: "#18b84f", texto: "Atividade aprovada" };
      case "REJEITADA":
        return { cor: "#ef4444", texto: "Atividade rejeitada" };
      case "PENDENTE":
        return { cor: "#ef963f", texto: "Em análise" };
      default:
        return { cor: "#999", texto: status };
    }
  };
//se estiver carregando n mostra dashboard
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#ef7d00" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Carregando seu painel...
        </Text>
      </View>
    );
  }
// começo da interface
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />

      <View style={styles.orangeLine} />

      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../../../assets/Senac_logo.png")}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.hello}>Olá, {nomeAluno} 👋</Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.modernCard}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(24, 184, 79, 0.15)" },
            ]}
          >
            <Ionicons name="checkmark-circle" size={24} color="#18b84f" />
          </View>
          <Text style={[styles.cardValue, { color: "#18b84f" }]}>
            {metricas.aprovadas}h
          </Text>
          <Text style={styles.cardTitle}>Aprovadas</Text>
        </View>

        <View style={styles.modernCard}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(239, 150, 63, 0.15)" },
            ]}
          >
            <Ionicons name="time" size={24} color="#ef963f" />
          </View>
          <Text style={[styles.cardValue, { color: "#ef963f" }]}>
            {metricas.emAnalise}h
          </Text>
          <Text style={styles.cardTitle}>Em análise</Text>
        </View>

        <View style={styles.modernCard}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(239, 68, 68, 0.15)" },
            ]}
          >
            <Ionicons name="close-circle" size={24} color="#ef4444" />
          </View>
          <Text style={[styles.cardValue, { color: "#ef4444" }]}>
            {metricas.rejeitadas}h
          </Text>
          <Text style={styles.cardTitle}>Rejeitadas</Text>
        </View>

        <View style={styles.modernCard}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(0, 102, 204, 0.15)" },
            ]}
          >
            <Ionicons name="flag" size={22} color="#0066cc" />
          </View>
          <Text style={[styles.cardValue, { color: "#0066cc" }]}>
            {horasFaltantes}h
          </Text>
          <Text style={styles.cardTitle}>Faltantes</Text>
          <Text style={styles.cardSub}>Meta: {metricas.meta}h</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progresso Geral</Text>
        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progressoPercentual}%` }]}
          />
        </View>
        <View style={styles.progressNumbers}>
          <Text style={styles.progressTextDark}>
            {metricas.aprovadas}h validadas
          </Text>
          <Text style={styles.progressTextLight}>
            {metricas.meta}h exigidas
          </Text>
        </View>
      </View>

      <View style={styles.warningBox}>
        <View style={styles.warningHeader}>
          <Ionicons
            name="notifications"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.warningHeaderText}>Avisos Recentes</Text>
        </View>

        <View style={styles.warningContent}>
          {atividadesRecentes.length === 0 ? (
            <Text style={{ padding: 15, textAlign: "center", color: "#888" }}>
              Nenhuma atividade recente.
            </Text>
          ) : (
            atividadesRecentes.map((atividade) => { //percorre lista procursndo atividade e cria os componentes
              const visual = getStatusVisual(atividade.status);
              return (
                <View key={atividade.id} style={styles.warningRow}>
                  <View
                    style={[styles.statusDot, { backgroundColor: visual.cor }]}
                  />
                  <View style={styles.warningTexts}>
                    <Text style={styles.activityText} numberOfLines={1}>
                      {atividade.titulo} ({atividade.cargaHoraria}h)
                    </Text>
                    <Text style={styles.statusText}>{visual.texto}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <Pressable
          style={styles.seeAllButton}
          onPress={() => router.push("/(tabs)/historico")} // Rota para a sua tela de histórico
        >
          <Text style={styles.seeAllText}>Ver Histórico Completo</Text>
          <Ionicons name="arrow-forward" size={14} color="#0066cc" />
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 20, marginBottom: 40, marginTop: 10 }}>
        <Pressable
          style={styles.logoutButton}
          onPress={async () => {
            await SecureStore.deleteItemAsync("userToken"); //logout e volta p o login
            router.replace("/");
          }}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  orangeLine: {
    height: 4,
    backgroundColor: "#ef7d00",
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logoContainer: {},
  logoImage: {
    width: 80,
    height: 40,
  },
  logo: {
    width: 100,
    height: 48,
  },
  buttonAction: {
    flexDirection: "row",
    backgroundColor: "#ef7d00",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
  },
  buttonActionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 25,
  },
  hello: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  subHello: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  modernCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },
  cardSub: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  progressSection: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  progressBackground: {
    height: 12,
    backgroundColor: "#Eef2f6",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0B5AA2",
    borderRadius: 6,
  },
  progressNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressTextDark: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B5AA2",
  },
  progressTextLight: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  warningBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 25,
    overflow: "hidden",
    elevation: 2,
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef7d00",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  warningHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  warningContent: {
    padding: 10,
  },
  warningRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 15,
  },
  warningTexts: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#777",
  },
  seeAllButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 15,
    backgroundColor: "#FAFAFA",
  },
  seeAllText: {
    color: "#0066cc",
    fontSize: 13,
    fontWeight: "700",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoutButtonText: {
    color: "#e63946",
    fontWeight: "700",
  },
});
