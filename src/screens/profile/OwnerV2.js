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
              style={{ color: 'white', fontWeight: '600' }}
            >{`${rating.author.firstName} ${rating.author.lastName}   `}</Text>
            <Text style={{ color: 'white' }}>{rating.date.slice(0, rating.date.indexOf('T'))}</Text>
          </View>
        ) : undefined}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>{stars}</View>
        <Text style={{ color: 'white' }}>{rating.comment}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <Icon name="thumbs-up" size={15} color={'grey'} />
            <Text style={{ color: 'white' }}>{rating.likes}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="thumbs-down" size={15} color={'grey'} />
            <Text style={{ color: 'white' }}>{rating.dislikes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

function ProfileHeader({ userName, userRate, userId, navigation }) {
  const navigateToOwnerRating = () => {
    navigation.navigate('OwnerRating', {
      ownerId: userId
    });
  };

  return (
    <View style={{ marginBottom: '20%' }}>
      <View style={styles.top}>
        <View style={styles.badge}>
          <Image
            style={{ height: 100 + '%', width: 100 + '%', borderRadius: 50 }}
            source={{
              uri: 'https://media.gettyimages.com/id/1314489757/fr/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=bH6LQ1NqBgBkrPJUaiRNSVheODv7cwSWrYb6UvyZbfk='
            }}
          ></Image>
        </View>
        <View style={styles.borderBagde}></View>
      </View>
      <View style={{ top: '20%' }}>
        <Text
          style={{
            color: 'white',
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
            backgroundColor: 'grey',
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
  const { name, userId } = useRoute().params;
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
    console.log(JSON.stringify(profile, null, '\t'));
    if (currentTabIndex >= 0) {
      if (currentTabIndex === 0) {
        if (profile.privateStations.length > 0) {
          setCurrentTabComponent(<Station ownerId={userId}></Station>);
        } else {
          setCurrentTabComponent(
            <Text style={{ fontSize: 14, color: 'white' }}>User has no stations yet.</Text>
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
            <Text style={{ fontSize: 14, color: 'white' }}>User has no ratings yet.</Text>
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
            <Text style={{ fontSize: 14, color: 'white' }}>User has no comments yet.</Text>
          );
        }
      } else setCurrentTabComponent(undefined);
    }
  }, [currentTabIndex]);

  return !profile ? (
    <View style={styles.safe}>
      <ProfileHeader userName={name} userId={userId} navigation={navigation} />
      <ActivityIndicator size="small" color="white" />
    </View>
  ) : (
    <View style={styles.safe}>
      <ProfileHeader userName={name} userId={userId} userRate={userRate} navigation={navigation} />
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
    backgroundColor: 'black'
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
