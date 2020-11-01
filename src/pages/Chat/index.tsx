import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';

import { withFormik } from 'formik';

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

  function handleNavigateback() {
    navigation.goBack();
  }

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Olá Murilo!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          placeholder="Escreva uma mensagem..."
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
      alignItems: "center",
      justifyContent: 'flex-end'
    },
  
    main: {
      flex: 1,
      width: '100%',
      maxHeight: '65%',
      backgroundColor: 'white'
    },

    chat: {
      height: 150
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

export default Chat;

/*export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    handleSubmit: (values) => {
        console.log(values);
    }
})(Chat);*/