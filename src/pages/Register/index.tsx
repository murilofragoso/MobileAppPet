import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


import { withFormik } from 'formik';

const Register = () => {
  const navigation = useNavigation();

  function handleNavigateback() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Melhor Aumigo</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
        />

        <RectButton style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </RectButton>
        
        <RectButton style={styles.button} onPress={handleNavigateback}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </RectButton>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#00BFFF"
    },
  
    main: {
      flex: 1,
      justifyContent: 'flex-start',
      height: 5
    },

    form: {
        flex: 3,
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

export default Register;

/*export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    handleSubmit: (values) => {
        console.log(values);
    }
})(Register);*/