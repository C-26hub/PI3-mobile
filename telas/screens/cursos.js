import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function CursosScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* SIDEBAR */}
      <View style={styles.sidebar}>

        <View style={styles.profile}>
          <View style={styles.avatar} />

          <Text style={styles.name}>
            Filipe Xavier
          </Text>

          <Text style={styles.id}>
            ID: 0832389
          </Text>
        </View>

        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}> Visão Geral</Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.menuActive}>
          <Text style={styles.menuText}> Cursos </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}> Solicitações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}> Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>

      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.logo}>Senac</Text>
        </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },

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
    backgroundColor: '#ccc',
    marginBottom: 10,
  },

  name: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  id: {
    color: '#ddd',
    fontSize: 8,
  },

  menu: {
    marginBottom: 25,
  },

  menuActive: {
    backgroundColor: '#c58b4d',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 25,
  },

  menuText: {
    color: '#fff',
    fontSize: 10,
  },

  content: {
    flex: 1,
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