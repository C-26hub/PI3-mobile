import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  white: '#fff',
  orange: '#ef963f',
  card: '#ebe8e8',
  iconBackground: '#b8c8e4',
  icon: '#0b4ea2',
  textSecondary: '#5c5b5b',
  success: '#16c45b',
  successText: '#24391b',
  arrow: '#222',
};

const COURSE = {
  nome: 'Análise e Desenvolvimento de Sistemas',
  faculdade: 'Faculdade Senac',
  turno: 'Turno: Manhã',
  status: 'ATIVO',
  periodo: '• 3º Período',
};

export default function Cursos() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Senac_logo.svg.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.orangeLine} />

      <Text style={styles.title}>Meus Cursos</Text>

      <Text style={styles.subtitle}>
        Selecione o curso para gerenciar suas horas e certificados.
      </Text>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="laptop"
            size={32}
            color={COLORS.icon}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.course}>
            {COURSE.nome}
          </Text>

          <View style={styles.rowInfo}>
            <Text style={styles.faculdade}>
              {COURSE.faculdade}
            </Text>

            <Text style={styles.turno}>
              {COURSE.turno}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {COURSE.status}
              </Text>
            </View>

            <Text style={styles.periodo}>
              {COURSE.periodo}
            </Text>
          </View>
        </View>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={34}
          color={COLORS.arrow}
          style={styles.arrowIcon}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  logoImage: {
    width: 70,
    height: 50,
  },

  orangeLine: {
    height: 4,
    backgroundColor: COLORS.orange,
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
    marginBottom: 25,
    marginHorizontal: 20,
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  card: {
    backgroundColor: COLORS.card,
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
    backgroundColor: COLORS.iconBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  course: {
    fontSize: 11.7,
    fontWeight: 'bold',
  },

  rowInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },

  faculdade: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  turno: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 25,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  badge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: COLORS.successText,
    fontSize: 10,
    fontWeight: 'bold',
  },

  periodo: {
    marginLeft: 10,
    color: COLORS.textSecondary,
  },

  arrowIcon: {
    marginLeft: 10,
  },
});