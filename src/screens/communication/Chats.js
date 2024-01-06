import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Text, Modal, Image } from 'react-native';
import { AppStyles } from '../../AppStyles';
import Chat from './Chat';
import api from '../../db/Api';
import ProfilePicture from '../../components/ProfilePicture';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Entypo';

function Chats() {
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      api
        .send('GET', '/api/v1/profile/messages/last-by-user')
        .then((data) => setChats(data.data))
        .catch((e) => setErrorMessage(e));

      api.send('GET', '/api/v1/profile/contacts').then((data) => {
        setContacts(data.data);
      });
    }, [])
  );

  const onContactPress = (contact) => {
    navigation.navigate('Message', {
      imageUri: contact.profilePictureId,
      name: `${contact.firstName} ${contact.lastName}`,
      receiverId: contact.id
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      {chats.length > 0 && (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.message.id}
          renderItem={({ item }) => <Chat chat={item}></Chat>}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity style={styles.roundButton1} onPress={() => setNewChatModalIsOpen(true)}>
        <Icon name="circle-with-plus" size={20} color={'white'} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={newChatModalIsOpen}
        onRequestClose={() => setNewChatModalIsOpen(false)}
        transparent
      >
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => {
              setNewChatModalIsOpen(false);
            }}
          >
            <Icon name="cross" size={30} color="green" />
          </TouchableOpacity>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.user.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20
                }}
                onPress={() => {
                  setNewChatModalIsOpen(false);
                  onContactPress(item.user);
                }}
              >
                <ProfilePicture
                  profilePictureId={item.user.profilePictureId}
                  height={45}
                  width={45}
                />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}
                >{`${item.user.firstName} ${item.user.lastName}`}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  InputContainer: {
    width: 300,
    marginVertical: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: 25
  },
  input: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  roundButton1: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 100,
    backgroundColor: AppStyles.color.main
  },
  modal: {
    backgroundColor: AppStyles.color.background,
    padding: 10,
    height: '50%',
    width: '80%',
    borderRadius: 10,
    marginTop: '40%',
    marginLeft: '12%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default Chats;
