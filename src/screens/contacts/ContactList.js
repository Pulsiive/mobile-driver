import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../db/Api';
import Icon from 'react-native-vector-icons/Entypo';
import FetchContact from './FetchContact';
import SearchUserModal from './SearchUserModal';

function Contact({ navigation }) {
  const [contacts, setContacts] = useState(null);
  const [addContactModalIsOpen, setAddContactModalIsOpen] = useState(false);
  const [searchUserModalIsOpen, setSearchUserModalIsOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const fetchContacts = async () => {
    const response = await api.send('GET', '/api/v1/profile/contacts', null, true);
    if (response.status === 200) {
      setContacts(response.data);
    }
  };

  const removeContact = async (userId) => {
    try {
      await api.send('DELETE', `/api/v1/profile/contact/${userId}`);
      setContacts(contacts.filter((contact) => contact.user.id !== userId));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onCloseSearchUserModal = () => {
    setSearchUserModalIsOpen(false);
    fetchContacts();
  };

  return !contacts ? (
    <View
      style={{
        backgroundColor: 'black',
        width: 100 + '%',
        height: 100 + '%',
        top: 0 + '%'
      }}
    >
      <ActivityIndicator size="small" color="white" />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: 0 + '%',
        backgroundColor: 'black'
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={addContactModalIsOpen}
        onRequestClose={() => setAddContactModalIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setAddContactModalIsOpen(false);
              }}
            >
              <Icon name="cross" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalSearchByContainer}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setAddContactModalIsOpen(false);
                  setSearchKey('email');
                  setSearchUserModalIsOpen(true);
                }}
              >
                <View style={styles.modalSearchBy}>
                  <Icon name="email" size={25} color={'white'} />
                  <Text style={styles.modalText}>Add by email</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setAddContactModalIsOpen(false);
                  setSearchKey('last_name');
                  setSearchUserModalIsOpen(true);
                }}
              >
                <View style={styles.modalSearchBy}>
                  <Icon name="fingerprint" size={25} color={'white'} />
                  <Text style={styles.modalText}>Add by last name</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setAddContactModalIsOpen(false);
                  setSearchKey('first_name');
                  setSearchUserModalIsOpen(true);
                }}
              >
                <View style={styles.modalSearchBy}>
                  <Icon name="man" size={25} color={'white'} />
                  <Text style={styles.modalText}>Add by first name</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {searchUserModalIsOpen && (
        <SearchUserModal
          onClose={onCloseSearchUserModal}
          searchKey={searchKey}
          contacts={contacts}
        />
      )}
      <TouchableOpacity onPress={() => setAddContactModalIsOpen(true)}>
        <Icon name="add-user" size={25} color={'white'} />
      </TouchableOpacity>
      <FetchContact
        data={contacts}
        navigation={navigation}
        removeContact={removeContact}
      ></FetchContact>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 10,
    paddingTop: 30,
    top: 0,
    width: '100%',
    height: '20%',
    backgroundColor: 'rgba(52, 52, 52, 0.95)'
  },
  modalSearchByContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalSearchBy: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalText: {
    marginTop: 5,
    fontSize: 12,
    color: 'white'
  }
});

export default Contact;
