import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Day } from 'react-native-gifted-chat';

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
      backgroundColor: "#00BFFF"
    },

    main: {
      flex: 2,
      width: '100%',
      backgroundColor: 'white'
    },

    imgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center"
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