import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 
import { View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0B5AA2', // Azul Senac para os itens ativos
        tabBarInactiveTintColor: '#888',  // Cinza para os inativos
        tabBarStyle: {
          height: 65,                     // Altura ideal para acomodar texto e ícone confortavelmente
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
      }}
    >
      {/* Aba 1: Visão Geral */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          title: 'Visão Geral', 
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <FontAwesome name="tags" size={size} color={color} />;
            }
            return <FontAwesome name="tag" size={size} color={color} />;
          } 
        }} 
      />

      {/* Aba 2: Submeter Certificado (ESTILO TIKTOK) */}
      <Tabs.Screen 
        name="cursos" 
        options={{ 
          headerShown: false, 
          tabBarLabel: '', // Oculta o texto apenas aqui
          tabBarIcon: () => (
            <View style={styles.containerBotaoTikTok}>
              <View style={styles.corpoBotaoTikTok}>
                <FontAwesome name="plus" size={16} color="#fff" />
              </View>
            </View>
          ) 
        }} 
      />

      {/* Aba 3: Solicitações */}
      <Tabs.Screen 
        name="solicitacoes" 
        options={{ 
          headerShown: false, 
          title: 'Solicitações', 
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="clipboard" size={size} color={color} />;
          } 
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  containerBotaoTikTok: {
    width: 48, // Um pouquinho mais largo para dar presença
    height: 30,
    backgroundColor: '#0B5AA2', // Azul Senac de fundo
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    
    // 👇 O ÚNICO AJUSTE NECESSÁRIO PARA CENTRALIZAR
    // Empurra o botão levemente para baixo para alinhar com o "centro" da TabBar
    // já que ele não tem o texto embaixo empurrando ele para cima.
    marginTop: 12, 
  },
  corpoBotaoTikTok: {
    width: '90%',
    height: '100%',
    backgroundColor: '#D97B2D', // Laranja Senac
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff', 
  },
});