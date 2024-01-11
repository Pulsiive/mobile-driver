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
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const profilePicture =
    'https://srcwap.com/wp-content/uploads/2022/08/blank-profile-picture-hd-images-photo.jpg';
  // const profilePicture =
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Yi4VStxTFo5ABzphG-2ziY-kLKQOpfGIWXfk2qtrw01Baan6bS_PHjWscbXMDcOGfFM&usqp=CAU';

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

  const filteredChats = chats.filter((chat) =>
  `${chat.user.firstName} ${chat.user.lastName}`
    .toLowerCase()
    .includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={AppStyles.color.grey}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {filteredChats.length > 0 ? (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.message.id}
          renderItem={({ item }) => <Chat chat={item}></Chat>}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>No matching chats found</Text>
      )}
      <Animatable.View animation="pulse" iterationCount="infinite">
        <TouchableOpacity style={styles.roundButton1} onPress={() => setNewChatModalIsOpen(true)}>
          <Icon name="circle-with-plus" size={20} color={'white'} />
        </TouchableOpacity>
      </Animatable.View>
      <Modal
        animationType="slide"
        visible={newChatModalIsOpen}
        onRequestClose={() => setNewChatModalIsOpen(false)}
        transparent
      >
        <Animatable.View animation="fadeInRight" duration={4000}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setNewChatModalIsOpen(false)}
          >
            <Icon name="cross" size={30} color="green" />
          </TouchableOpacity>
          <View style={styles.contactList}>
          <FlatList
              data={contacts}
              keyExtractor={(item) => item.user.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactCard}
                  onPress={() => {
                    setNewChatModalIsOpen(false);
                    onContactPress(item.user);
                  }}
                >
                  <View style={styles.contactCardInner}>
                    <Image
                      source={{ uri: profilePicture }}
                      style={styles.contactImage}
                    />
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{`${item.user.firstName} ${item.user.lastName}`}</Text>
                      <Text style={styles.contactSubtitle}>{item.user.email}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
        </View>
        </View>
        </Animatable.View>
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
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 100,
    backgroundColor: AppStyles.color.main,
    marginBottom: 5,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    margin: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    marginBottom: 15,
  },
  contactList: {
    marginTop: 15, // Added margin at the top of the contact list
  },
  contactCard: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
  },
  contactCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  contactImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  contactSubtitle: {
    fontSize: 14,
    color: AppStyles.color.grey,
  },
});

export default Chats;