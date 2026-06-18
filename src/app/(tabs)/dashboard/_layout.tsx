import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 
import { View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0B5AA2', 
        tabBarInactiveTintColor: '#888',  
        tabBarStyle: {
          height: 65,                     
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

      <Tabs.Screen 
        name="cursos" 
        options={{ 
          headerShown: false, 
          tabBarLabel: '', 
          tabBarIcon: () => (
            <View style={styles.containerBotaoTikTok}>
              <View style={styles.corpoBotaoTikTok}>
                <FontAwesome name="plus" size={16} color="#fff" />
              </View>
            </View>
          ) 
        }} 
      />

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
    width: 48, 
    height: 30,
    backgroundColor: '#0B5AA2', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12, 
  },
  corpoBotaoTikTok: {
    width: '90%',
    height: '100%',
    backgroundColor: '#D97B2D', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff', 
  },
});