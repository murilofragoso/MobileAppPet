import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useLinkProps, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { withFormik } from 'formik';

import api from '../../services/api';

const Home = (props) => {
  const navigation = useNavigation();

  function handleNavigateToRegister() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Melhor Aumigo</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={text => props.setFieldValue('email', text)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={text => props.setFieldValue('senha', text)}
          autoCapitalize="none"
        />

        <RectButton style={styles.button} onPress={props.handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </RectButton>
        
        <RectButton style={styles.button} onPress={handleNavigateToRegister}>
          <Text style={styles.buttonText}>Registre-se</Text>
        </RectButton>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#00BFFF",
        paddingTop: 20
    },
  
    main: {
      flex: 1,
      justifyContent: 'flex-start',
      height: 5
    },

    form: {
        flex: 2,
        justifyContent:"flex-start"
    },
  
    title: {
      color: 'white',
      fontSize: 32,
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      minWidth: 250,
    },
  
    button: {
      backgroundColor: '#0000CD',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontSize: 16,
    }
});

export default withFormik({
    mapPropsToValues: () => ({
      email: '',
      senha: ''
    }),

    handleSubmit: (values, props) => {
      const storeIdUsuario = async (value) => {
        try{
          await AsyncStorage.setItem('idUsuarioLogado', value);
        } catch (e) {
          console.log("Erro ao salvar idUsuarioLogado: " + e)
        }
      }

      api.post('/usuario/login', values)
        .then(response => {
          storeIdUsuario(response.data);
          props.props.navigation.navigate('Chat');
        })
        .catch(err => {
          alert(err.response.data);
        })
    }
})(Home);