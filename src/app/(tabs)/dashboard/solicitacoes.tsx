import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { solicitacoesMock, Solicitacao } from "../../../mocks/solicitacoesMock";

export default function Solicitacoes() {
  const renderItem = ({ item }: { item: Solicitacao }) => {
    return (
      <View style={styles.card}>
        <View style={styles.topcard}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.nomeAtividade}
          </Text>
          <Text style={styles.status}>{item.status.toUpperCase()}</Text>
        </View>

        <Text>
          {item.horas}h | Enviado em: {item.dataEnvio}
        </Text>

        <Pressable style={styles.button} onPress={() => console.log(item.id)}>
          <Text>Ver Detalhes</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={solicitacoesMock}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 40 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  topcard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,

  },
  status: {
    fontSize: 12,
    color: "#B81414",
    backgroundColor: "#FFA6A6",
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  button: {
    marginTop: 14,
    alignSelf: "flex-start",
    borderRadius: 16,
    borderColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
