import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 

export default function Layout() {
  return (
    <Tabs>
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
          title: 'Cursos', 
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <FontAwesome name="gear" size={size} color={color} />;
            }
            return <FontAwesome name="gear" size={size} color={color} />;
          } 
        }} 
      />

      <Tabs.Screen 
        name="solicitacoes" 
        options={{ 
          headerShown: false, 
          title: 'Solicitações', 
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <FontAwesome name="clipboard" size={size} color={color} />;
            }
            return <FontAwesome name="clipboard" size={size} color={color} />;
          } 
        }} 
      />

      
    </Tabs>
  );
}