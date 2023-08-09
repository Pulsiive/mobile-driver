import React, { useEffect, useState } from 'react';
import Button from 'react-native-button';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AppIcon, AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFocusEffect } from '@react-navigation/native';

const Favorites = ({ navigation }) => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const images = [AppIcon.images.charger1, AppIcon.images.charger2, AppIcon.images.charger3];

  const navigateToStationRatingScreen = (stationId) => {
    navigation.navigate('StationRating', { stationId });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('fetching new stations');
      setIsLoading(true);
      api
        .send('GET', '/api/v1/station/favorites')
        .then((res) => {
          setStations(res.data);
          setIsLoading(false);
        })
        .catch(() => console.log('Failed to fetch favorite stations'));
    }, [])
  );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>Favorite stations</Text>
        <View>
          {stations.map((station) => {
            const stars = [];
            for (let i = 0; i < station.rate; i++) {
              stars.push(<Icon name="star" size={15} color={'orange'} key={i} />);
            }
            return (
              <View key={station.id} style={styles.liststationContainer}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                  <Image
                    source={images[Math.floor(Math.random() * images.length)]}
                    style={{ width: 100, height: '100%', borderRadius: 5 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={styles.stationTitle}>
                    {station.coordinates.address.slice(
                      0,
                      station.coordinates.address.indexOf('75')
                    )}
                  </Text>
                  <Text style={{ fontSize: 18 }}>{station.coordinates.city}</Text>
                  <View style={{ flexDirection: 'row' }}>{stars}</View>
                  <Text style={{ fontSize: 15 }}>
                    {station.properties.isPublic ? 'Public' : 'Private'} /
                    {station.properties.plugTypes.toString()} / {station.properties.price}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <Button
                      containerStyle={styles.actionButton}
                      onPress={() => navigateToStationRatingScreen(station.id)}
                    >
                      <Icon name="comment" color={'white'} size={15}></Icon>
                    </Button>
                    <Button containerStyle={styles.actionButton}>
                      <Icon name="calendar" color={'white'} size={15}></Icon>
                    </Button>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.pulsive,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  liststationContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    marginLeft: 10,
    marginBottom: 20,
    borderBottomWidth: 0.75,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  stationTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  actionButton: {
    width: 35,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: AppStyles.borderRadius,
    padding: 10,
    marginRight: 10,
    marginBottom: 10
  }
});

export default Favorites;
