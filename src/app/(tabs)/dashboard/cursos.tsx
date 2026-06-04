import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Cursos() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image
         
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.orangeLine} />

      <Text style={styles.title}>
        Meus Cursos
      </Text>

      <Text style={styles.subtitle}>
        Selecione o curso para gerenciar suas horas e certificados.
      </Text>

      {/* Card */}
      <View style={styles.card}>

        <View style={styles.iconBox}>
          <Image
         
            style={styles.computerIcon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.info}>

          <Text style={styles.course}>
            Análise e Desenvolvimento de Sistemas
          </Text>

          <View style={styles.rowInfo}>
            <Text style={styles.faculdade}>
              Faculdade Senac
            </Text>

            <Text style={styles.turno}>
              Turno: Manhã
            </Text>
          </View>

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

        <Image
          
          style={styles.arrowIcon}
          resizeMode="contain"
        />

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  logoImage: {
    width: 120,
    height: 60,
  },

  orangeLine: {
    height: 4,
    backgroundColor: '#ef963f',
    marginTop: 5,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },

  subtitle: {
    marginTop: 10,
    color: '#5c5b5b',
    marginBottom: 25,
    marginHorizontal: 20,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#ebe8e8',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#b8c8e4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  computerIcon: {
    width: 35,
    height: 35,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  course: {
    fontWeight: 'bold',
    fontSize: 11.7,
  },

  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  faculdade: {
    color: '#5c5b5b',
    fontSize: 13,
  },

  turno: {
    color: '#5c5b5b',
    fontSize: 13,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  badge: {
    backgroundColor: '#16c45b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: '#24391b',
    fontSize: 10,
    fontWeight: 'bold',
  },

  periodo: {
    marginLeft: 10,
    color: '#5c5b5b',
  },

  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});