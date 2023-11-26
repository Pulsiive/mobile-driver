import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import api from '../../db/Api';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { getUser, useUserUpdate } from '../../contexts/UserContext';
import { useTheme } from '../../AppStyles';
import { InputField, ModalSwipeUp, Separator } from '../../components';

function SearchUserModal({ onClose, searchKey }) {
  const { AppColor } = useTheme();

  const user = getUser();
  const updateUser = useUserUpdate();
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
          (foundUser) =>
            user.contacts.find((contact) => contact.user.id === foundUser.id) === undefined
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const addContact = async (userId) => {
    const newContact = await api.send('POST', `/api/v1/profile/contact/${userId}`);
    if (newContact.status !== -1) {
      updateUser({ contacts: [...user.contacts, newContact.data] });
    }
    onClose();
  };

  return (
    <ModalSwipeUp
      visible
      onClose={() => onClose()}
      closeButton={true}
      title="Ajoutez un contact"
      style={{ height: '80%' }}
    >
      <InputField
        label="Contact"
        subText="Entrez les informations de votre contact"
        setValue={setSearchData}
        icon="magnifying-glass"
        iconOnPress={searchUsers}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: AppColor.background }}
      >
        {users.map((user) => {
          return (
            <View style={{ alignItems: 'center' }} key={user.id}>
              <View
                style={{
                  width: '100%',
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <IconAwesome name="user" size={20} color={AppColor.title} />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginLeft: 30,
                    position: 'absolute'
                  }}
                >
                  <Text style={{ color: AppColor.text }}>
                    {user.firstName + ' ' + user.lastName}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => addContact(user.id)}>
                  <Icon name="circle-with-plus" size={25} color={AppColor.icon} />
                </TouchableOpacity>
              </View>
              <Separator style={{ marginTop: 0 }} />
            </View>
          );
        })}
      </ScrollView>
    </ModalSwipeUp>
  );
}

export default SearchUserModal;
