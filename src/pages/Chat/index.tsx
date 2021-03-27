import React, { useState, useCallback, useEffect } from 'react';
import { SimpleLineIcons as Icon, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Platform, KeyboardAvoidingView, Image,  TouchableOpacity } from 'react-native';
import { GiftedChat, Day } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { withFormik } from 'formik';

import api from '../../services/api';

interface Message {
    _id: number;
    text: string;
    createdAt: Date;
    user: {
        _id: number,
        name: string,
        avatar: string,
    };
  }

const Chat = () => {
  const navigation = useNavigation();

  async function handleNavigateback() {
    await AsyncStorage.removeItem('idUsuarioLogado');
    navigation.goBack();
  }

  const [messages, setMessages] = useState<Message[]>([]);
  var idMensagem = 1;
  var salvarMensagem = false;
  var sentimento = 1;
  var conversaFinalizada = false;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Olá Aumigo! Como se sente hoje?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Melhor Aumigo',
          avatar: '',
        },
      },
    ])
  }, [])

  async function getIdUsuario() {
    try {
      const idUsuario = await AsyncStorage.getItem('idUsuarioLogado');
      if(idUsuario !== null){
        return idUsuario
      }
    } catch (e) {
      console.log("Erro ao recuperar idUsuarioLogado: " + e)
    }
  }

  function postMensagem(mensagem){
    api.post('/mensagem', mensagem)
        .then((response) => {
          idMensagem++;
          let mensagem = [{
            _id: idMensagem,
            text: response.data.retornoMensagem,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Melhor Aumigo',
              avatar: '',
            },
          }]
          setMessages(previousMessages => GiftedChat.append(previousMessages, mensagem))
          salvarMensagem = response.data.armazenarProxMensagem
          conversaFinalizada = response.data.conversaFinalizada
          sentimento = response.data.sentimento
          return true;
        })
        .catch(err => {
          alert(err.response.data);
          return false
        })
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    if (!conversaFinalizada) {
      getIdUsuario().then((idUsuarioLogado) => {
        if(!idUsuarioLogado){
          alert("você não está logado");
          return;
        }
        var mensagem = {
          "usuario": idUsuarioLogado,
          "grauFelicidade": 100,
          "texto": messages[0].text,
          "salvarMensagem": salvarMensagem,
          "sentimento": sentimento
        }
  
        postMensagem(mensagem);
      })
    }
  }, [])

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateback} style={styles.btnContainer}>
          <Icon name="logout" size={23} color="white">
          </Icon>
        </TouchableOpacity>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/dog.png')} resizeMode="center"/>
      </View>
      <View style={styles.main}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          placeholder="Escreva uma mensagem..."
          renderAvatar={function() {return null}}
          renderDay={function(props){
            return <Day {... props} dateFormat="DD/MM/YYYY"/>
          }}
        />
        {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#00BFFF",
      paddingTop: 30
    },

    main: {
      flex: 7,
      width: '100%',
      backgroundColor: 'white'
    },

    imgContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: "center"
    },

    btnContainer: {
      zIndex: 1,
      marginLeft: 10,
      marginTop: 5,
    }

});

export default Chat;