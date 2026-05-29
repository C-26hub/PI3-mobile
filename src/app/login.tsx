import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import Logo from '../../assets/favicon.png';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Aluno', value: '1' },
  { label: 'Coordenador', value: '2' },
  { label: 'Gestor', value: '3' },
];

export default function Home() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Selecione o seu perfil
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <StatusBar style="auto" />

        <Image source={Logo} style={styles.logo} />

        <Text style={styles.text}>
          Informe seus dados para prosseguir
        </Text>

        <View style={styles.dropdownContainer}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecione um item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'gray'}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <Link href="/index" style={styles.link}>
          Esqueci minha senha
        </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004A8D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minHeight: 350,
    width: '85%',
  },
  text: {
    color: '#0A0A0A',
    marginBottom: 15,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  link: {
    color: '#004A8D',
    marginVertical: 20,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#F28322',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  dropdownContainer: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 12,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#c7c7cd',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});