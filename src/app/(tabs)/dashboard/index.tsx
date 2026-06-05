import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {StyleSheet,Text,View,Button,ScrollView,Pressable, TouchableOpacity} from "react-native";
import { Link, router } from "expo-router";

import CadastroModal from "../../../components/CadModal";
import UploadModal from "../../../components/UploadModal";
import SucessoModal from "../../../components/SucessModal";

export default function Dashboard() {
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [dadosOcr, setDadosOcr] = useState({ titulo: "", horas: "", data: "", categoria: "" });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.button} onPress={() => setModalUpload(true)}>
          <Text style={styles.buttonText}>+ Nova Atividade</Text>
        </Pressable>
      </View>

      <Text style={styles.hello}>Olá, Filipe Xavier 👋</Text>

      <View style={[styles.card, { backgroundColor: "#18b84f" }]}>
        <Text style={styles.cardTitle}>Horas Aprovadas</Text>
        <Text style={styles.cardValue}>45h</Text>
      </View>

      <View style={[styles.card, { backgroundColor: "#ef963f" }]}>
        <Text style={styles.cardTitle}>Horas em análise</Text>
        <Text style={styles.cardValue}>60h</Text>
      </View>

      <View style={[styles.card, { backgroundColor: "#ef4444" }]}>
        <Text style={styles.cardTitle}>Horas rejeitadas</Text>
        <Text style={styles.cardValue}>20h</Text>
      </View>

      <Text style={styles.progressTitle}>Barra de progresso</Text>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.progressNumbers}>
        <Text>45h</Text>
        <Text>100h</Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Avisos</Text>

        <View style={styles.warningItem}>
          <Text>Monitoria em Design UI/UX</Text>
          <Text style={styles.green}></Text>
        </View>

        <View style={styles.warningItem}>
          <Text>Curso de Javascript</Text>
          <Text style={styles.red}></Text>
        </View>

        <View style={styles.warningItem}>
          <Text>SEO Hack North Conference</Text>
          <Text></Text>
        </View>
      </View>

      <Button title="Ir para Home" onPress={() => router.replace("/")} />

        <UploadModal
          visible={modalUpload}
          fechar={() => setModalUpload(false)}
          proximo={(dados) => {
            setDadosOcr(dados); // Guarda os dados que a IA enviou
            setModalUpload(false);
            setModalCadastro(true);
          }}
        />

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
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004b93",
  },
  button: {
    backgroundColor: "#ef963f",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  hello: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    borderRadius: 20,
    padding: 30,
    marginBottom: 25,
    alignItems: "center",
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  cardValue: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },

  progressTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  progressBackground: {
    height: 30,
    backgroundColor: "#ddd",
    borderRadius: 15,
    overflow: "hidden",
  },

  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#005fa3",
    borderRadius: 15,
  },

  progressNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 30,
  },

  warningBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 40,
  },

  warningTitle: {
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ef963f",
  },

  warningItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
});
