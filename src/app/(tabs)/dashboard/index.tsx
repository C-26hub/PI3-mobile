
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";

import CadastroModal from "../../../components/CadModal";
import SucessoModal from "../../../components/SucessModal";

export default function Dashboard() {
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [dadosOcr, setDadosOcr] = useState({ titulo: "", horas: "", data: "", categoria: "" });
  const [mostrarCursos, setMostrarCursos] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);


  return (
    <ScrollView style={styles.container}>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/120x60.png?text=Logo" }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Linha Laranja */}
      <View style={styles.orangeLine} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hello}>
          Olá, Filipe Xavier 👋
        </Text>

        <Pressable style={styles.button} onPress={() => setModalUpload(true)}>
          <Text style={styles.buttonText}>
            + Nova Atividade
          </Text>
        </Pressable>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>

        <Text style={styles.filterLabel}>
           Filtro:
        </Text>

        <Pressable
          style={styles.filterButton}
          onPress={() => {
            setMostrarCursos(!mostrarCursos);
            setMostrarCategorias(false);
          }}
        >
          <Text style={styles.filterButtonText}>
            Curso ▼
          </Text>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          onPress={() => {
            setMostrarCategorias(!mostrarCategorias);
            setMostrarCursos(false);
          }}
        >
          <Text style={styles.filterButtonText}>
            Categoria ▼
          </Text>
        </Pressable>

      </View>

      {mostrarCursos && (
  <View style={styles.dropdown}>

    <Pressable
      onPress={() => {
        setCursoSelecionado(
          "Análise e Desenvolvimento de Sistemas"
        );
        setMostrarCursos(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          cursoSelecionado ===
            "Análise e Desenvolvimento de Sistemas" &&
            styles.itemSelecionado,
        ]}
      >
        Análise e Desenvolvimento de Sistemas
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCursoSelecionado("Biomedicina");
        setMostrarCursos(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          cursoSelecionado === "Biomedicina" &&
            styles.itemSelecionado,
        ]}
      >
        Biomedicina
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCursoSelecionado("Gastronomia");
        setMostrarCursos(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          cursoSelecionado === "Gastronomia" &&
            styles.itemSelecionado,
        ]}
      >
        Gastronomia
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCursoSelecionado("Jogos Digitais");
        setMostrarCursos(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          cursoSelecionado === "Jogos Digitais" &&
            styles.itemSelecionado,
        ]}
      >
        Jogos Digitais
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCursoSelecionado("Moda");
        setMostrarCursos(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          cursoSelecionado === "Moda" &&
            styles.itemSelecionado,
        ]}
      >
        Moda
      </Text>
    </Pressable>

    <Text style={styles.verMais}>
      Ver Mais...
    </Text>

  </View>
)}

