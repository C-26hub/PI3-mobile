
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* MENU LATERAL */}
      <View style={styles.sidebar}>
        <View style={styles.profile}>
          <View style={styles.avatar} />

          <View>
            <Text style={styles.name}>Filipe Xavier</Text>
            <Text style={styles.id}>ID: 0832389</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.activeMenu}
            onPress={() => navigation.navigate('Home')} >
          <Text style={styles.menuText}> Visão Geral</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}
         onPress={() => navigation.navigate('Cursos')} >
          <Text style={styles.menuText}> Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}> Solicitações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}> Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}> Sair</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <ScrollView style={styles.content}>
        
        {/* TOPO */}
        <View style={styles.header}>
          <Text style={styles.logo}>Senac</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+ Nova Atividade</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hello}>
          Olá, Filipe Xavier 👋
        </Text>

        {/* CARD VERDE */}
        <View style={[styles.card, { backgroundColor: '#18b84f' }]}>
          <Text style={styles.cardTitle}>Horas Aprovadas</Text>
          <Text style={styles.cardValue}>45h</Text>
        </View>

        {/* CARD LARANJA */}
        <View style={[styles.card, { backgroundColor: '#ef963f' }]}>
          <Text style={styles.cardTitle}>Horas em análise</Text>
          <Text style={styles.cardValue}>60h</Text>
        </View>

        {/* CARD VERMELHO */}
        <View style={[styles.card, { backgroundColor: '#ef4444' }]}>
          <Text style={styles.cardTitle}>Horas rejeitadas</Text>
          <Text style={styles.cardValue}>20h</Text>
        </View>

        {/* BARRA */}
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

        {/* AVISOS */}
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

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },

  /* SIDEBAR */

  sidebar: {
    width: 90,
    backgroundColor: '#004b93',
    paddingTop: 20,
    alignItems: 'center',
  },

  profile: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#cfd8dc',
    marginBottom: 10,
  },

  name: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  id: {
    color: '#ddd',
    fontSize: 8,
    textAlign: 'center',
  },

  menu: {
    marginBottom: 25,
  },

  activeMenu: {
    backgroundColor: '#c58b4d',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 25,
  },

  menuText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },

  /* CONTEÚDO */

  content: {
    flex: 1,
    padding: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#ef963f',
    paddingTop: 10,
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004b93',
  },

  button: {
    backgroundColor: '#ef963f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  hello: {
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    borderRadius: 20,
    padding: 30,
    marginBottom: 25,
    alignItems: 'center',
  },

  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  cardValue: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
  },

  progressTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  progressBackground: {
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
  },

  progressFill: {
    width: '45%',
    height: '100%',
    backgroundColor: '#005fa3',
    borderRadius: 15,
  },

  progressNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 30,
  },

  warningBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 40,
  },

  warningTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ef963f',
  },

  warningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  green: {
    color: 'green',
  },

  red: {
    color: 'red',
  },
});