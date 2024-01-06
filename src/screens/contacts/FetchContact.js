import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../db/Api';
import { showMessage } from 'react-native-flash-message';
import { getUser, useUserUpdate } from '../../contexts/UserContext';

import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../AppStyles';
import {
  ButtonCommon,
  ButtonConditional,
  InputField,
  ModalSwipeUp,
  Separator,
  ProfilePicture
} from '../../components';

const EditContactModal = ({ isVisible, contact, onClose }) => {
  const { AppColor } = useTheme();
  const [valid, setValid] = useState(false);

  const [customNameValue, setCustomNameValue] = useState(
    contact.customName ? contact.customName : ''
  );
  const [descriptionValue, setDescriptionValue] = useState(
    contact.description ? contact.description : ''
  );

  useEffect(() => {
    if (checkForSurnameErrors(customNameValue)) setValid(false);
    else setValid(true);
  }, [customNameValue]);

  const checkForSurnameErrors = (input) => {
    if (/[^a-zA-Z]+/g.test(input)) return 'Votre nom doit comprendre uniquement des lettres';
    return false;
  };

  const updateContact = async () => {
    const res = await api.send('PUT', '/api/v1/profile/contact/update', {
      contactId: contact.user.id,
      customName: customNameValue,
      description: descriptionValue
    });
    if (res.status === -1) {
      showMessage({
        message: `Failed to update contact's informations`,
        type: 'danger',
        duration: 2200
      });
    } else {
      onClose(res.data);
    }
  };

  return (
    <ModalSwipeUp title="Modifier le contact" visible={isVisible} onRequestClose={onClose}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: AppColor.backgroundColor
        }}
      >
        <Text
          style={{
            color: AppColor.text,
            fontSize: AppStyles.fontSize.subTitle,
            fontWeight: '500',
            marginVertical: 10
          }}
        >
          Contact: {contact.user.firstName} {contact.user.lastName}
        </Text>
        <View style={{ marginBottom: 30 }}>
          <InputField
            initialValue={customNameValue}
            label="Surnom"
            subText="Entrer le nom personalisé de votre contact"
            setValue={setCustomNameValue}
            errorCheck={checkForSurnameErrors}
          />
          <InputField
            initialValue={descriptionValue}
            label="Description"
            subText="Entrer une description pour votre contact"
            setValue={setDescriptionValue}
          />
          <ButtonConditional
            title="Mettre à jour"
            isEnabled={valid}
            style={{ backgroundColor: AppColor.pulsive }}
            onPress={updateContact}
          />
          <ButtonCommon title="Annuler" onPress={() => onClose()} />
        </View>
      </View>
    </ModalSwipeUp>
  );
};

const ContactItem = ({
  plan,
  navigateToUserProfilePage,
  navigateToUserMessages,
  onEditContactPress,
  removeContact
}) => {
  const { AppColor } = useTheme();
  return (
    <View style={{ paddingVertical: 10, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <TouchableOpacity onPress={() => navigateToUserProfilePage(plan.user)}>
          <ProfilePicture profilePictureId={plan.user.profilePictureId} borderRadius={25} />
        </TouchableOpacity>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: AppColor.text }}>
            {plan.customName ? plan.customName : `${plan.user.firstName} ${plan.user.lastName}`}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
              width: '35%'
            }}
          >
            <TouchableOpacity
              onPress={() => navigateToUserMessages(plan.user)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                borderRadius: 100,
                backgroundColor: AppColor.pulsive
              }}
            >
              <Icon name="message" size={15} color={AppColor.background} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onEditContactPress(plan)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                borderRadius: 100,
                backgroundColor: AppColor.icon
              }}
            >
              <IconAwesome name="pencil" size={15} color={AppColor.bottomColor} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeContact(plan.user.id)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                borderRadius: 100,
                backgroundColor: AppColor.bottomColor
              }}
            >
              <IconAwesome name="trash" size={15} color={AppColor.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Separator />
    </View>
  );
};

const FetchContact = ({ navigation }) => {
  const { AppColor } = useTheme();

  const user = getUser();
  const updateUser = useUserUpdate();

  const [editContactModalIsOpen, setEditContactModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState();

  const removeContact = async (userId) => {
    const res = await api.send('DELETE', `/api/v1/profile/contact/${userId}`);
    if (res.status !== -1) {
      updateUser({ contacts: user.contacts.filter((contact) => contact.user.id !== userId) });
    } else {
      showMessage({
        message: `Failed to delete contact`,
        type: 'danger',
        duration: 2200
      });
    }
  };

  const navigateToUserProfilePage = (user) => {
    navigation.navigate('Owner', {
      imageUri: user.profilePictureId,
      name: user.firstName + ' ' + user.lastName,
      userId: user.id
    });
  };

  const navigateToUserMessages = (user) => {
    navigation.navigate('Message', {
      imageUri: user.profilePictureId,
      name: user.firstName + ' ' + user.lastName,
      receiverId: user.id
    });
  };

  const onEditContactPress = (user) => {
    setSelectedContact(user);
    setEditContactModalIsOpen(true);
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: AppColor.background, flex: 1 }}
      >
        {user.contacts.map((plan) => (
          <ContactItem
            key={plan.user.id}
            plan={plan}
            navigateToUserProfilePage={navigateToUserProfilePage}
            navigateToUserMessages={navigateToUserMessages}
            onEditContactPress={onEditContactPress}
            removeContact={removeContact}
          />
        ))}
      </ScrollView>
      {selectedContact && (
        <EditContactModal
          isVisible={editContactModalIsOpen}
          contact={selectedContact}
          onClose={(updatedContact) => {
            console.log('CLOSE');
            setEditContactModalIsOpen(false);
            setSelectedContact(undefined);
            if (updatedContact) {
              updateUser({
                contacts: user.contacts.map((contact) =>
                  contact.user.id === updatedContact.user.id ? updatedContact : contact
                )
              });
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
    fontSize: 18,
    padding: 10
  }
});

export default FetchContact;
