import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import api from '../../db/Api';
import Icon from 'react-native-vector-icons/Entypo';

function SearchUserModal({ onClose, searchKey, contacts }) {
  const [searchData, setSearchData] = useState('');
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    try {
      const users = await api.send(
        'GET',
        `/api/v1/users/find?searchBy=${searchKey}&key=${searchData}`
      );
      //remove users that are already contacts
      setUsers(
        users.data.users.filter(
          (user) => contacts.find((contact) => contact.user.id === user.id) === undefined
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const addContact = async (userId) => {
    try {
      await api.send('POST', `/api/v1/profile/contact/${userId}`);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal animationType="slide" visible onRequestClose={onClose}>
      <View style={{ backgroundColor: 'black', width: '100%', height: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="cross" color={'white'} size={20} />
          </TouchableOpacity>
          <Text style={{ ...styles.modalText, fontWeight: 'bold', fontSize: 20, marginLeft: 50 }}>
            Search user
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            width: '90%',
            marginTop: 20
          }}
        >
          <TextInput
            onChangeText={(value) => setSearchData(value)}
            value={searchData}
            placeholder="Search data"
            placeholderTextColor={'grey'}
            keyboardType="email-address"
            onSubmitEditing={searchUsers}
            style={{
              color: 'white',
              borderColor: 'white',
              backgroundColor: 'black'
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'black', flex: 1 }}
        >
          {users.map((user) => {
            return (
              <View style={{ alignItems: 'center' }} key={user.id}>
                <View style={styles.modalFoundUsersContainer}>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                    source={{
                      uri: 'https://robohash.org/maioresaliquidvitae.png?size=40x40&set=set1'
                    }}
                  ></Image>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: 84 + '%',
                      left: 13 + '%',
                      position: 'absolute'
                    }}
                  >
                    <Text style={{ color: 'grey', margin: 15 }}>
                      {user.firstName + ' ' + user.lastName}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => addContact(user.id)}>
                    <Icon name="circle-with-plus" color={'white'} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFoundUsersContainer: {
    margin: 4,
    marginTop: 20,
    width: 92 + '%',
    height: 70,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalText: {
    marginTop: 5,
    fontSize: 12,
    color: 'white'
  }
});

export default SearchUserModal;
