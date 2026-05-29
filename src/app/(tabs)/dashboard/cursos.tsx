import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Cursos() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Meus Cursos
        </Text>
        <Text style={styles.subtitle}>
          Selecione o curso para gerenciar suas horas e certificados.
        </Text>
        
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text></Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.course}>
              Análise e Desenvolvimento de Sistemas
            </Text>

            <Text style={styles.faculdade}>
              Faculdade Senac
            </Text>

            <View style={styles.footer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  ATIVO
                </Text>
              </View>

              <Text style={styles.periodo}>
                • 3º Período
              </Text>
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    borderTopWidth: 3,
    borderTopColor: '#ef963f',
    paddingTop: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004b93',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    marginTop: 10,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#cfd8dc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  course: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  faculdade: {
    color: '#666',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#16c45b',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  periodo: {
    marginLeft: 10,
    color: '#666',
  },
});
