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
import { useState } from "react";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

const CURSOS = [
  "Análise e Desenvolvimento de Sistemas",
  "Biomedicina",
  "Gastronomia",
  "Jogos Digitais",
  "Moda",
];

const CATEGORIAS = [
  "Pesquisa",
  "Extensão",
  "Ensino",
  "Geral",
];

const CARDS = [
  {
    titulo: "Horas Aprovadas",
    valor: "45h",
    cor: "#18b84f",
  },
  {
    titulo: "Horas em análise",
    valor: "60h",
    cor: "#ef7d00",
  },
  {
    titulo: "Horas rejeitadas",
    valor: "20h",
    cor: "#ef4444",
  },
  {
    titulo: "Horas Faltantes",
    valor: "55h",
    sub: "de 100h exigidas",
    cor: "#0066cc",
  },
];

export default function Dashboard() {
  const [mostrarCursos, setMostrarCursos] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  const [cursoSelecionado, setCursoSelecionado] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const renderDropdown = (
    itens: string[],
    selecionado: string | null,
    setSelecionado: (valor: string) => void,
    fechar: () => void
  ) => (
    <View style={styles.dropdown}>
      {itens.map((item) => (
        <Pressable
          key={item}
          onPress={() => {
            setSelecionado(item);
            fechar();
          }}
        >
          <Text
            style={[
              styles.dropdownItem,
              selecionado === item && styles.itemSelecionado,
            ]}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/Senac_logo.svg.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.orangeLine} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hello}>
          Olá, Filipe Xavier 👋
        </Text>

        <Pressable style={styles.button}>
          <MaterialCommunityIcons
            name="plus"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Nova Atividade
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
          <View style={styles.filterContent}>
  <Text style={styles.filterButtonText}>
    Curso
  </Text>

  <MaterialIcons
    name="keyboard-arrow-down"
    size={20}
    color="#000"
  />
</View>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          onPress={() => {
            setMostrarCategorias(!mostrarCategorias);
            setMostrarCursos(false);
          }}
        >
          <View style={styles.filterContent}>
  <Text style={styles.filterButtonText}>
    Categoria
  </Text>

  <MaterialIcons
    name="keyboard-arrow-down"
    size={20}
    color="#000"
  />
</View>
        </Pressable>
      </View>

      {mostrarCursos &&
        renderDropdown(
          CURSOS,
          cursoSelecionado,
          setCursoSelecionado,
          () => setMostrarCursos(false)
        )}

      {mostrarCategorias &&
        renderDropdown(
          CATEGORIAS,
          categoriaSelecionada,
          setCategoriaSelecionada,
          () => setMostrarCategorias(false)
        )}

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {CARDS.map((card) => (
          <View
            key={card.titulo}
            style={[
              styles.smallCard,
              { backgroundColor: card.cor },
            ]}
          >
            <Text style={styles.cardTitle}>
              {card.titulo}
            </Text>

            <Text style={styles.cardValue}>
              {card.valor}
            </Text>

            {card.sub && (
              <Text style={styles.cardSub}>
                {card.sub}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.warningBox}>
        <View style={styles.warningHeader}>
          <Text style={styles.warningHeaderText}>
            🔔 Avisos
          </Text>
        </View>

        {/* Aviso 1 */}
        <View style={styles.tableRow}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={28}
            color="#666"
          />

          <Text style={styles.activityText}>
            Monitoria em Design UI/UX (15h)
          </Text>

          <Text style={styles.statusText}>
            Sua atividade foi aprovada
          </Text>

          <AntDesign
            name="check-circle"
            size={22}
            color="#22c55e"
          />
        </View>

        {/* Aviso 2 */}
        <View style={styles.tableRow}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={28}
            color="#666"
          />

          <Text style={styles.activityText}>
            Curso de Javascript (5h)
          </Text>

          <Text style={styles.statusText}>
            Atividade rejeitada: faltou comprovante
          </Text>

          <AntDesign
            name="close-circle"
            size={22}
            color="#ef4444"
          />
        </View>

        {/* Aviso 3 */}
        <View style={styles.tableRow}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={28}
            color="#666"
          />

          <Text style={styles.activityText}>
            SQL Week Recife Conference (10h)
          </Text>

          <Text style={styles.statusText}>
            Sua atividade está em análise
          </Text>

          <MaterialCommunityIcons
            name="progress-clock"
            size={24}
            color="#f59e0b"
          />
        </View>

        <View style={styles.warningFooter}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={34}
            color="#999"
          />
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

const COLORS = {
  white: "#fff",
  primary: "#ef7d00",
  secondary: "#ef963f",
  filterButton: "#e7a766",
  selectedItem: "#efc08f",
  border: "#ddd",
  borderLight: "#e5e5e5",
  dropdownBorder: "#ccc",
  grayLight: "#d9d9d9",
  footerGray: "#f0f0f0",
  blue: "#0066cc",
};

const SPACING = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  logoContainer: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },

  logoImage: {
    width: 70,
    height: 50,
  },

  orangeLine: {
    height: 4,
    backgroundColor: COLORS.secondary,
    marginBottom: SPACING.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },

  hello: {
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grayLight,
    marginHorizontal: SPACING.lg,
    padding: SPACING.sm,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },

  filterLabel: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },

  filterButton: {
    backgroundColor: COLORS.filterButton,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: SPACING.sm,
  },

  filterButtonText: {
    fontWeight: "bold",
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
  },

  smallCard: {
    width: "48%",
    minHeight: 140,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  cardValue: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 12,
  },

  cardSub: {
    color: COLORS.white,
    marginTop: SPACING.xs,
    fontSize: 12,
  },

  warningBox: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },

  warningHeader: {
    backgroundColor: COLORS.primary,
    padding: 12,
  },

  warningHeaderText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  activityText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 10,
    fontWeight: "600",
  },

  statusText: {
    flex: 1,
    textAlign: "right",
    fontSize: 9.9,
    marginRight: 10,
  },

  warningFooter: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.footerGray,
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
  },


  dropdown: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.dropdownBorder,
    marginTop: -15,
    marginBottom: SPACING.md,
  },

  dropdownItem: {
    padding: SPACING.md,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },

  itemSelecionado: {
    backgroundColor: COLORS.selectedItem,
  },

  verMais: {
    color: COLORS.blue,
    padding: SPACING.md,
    fontSize: 16,
  },

  filterContent: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},
});