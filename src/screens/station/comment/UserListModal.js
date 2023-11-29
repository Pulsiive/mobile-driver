import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import ProfilePicture from '../../../components/ProfilePicture';

function Item({ user, navigation }) {
  const navigateToUserProfile = () => {
    navigation.navigate('Owner', {
      imageUri: user.profilePictureId,
      name: `${user.firstName} ${user.lastName}`,
      userId: user.id
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.8,
        paddingBottom: 15
      }}
    >
      <View style={{ width: '20%' }}>
        <TouchableOpacity onPress={() => navigateToUserProfile()}>
          <ProfilePicture
            width={50}
            height={50}
            borderRadius={30}
            profilePictureId={user.profilePictureId}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: '80%' }}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
    </View>
  );
}

function UserListModal({ users, isVisible, onClose, navigation, modalTitle, modalSubTitle }) {
  return (
    <Modal visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          padding: 30,
          margin: 0
        }}
      >
        <View style={{ marginBottom: 30 }}>
          <TouchableOpacity onPress={onClose} style={{ marginBottom: 20 }}>
            <Icon name="chevron-left" color="black" size={25} />
          </TouchableOpacity>
          {modalTitle && (
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{modalTitle}</Text>
          )}
          {modalSubTitle && <Text style={{ color: 'black', fontSize: 18 }}>{modalSubTitle}</Text>}
        </View>
        <SafeAreaView>
          <FlatList
            data={users}
            renderItem={({ item }) => <Item user={item} navigation={navigation} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
}

export default UserListModal;
