import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../db/Api';
import { showMessage } from 'react-native-flash-message';

const EditContactModal = ({ isVisible, contact, onClose }) => {
  const [customNameValue, setCustomNameValue] = useState(contact.customName);
  const [descriptionValue, setDescriptionValue] = useState(contact.description);

  const updateContact = async () => {
    const res = await api.send('PUT', '/api/v1/profile/contact/update', {
      contactId: contact.id,
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
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'black',
          flexDirection: 'column',
          padding: 30
        }}
      >
        <TouchableOpacity onPress={() => onClose()} style={{ marginBottom: 20 }}>
          <Icon name="chevron-left" color={AppStyles.color.main} size={25} />
        </TouchableOpacity>
        <View style={{ marginBottom: 35 }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24 }}>Edit contact</Text>
          <Text style={{ color: 'white', fontSize: 22 }}>
            {contact.firstName} {contact.lastName}
          </Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            value={customNameValue}
            placeholder="Custom name"
            maxLength={30}
            style={styles.input}
            placeholderTextColor="gray"
            onChangeText={(text) => setCustomNameValue(text)}
          />
        </View>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            multiline
            numberOfLines={5}
            maxLength={70}
            value={descriptionValue}
            placeholder="Description"
            style={styles.input}
            placeholderTextColor="gray"
            onChangeText={(text) => setDescriptionValue(text)}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: AppStyles.color.main,
              borderRadius: 20,
              height: 40,
              width: '50%',
              padding: 5
            }}
            onPress={updateContact}
          >
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const FetchContact = ({ data, navigation, removeContact, fetchContacts }) => {
  const [editContactModalIsOpen, setEditContactModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState();

  const navigateToUserProfilePage = (user) => {
    navigation.navigate(
      'Owner',
      {
        imageUri: `https://ucarecdn.com/${user.profilePictureId}/`,
        name: user.firstName + ' ' + user.lastName,
        userId: user.id
      },
      { screen: 'DrawerStack' }
    );
  };

  const navigateToUserMessages = (user) => {
    navigation.navigate(
      'Message',
      {
        imageUri: `https://ucarecdn.com/${user.profilePictureId}/`,
        name: user.firstName + ' ' + user.lastName,
        receiverId: user.id
      },
      { screen: 'DrawerStack' }
    );
  };

  const onEditContactPress = (user) => {
    setSelectedContact(user);
    setEditContactModalIsOpen(true);
  };

  return (
    <View style={{ width: 100 + '%', height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'black', flex: 1 }}
      >
        {data.map((plan) => {
          return (
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>
              <View key={plan.user.id} style={styles.container}>
                <View style={{ width: '70%', alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => navigateToUserProfilePage(plan.user)}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: `https://ucarecdn.com/${plan.user.profilePictureId}/`
                      }}
                    ></Image>
                  </TouchableOpacity>
                  <View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 15 }}>
                      {plan.customName
                        ? plan.customName
                        : plan.user.firstName + ' ' + plan.user.lastName}
                    </Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-around' }}
                >
                  <TouchableOpacity onPress={() => navigateToUserMessages(plan.user)}>
                    <Image source={AppIcon.images.phone} style={{ height: 30, width: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      onEditContactPress({
                        ...plan.user,
                        customName: plan.customName,
                        description: plan.description
                      })
                    }
                  >
                    <Image source={AppIcon.images.edit} style={{ height: 30, width: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeContact(plan.user.id)}>
                    <Image source={AppIcon.images.remove} style={{ height: 30, width: 30 }}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              {plan.description && (
                <Text style={{ color: 'lightgray', margin: 15 }}>{plan.description}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
      {selectedContact && (
        <EditContactModal
          isVisible={editContactModalIsOpen}
          contact={selectedContact}
          onClose={() => {
            setEditContactModalIsOpen(false);
            setSelectedContact(undefined);
            fetchContacts();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
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
