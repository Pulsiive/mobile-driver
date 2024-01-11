import React, { useEffect, useState, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import api from '../../db/Api';
import { AppIcon } from '../../AppStyles';
import Station from '../station/Station';
import { getUser, useUserUpdate } from '../../contexts/UserContext';
import { showMessage } from 'react-native-flash-message';
import ProfilePicture from '../../components/ProfilePicture';

const renderRating = (rating, isComment = false) => {
  const stars = new Array(rating.rate).fill(<Icon name="star" size={20} color={'orange'} />);
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
          width: '90%',
          marginBottom: 10
        }}
      >
        {!isComment ? (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ color: '#0C0404', fontWeight: '600' }}
            >{`${rating.author.firstName} ${rating.author.lastName}   `}</Text>
            <Text style={{ color: '#0C0404' }}>{rating.date.slice(0, rating.date.indexOf('T'))}</Text>
          </View>
        ) : undefined}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>{stars}</View>
        <Text style={{ color: '#0C0404' }}>{rating.comment}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <Icon name="thumbs-up" size={15} color={'grey'} />
            <Text style={{ color: '#0C0404' }}>{rating.likes}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="thumbs-down" size={15} color={'grey'} />
            <Text style={{ color: '#0C0404' }}>{rating.dislikes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

function ProfileHeader({ userName, userRate, userId, profilePictureId, navigation }) {
  const user = getUser(); //this is the object of the current user using the app
  const updateUser = useUserUpdate();

  const [isContact, setIsContact] = useState(
    user.contacts.find((contact) => contact.user.id === userId) !== undefined
  );

  const navigateToOwnerRating = () => {
    navigation.navigate('OwnerRating', {
      ownerId: userId
    });
  };

  const removeContact = async () => {
    const res = await api.send('DELETE', `/api/v1/profile/contact/${userId}`);
    if (res.status !== -1) {
      updateUser({ contacts: user.contacts.filter((contact) => contact.user.id !== userId) });
      setIsContact(false);
    } else {
      showMessage({
        message: `Failed to delete contact`,
        type: 'danger',
        duration: 2200
      });
    }
  };

  const addContact = async () => {
    const newContact = await api.send('POST', `/api/v1/profile/contact/${userId}`);
    if (newContact.status !== -1) {
      updateUser({ contacts: [...user.contacts, newContact.data] });
      setIsContact(true);
    } else {
      showMessage({
        message: `Failed to add contact`,
        type: 'danger',
        duration: 2200
      });
    }
  };

  return (
    <View style={{ marginBottom: '20%' }}>
      <View>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            marginLeft: '80%',
            marginTop: 10
          }}
        >
          {isContact ? (
            <TouchableOpacity onPress={removeContact}>
              <Image style={{ height: 40, width: 40 }} source={AppIcon.images.removeUser} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={addContact}>
              <Image style={{ height: 40, width: 40 }} source={AppIcon.images.addUser} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.top}>
        <View style={styles.badge}>
          <ProfilePicture
            profilePictureId={profilePictureId}
            height="100%"
            width="100%"
            borderRadius={50}
          />
        </View>
        <View style={styles.borderBagde}></View>
      </View>
      <View style={{ top: '20%' }}>
        <Text
          style={{
            color: '#0C0404',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20
          }}
        >
          {userName}
        </Text>
        {userRate && userRate > -1 ? (
          <Text style={{ fontWeight: 'bold', color: 'grey', textAlign: 'center' }}>
            {userRate} / 5
          </Text>
        ) : undefined}
      </View>
      <View style={{ top: '25%', alignItems: 'center', marginTop: 10 }}>
        <Button
          containerStyle={{ width: '35%' }}
          style={{
            color: 'white',
            fontSize: 14,
            backgroundColor: '#0C0404',
            borderRadius: 50,
            height: 30,
            padding: 5
          }}
          onPress={navigateToOwnerRating}
        >
          Write a review
        </Button>
      </View>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
}

function OwnerV2({ navigation }) {
  const [profile, setProfile] = useState(null);
  const { name, userId, imageUri } = useRoute().params;
  const [currentTabIndex, setCurrentTabIndex] = useState(-1);
  const [currentTabComponent, setCurrentTabComponent] = useState(undefined);
  const [userRate, setUserRate] = useState(-1);
  const tabs = ['Stations', 'Reservations', 'Reviews', 'Comments'];

  useEffect(() => {
    api
      .send('GET', `/api/v1/user/${userId}`)
      .then((user) => {
        setProfile(user.data);
        setCurrentTabIndex(0);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (profile && profile.receivedRatings.length > 0) {
      let ratingsSum = 0;
      profile.receivedRatings.forEach((rating) => (ratingsSum += rating.rate));
      setUserRate(ratingsSum / profile.receivedRatings.length);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      if (currentTabIndex >= 0) {
        if (currentTabIndex === 0) {
          if (profile.privateStations && profile.privateStations.length > 0) {
            setCurrentTabComponent(<Station ownerId={userId}></Station>);
          } else {
            setCurrentTabComponent(
              <Text style={{ fontSize: 14, color: '#0C0404' }}>User has no stations yet.</Text>
            );
          }
        } else if (currentTabIndex === 2) {
          if (profile.receivedRatings.length > 0) {
            console.log(profile.receivedRatings);
            setCurrentTabComponent(
              <FlatList
                data={profile.receivedRatings}
                renderItem={({ item }) => renderRating(item)}
              ></FlatList>
            );
          } else {
            setCurrentTabComponent(
              <Text style={{ fontSize: 14, color: '#0C0404' }}>User has no ratings yet.</Text>
            );
          }
        } else if (currentTabIndex === 3) {
          if (profile.wroteRatings.length > 0) {
            setCurrentTabComponent(
              <FlatList
                data={profile.wroteRatings}
                renderItem={({ item }) => renderRating(item, true)}
              ></FlatList>
            );
          } else {
            setCurrentTabComponent(
              <Text style={{ fontSize: 14, color: '#0C0404' }}>User has no comments yet.</Text>
            );
          }
        } else setCurrentTabComponent(undefined);
      }
    }
  }, [currentTabIndex, profile]);

  return !profile ? (
    <View style={styles.safe}>
      <ProfileHeader
        userName={name}
        userId={userId}
        profilePictureId={imageUri}
        navigation={navigation}
      />
      <ActivityIndicator size="small" color="#0C0404" />
    </View>
  ) : (
    <View style={styles.safe}>
      <ProfileHeader
        userName={name}
        userId={userId}
        userRate={userRate}
        profilePictureId={imageUri}
        navigation={navigation}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentTabIndex(index)}>
            <View>
              <Text
                style={
                  index !== currentTabIndex ? styles.tabTextNotSelected : styles.tabTextSelected
                }
              >
                {tab}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {currentTabComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  tabTextNotSelected: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray'
  },
  tabTextSelected: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4D8837'
  },
  safe: {
    // flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#e6e6e6'
  },
  top: {
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100 + '%'
  },
  badge: {
    width: 106,
    height: 106,
    borderRadius: 100,
    backgroundColor: '#81CD2C'
  },
  borderBagde: {
    borderRadius: 100,
    borderColor: '#4D8837',
    borderRightColor: 'black',
    position: 'absolute',
    width: 130,
    height: 130,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  txtButton: {
    width: 8,
    height: 16
  }
});

export default OwnerV2;