{mostrarCategorias && (
  <View style={styles.dropdown}>

    <Pressable
      onPress={() => {
        setCategoriaSelecionada("Pesquisa");
        setMostrarCategorias(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          categoriaSelecionada === "Pesquisa" &&
            styles.itemSelecionado,
        ]}
      >
        Pesquisa
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCategoriaSelecionada("Extensão");
        setMostrarCategorias(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          categoriaSelecionada === "Extensão" &&
            styles.itemSelecionado,
        ]}
      >
        Extensão
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCategoriaSelecionada("Ensino");
        setMostrarCategorias(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          categoriaSelecionada === "Ensino" &&
            styles.itemSelecionado,
        ]}
      >
        Ensino
      </Text>
    </Pressable>

    <Pressable
      onPress={() => {
        setCategoriaSelecionada("Geral");
        setMostrarCategorias(false);
      }}
    >
      <Text
        style={[
          styles.dropdownItem,
          categoriaSelecionada === "Geral" &&
            styles.itemSelecionado,
        ]}
      >
        Geral
      </Text>
    </Pressable>

  </View>
)}

      {/* Cards */}
      <View style={styles.cardsContainer}>

        <View
          style={[
            styles.smallCard,
            { backgroundColor: "#18b84f" },
          ]}
        >
          <Text style={styles.cardTitle}>
            Horas Aprovadas
          </Text>

          <Text style={styles.cardValue}>
            45h
          </Text>
        </View>

        <View
          style={[
            styles.smallCard,
            { backgroundColor: "#ef963f" },
          ]}
        >
          <Text style={styles.cardTitle}>
            Horas em análise
          </Text>

          <Text style={styles.cardValue}>
            60h
          </Text>
        </View>

        <View
          style={[
            styles.smallCard,
            { backgroundColor: "#ef4444" },
          ]}
        >
          <Text style={styles.cardTitle}>
            Horas rejeitadas
          </Text>

          <Text style={styles.cardValue}>
            20h
          </Text>
        </View>

        <View
          style={[
            styles.smallCard,
            { backgroundColor: "#0066cc" },
          ]}
        >
          <Text style={styles.cardTitle}>
            Horas Faltantes
          </Text>

          <Text style={styles.cardValue}>
            55h
          </Text>

          <Text style={styles.cardSub}>
            de 100h exigidas
          </Text>
        </View>

      </View>

      <Text style={styles.progressTitle}>
        Barra de progresso
      </Text>

    

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.progressNumbers}>
        <Text>45h</Text>
        <Text>100h</Text>
      </View>

      <View style={styles.warningBox}>

        <View style={styles.warningHeader}>
          <Text style={styles.warningHeaderText}>
            🔔 Avisos
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.activityText}>
            Monitoria em Design UI/UX (15h)
          </Text>

          <Text style={styles.statusText}>
            Sua atividade foi aprovada 
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.activityText}>
            Curso de Javascript (5h)
          </Text>

          <Text style={styles.statusText}>
            Atividade rejeitada: faltou comprovante
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.activityText}>
            SQL week Recife Conference (10h)
          </Text>

          <Text style={styles.statusText}>
            Sua atividade está em análise 
          </Text>
        </View>

        <View style={styles.WarningFooter}>
          <Text style={styles.warningFooterArrow}>  </Text>
        </View>

      </View>

      <Button title="Ir para Home" onPress={() => router.replace("/")} />

        <CadastroModal
          visible={modalCadastro}
          dadosOcr={dadosOcr} // Passa os dados para o formulário
          fechar={() => setModalCadastro(false)}
          finalizar={() => {setModalCadastro(false); setModalSucesso(true)}}
        />

        <SucessoModal
          visible={modalSucesso}
          fechar={() => setModalSucesso(false)}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  logoContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },

  logoImage: {
    width: 120,
    height: 60,
  },

  orangeLine: {
    height: 4,
    backgroundColor: "#ef963f",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  hello: {
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#ef7d00",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },

  filterLabel: {
    fontSize: 18,
    marginRight: 10,
  },

  filterButton: {
    backgroundColor: "#e7a766",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 10,
  },

  filterButtonText: {
    fontWeight: "bold",
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  smallCard: {
    width: "48%",
    minHeight: 140,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  cardValue: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 12,
  },

  cardSub: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },

  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 20,
  },

  courseHours: {
    textAlign: "right",
    color: "#666",
    marginBottom: 10,
    marginHorizontal: 20,
  },

  progressBackground: {
    height: 28,
    backgroundColor: "#ddd",
    borderRadius: 14,
    overflow: "hidden",
    marginHorizontal: 20,
  },

  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#005fa3",
    borderRadius: 14,
  },

  progressNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 25,
    marginHorizontal: 20,
  },

  warningBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginHorizontal: 20,
    marginBottom: 25,
  },

  warningHeader: {
    backgroundColor: "#ef7d00",
    padding: 12,
  },

  warningHeaderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  activityText: {
    width: "35%",
    fontSize: 10,
    fontWeight: "600",
  },

  statusText: {
     width: "50%",
     textAlign: "right",
     fontSize: 9.9,
     
  },

  WarningFooter: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ffffff",
  },

  warningFooterArrow: {
    fontSize: 22,
    color: "#ffffff",
  },

  dropdown: {
  backgroundColor: "#fff",
  marginHorizontal: 20,
  borderWidth: 1,
  borderColor: "#ccc",
  marginTop: -15,
  marginBottom: 15,
},

dropdownItem: {
  padding: 15,
  fontSize: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#ffffff",
},

itemSelecionado: {
  backgroundColor: "#efc08f",
},

verMais: {
  color: "#0066cc",
  padding: 15,
  fontSize: 16,
},
});