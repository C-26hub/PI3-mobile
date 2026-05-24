import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { solicitacoesMock, Solicitacao } from '../../../mocks/solicitacoesMock';

export default function Solicitacoes() {
  const renderItem = ({item}: {item: Solicitacao}) => {
    return (
    <View>
      <Text>{item.tipoAtividade}</Text>
      <Text>{item.horas}h | Enviado em: {item.dataEnvio}</Text>
      <Text>{item.status.toUpperCase()}</Text>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Minhas Solicitações</Text>
      <FlatList
        data={solicitacoesMock}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
