import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.orangeLine} />

      <View style={styles.header}>
        <Text style={styles.hello}>
          Olá, Filipe Xavier 👋
        </Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            + Nova Atividade
          </Text>
        </Pressable>
      </View>

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

      <Text style={styles.courseHours}>
        Carga horária do curso: 100h
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
            Monitoria em Design UI/UX (13h)
          </Text>

          <Text style={styles.approved}>
            Aprovada ✓
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.activityText}>
            Curso de Javascript (8h)
          </Text>

          <Text style={styles.rejected}>
            Rejeitada ✕
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.activityText}>
            SEO Hack North Conference
          </Text>

          <Text style={styles.pending}>
            Em análise ⏳
          </Text>
        </View>
      </View>

      <Button
        title="Ir para Home"
        onPress={() => router.replace("/")}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  orangeLine: {
    height: 4,
    backgroundColor: "#ef963f",
    marginTop: 5,
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  activityText: {
    flex: 1,
    marginRight: 10,
  },

  approved: {
    color: "green",
    fontWeight: "bold",
  },

  rejected: {
    color: "red",
    fontWeight: "bold",
  },

  pending: {
    color: "#ef963f",
    fontWeight: "bold",
  },
});