import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import FetchContact from './FetchContact';
import SearchUserModal from './SearchUserModal';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import { ButtonCommon, FloatingButton, ModalSwipeUp, Separator, TextTitle } from '../../components';

function Contact({ navigation }) {
  const { AppColor } = useTheme();

  const [addContactModalIsOpen, setAddContactModalIsOpen] = useState(false);
  const [searchUserModalIsOpen, setSearchUserModalIsOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColor.background,
        paddingTop: 60,
        paddingHorizontal: 20
      }}
    >
      <TextTitle title="Vos contacts" style={{ fontWeight: 'bold', marginLeft: 10 }} />
      <Separator style={{ marginTop: 0, marginBottom: 10 }} />
      {/* <View
        style={{
          zIndex: 20,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 100,
          backgroundColor: AppColor.bottomColor,
          bottom: 15,
          right: 15
        }}
      >
        <TouchableOpacity onPress={() => setAddContactModalIsOpen(true)}>
          <Icon name="plus" size={20} color={AppColor.subText} />
        </TouchableOpacity>
      </View> */}
      <ModalSwipeUp
        visible={addContactModalIsOpen}
        onClose={() => setAddContactModalIsOpen(false)}
        closeButton={true}
        title="Ajoutez un contact"
      >
        <ButtonCommon
          title="Via son mail"
          onPress={() => {
            setAddContactModalIsOpen(false);
            setSearchKey('email');
            setSearchUserModalIsOpen(true);
          }}
        />
        <ButtonCommon
          title="Via son nom de famille"
          onPress={() => {
            setAddContactModalIsOpen(false);
            setSearchKey('last_name');
            setSearchUserModalIsOpen(true);
          }}
        />
        <ButtonCommon
          title="Via son prénom"
          onPress={() => {
            setAddContactModalIsOpen(false);
            setSearchKey('first_name');
            setSearchUserModalIsOpen(true);
          }}
          style={{ marginBottom: 30 }}
        />
      </ModalSwipeUp>

      {searchUserModalIsOpen && (
        <SearchUserModal onClose={() => setSearchUserModalIsOpen(false)} searchKey={searchKey} />
      )}

      <FetchContact navigation={navigation}></FetchContact>
      <FloatingButton
        icon="plus"
        style={{ bottom: 15, right: 15, backgroundColor: AppColor.bottomColor }}
        onPress={() => setAddContactModalIsOpen(true)}
      />
    </View>
  );
}

export default Contact;
