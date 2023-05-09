import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PermissionsAndroid,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import api from '../../db/Api';

import Carousel from 'react-native-snap-carousel';

import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';

import MapboxGL from '@rnmapbox/maps';
import GetLocation from 'react-native-get-location';

import Icon from 'react-native-vector-icons/Entypo';

import config from '../../db/config';

var axios = require('axios');

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
);
MapboxGL.setConnected(true);

function Map({ navigation }) {
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [userProfile, setUserProfile] = useState();
  const [nightMode, setNightMode] = useState(false);
  const [filtersMenu, setFiltersMenu] = useState(false);

  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const setModal = (charger) => {
    console.log(charger.id);
    setModalVisible(true);
    setModalData({
      // name: props.event.properties.id,
      // location: props.event.geometry.coordinates,
      charger: charger
    });
  };

  const [filterType, setFilterType] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterStatut, setFilterStatut] = useState(false);
  const [filterRating, setFilterRating] = useState(false);

  const [savedFitlers1, setSavedFilters1] = useState({
    savedFilterType: false,
    savedFilterPrice: false,
    savedFilterStatut: false,
    savedFilterRating: false
  });
  const [savedFitlers2, setSavedFilters2] = useState({
    savedFilterType: false,
    savedFilterPrice: false,
    savedFilterStatut: false,
    savedFilterRating: false
  });
  const [filterSelect, setFilterSelect] = useState(0);

  const checkFilters = (charger) => {
    if (filterType && charger.type != filterType) return false;
    if (filterPrice && charger.pricing > filterPrice) return false;
    if (filterStatut) {
      if (filterStatut == 'Public' && !charger.public) return false;
      if (filterStatut == 'Private' && charger.public) return false;
    }
    if (filterRating && charger.rating < filterRating) return false;
    return true;
  };

  const FiltersComponent = () => {
    const clear = () => {
      setFilterSelect(0);
      setFilterType(false);
      setFilterPrice(false);
      setFilterStatut(false);
      setFilterRating(false);
    };
    const save1 = () => {
      setSavedFilters1({
        savedFilterType: filterType,
        savedFilterPrice: filterType,
        savedFilterStatut: filterStatut,
        savedFilterRating: filterRating
      });
    };
    const save2 = () => {
      setSavedFilters2({
        savedFilterType: filterType,
        savedFilterPrice: filterType,
        savedFilterStatut: filterStatut,
        savedFilterRating: filterRating
      });
    };
    const compare1 = () => {
      const temp = { filterType, filterPrice, filterStatut, filterRating };
      setFilterType(savedFitlers1.savedFilterType);
      setFilterPrice(savedFitlers1.savedFilterPrice);
      setFilterStatut(savedFitlers1.savedFilterStatut);
      setFilterRating(savedFitlers1.savedFilterRating);
      setSavedFilters1({
        savedFilterType: temp.filterType,
        savedFilterPrice: temp.filterPrice,
        savedFilterStatut: temp.filterStatut,
        savedFilterRating: temp.filterRating
      });
    };
    const compare2 = () => {
      const temp = { filterType, filterPrice, filterStatut, filterRating };
      setFilterType(savedFitlers2.savedFilterType);
      setFilterPrice(savedFitlers2.savedFilterPrice);
      setFilterStatut(savedFitlers2.savedFilterStatut);
      setFilterRating(savedFitlers2.savedFilterRating);
      setSavedFilters2({
        savedFilterType: temp.filterType,
        savedFilterPrice: temp.filterPrice,
        savedFilterStatut: temp.filterStatut,
        savedFilterRating: temp.filterRating
      });
    };
    return filtersMenu ? (
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 70,
          display: 'flex'
        }}
      >
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 1 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 1 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(1)}
        >
          Type
        </Button>
        {filterSelect == 1 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterType(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterType == 'EF' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 'EF' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType('EF')}
            >
              EF
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterType == 'TYPE2' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 'TYPE2' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType('TYPE2')}
            >
              Type2
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 2 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 2 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(2)}
        >
          Price
        </Button>
        {filterSelect == 2 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterPrice(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterPrice == '0.5' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterPrice == '0.5' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterPrice('0.5')}
            >
              0.5/15min
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterPrice == '0.75' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterPrice == '0.75' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterPrice('0.75')}
            >
              0.75/15min
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterPrice == '1' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterPrice == '1' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterPrice('1')}
            >
              1/15min
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 3 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 3 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(3)}
        >
          Statut
        </Button>
        {filterSelect == 3 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterStatut(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterStatut == 'Public' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 'Public' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut('Public')}
            >
              Public
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterStatut == 'Private' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 'Private' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut('Private')}
            >
              Private
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 4 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 4 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(4)}
        >
          Rating
        </Button>
        {filterSelect == 4 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterRating(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '1' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '1' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('1')}
            >
              1
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '2' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '2' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('2')}
            >
              2
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '3' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '3' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('3')}
            >
              3
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '4' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '4' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('4')}
            >
              4
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '5' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '5' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('5')}
            >
              5
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button style={styles.apply} onPress={() => clear()}>
          Clear
        </Button>
        <Button style={styles.save} onPress={() => save1()}>
          Save 1
        </Button>
        <Button style={styles.save} onPress={() => save2()}>
          Save 2
        </Button>
        <Button style={styles.compare} onPress={() => compare1()}>
          Compare 1
        </Button>
        <Button style={styles.compare} onPress={() => compare2()}>
          Compare 2
        </Button>
      </View>
    ) : (
      <></>
    );
  };

  const CommentPicture = ({ pictureId }) => {
    const [imageIsOpen, setImageIsOpen] = useState(false);

    return (
      <View>
        <TouchableOpacity onPress={() => setImageIsOpen(true)}>
          <Image
            source={{ uri: `https://ucarecdn.com/${pictureId}/` }}
            style={{ height: 150, width: 150 }}
          />
        </TouchableOpacity>
        <Modal
          animationType={'fade'}
          visible={imageIsOpen}
          onRequestClose={() => setImageIsOpen(false)}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              height: '100%'
            }}
          >
            <Image
              source={{ uri: `https://ucarecdn.com/${pictureId}/` }}
              style={{ width: '100%', height: undefined, aspectRatio: 1 }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  const UserComment = ({ userComment }) => {
    const [comment, setComment] = useState(userComment);
    const [userLikedComment, setUserLikedComment] = useState(
      comment.likedBy.find((user) => user.id === userProfile.id) === undefined ? false : true
    );
    const [userDislikedComment, setUserDislikedComment] = useState(
      comment.dislikedBy.find((user) => user.id === userProfile.id) === undefined ? false : true
    );

    const ratingStars = [];
    for (let rate = 0; rate < comment.rate; rate++) {
      ratingStars.push(<Icon key={rate} name="star" size={15} color="orange" />);
    }

    const likeComment = async () => {
      try {
        if (!userLikedComment) {
          await api.send('POST', `/api/v1/station/rate/like/${comment.id}`);
          setComment({
            ...userComment,
            likedBy: [...userComment.likedBy, userProfile.id],
            likes: userComment.likes + 1,
            dislikes: userDislikedComment ? userComment.dislikes - 1 : userComment.dislikes
          });
          setUserLikedComment(true);
          setUserDislikedComment(false);
        }
      } catch (e) {
        console.log('failed to like comment');
      }
    };

    const dislikeComment = async () => {
      try {
        if (!userDislikedComment) {
          await api.send('POST', `/api/v1/station/rate/dislike/${comment.id}`);
          setComment({
            ...userComment,
            dislikedBy: [...userComment.dislikedBy, userProfile.id],
            dislikes: userComment.dislikes + 1,
            likes: userLikedComment ? userComment.likes - 1 : userComment.likes
          });
          setUserLikedComment(false);
          setUserDislikedComment(true);
        }
      } catch (e) {
        console.log('failed to dislike comment');
      }
    };

    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Icon style={styles.userProfile} name="user" size={30} color="white" />
          <View style={{ marginLeft: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 15 }}
              >{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {comment.date.slice(0, comment.date.indexOf('T'))}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {ratingStars}
              <Text style={{ marginLeft: 5 }}>{comment.rate}/5</Text>
            </View>
          </View>
        </View>
        {comment.comment ? <Text>{comment.comment}</Text> : undefined}
        {comment.pictures ? (
          <View style={{ marginTop: 5, marginBottom: 5 }}>
            <Carousel
              layout="default"
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 60}
              data={comment.pictures}
              renderItem={({ item }) => <CommentPicture pictureId={item} />}
            />
          </View>
        ) : // </View>

        undefined}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <TouchableOpacity onPress={likeComment}>
              <Icon
                name="thumbs-up"
                size={15}
                color={userLikedComment ? AppStyles.color.main : 'grey'}
              />
            </TouchableOpacity>
            <Text>{comment.likes}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={dislikeComment}>
              <Icon
                name="thumbs-down"
                size={15}
                color={userDislikedComment ? AppStyles.color.main : 'grey'}
              />
            </TouchableOpacity>
            <Text>{comment.dislikes}</Text>
          </View>
        </View>
      </View>
    );
  };

  const ModalInformation = (props) => {
    const ratingStars = [];
    for (let rate = 0; rate < props.station.charger.rating; rate++) {
      ratingStars.push(<Icon key={rate} name="star" size={20} color="orange" />);
    }
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '2%' }}>
          {ratingStars.length === 0 ? <Text style={{ fontSize: 15 }}>No rating</Text> : ratingStars}
        </View>
        <View style={{ flexDirection: 'row', marginTop: '15%', marginLeft: '5%' }}>
          <Icon name="flow-branch" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.type == undefined ? 'no data' : props.station.charger.type}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
          <Icon name="credit" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.pricing}/h
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
          <Icon name="flash" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.voltage} kWh
          </Text>
        </View>
      </View>
    );
  };

  const [userStation, setUserStation] = useState([
    {
      name: 'Station test',
      public: true,
      type: 'Type test',
      pricing: 0,
      voltage: 0,
      rating: 0,
      location: [0, 0]
    }
  ]);

  const navigateToStationRatingScreen = () => {
    const selectedStation = modalData.charger;
    setModalVisible(false);
    setModalData({});
    navigation.navigate('StationRating', { stationId: selectedStation.id });
  };

  const [fetchStations, setFetchStations] = useState(true);

  useEffect(() => {
    try {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ],
        {
          title: 'Give Location Permission',
          message: 'App needs location permission to find your position.'
        }
      )
        .then(async (granted) => {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 50000
          })
            .then((location) => {
              console.log(location);
              // setUserPosition([location.latitude, location.longitude]);
              setUserPosition([48.861961, 2.340254]);
            })
            .catch((error) => {
              const { code, message } = error;
              console.warn(code, message);
            });
        })
        .catch((err) => {
          console.warn(err);
        });

      const fetchData = async () => {
        var conf = {
          method: 'get',
          url: config.API_URL + '/api/v1/stations/all',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiMzgxMWUyMzYtMjZiMS00OGExLWEyOWItOGM2ZmEwMTQxYjkyIiwiZmlyc3ROYW1lIjoiSm9lIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6Im93bmVyQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkQnBHQ1JRVGF4RmxTSlZnWUcyS1ZUZXhsTk9jV3Izd1lCYy52MTBML1RWTHBVaTdQVVU5T1ciLCJkYXRlT2ZCaXJ0aCI6IjIwMDEtMDMtMDJUMDA6MDA6MDAuMDAzWiIsImVtYWlsVmVyaWZpZWRBdCI6bnVsbCwiYmFsYW5jZSI6MH0sImlhdCI6MTY2ODM0NTczNH0.fM2RVjD93y_lC47uBd1OQo7RrGhhBNcjMs02zkBn2hM',
            'Content-Type': 'application/json'
          },
          data: null
        };

        // const conf = api.send('GET', '/api/v1/stations/all');
        let favoriteStations = [];
        try {
          const favoriteStationsObject = await api.send('GET', '/api/v1/station/favorites');
          favoriteStations = favoriteStationsObject.data;
        } catch (e) {
          console.log('failed to fetch user favorite stations');
        }

        try {
          const userProfileObject = await api.send('GET', '/api/v1/profile');
          console.log(userProfileObject.data);
          setUserProfile(userProfileObject.data);
        } catch (e) {
          console.log('failed to fetch user profile');
        }

        const res = await axios(conf);
        var stationsParsed = [];
        console.log(res.data.stations[0]);
        for (var index = 0; index < res.data.stations.length; index++) {
          const station = res.data.stations[index];
          stationsParsed.push({
            id: station.id,
            name: 'Station ' + index,
            public: station.properties.isPublic,
            type: station.properties.plugTypes[0],
            pricing: station.properties.price,
            voltage: station.properties.maxPower,
            rating: station.rate,
            location: [Number(station.coordinates.long), Number(station.coordinates.lat)],
            isFavorite: favoriteStations.find(({ id }) => id === station.id) !== undefined,
            rates: station.rates
          });
        }
        setUserStation(stationsParsed);
      };
      fetchData().catch(console.error);
    } catch (e) {
      console.log(e);
    }
  }, [fetchStations]);

  const addStationToFavorites = async (stationId) => {
    try {
      await api.send('POST', `/api/v1/station/favorite/${stationId}`);
      setModalData({ ...modalData, charger: { ...modalData.charger, isFavorite: true } });
    } catch (e) {
      console.log('Failed to add station to favorites');
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={
            nightMode ? 'mapbox://styles/mapbox/dark-v9' : 'mapbox://styles/mapbox/light-v9'
          }
          zoomLevel={16}
          center={[userPosition]}
          key="map"
        >
          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={[userPosition[1], userPosition[0]]}
            animationMode={'flyTo'}
            animationDuration={3}
          ></MapboxGL.Camera>
          <MapboxGL.UserLocation visible={true} />
          {userStation.map((charger, index) =>
            checkFilters(charger) ? (
              <MapboxGL.PointAnnotation
                id={charger.name}
                coordinate={charger.location}
                onSelected={() => setModal(charger)}
                key={index}
              >
                <View>
                  <Icon
                    name="pin"
                    size={24}
                    color={charger.public ? AppStyles.color.tint : AppStyles.color.greenBlue}
                  />
                </View>
              </MapboxGL.PointAnnotation>
            ) : (
              <></>
            )
          )}
        </MapboxGL.MapView>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 70,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'grey'
          }}
          onPress={() => setFetchStations(!fetchStations)}
        >
          <Icon name="ccw" size={30} color={AppStyles.color.white} />
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 10,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: nightMode ? AppStyles.color.white : AppStyles.color.tint
          }}
          onPress={() => setNightMode(!nightMode)}
        >
          <Icon
            name="adjust"
            size={30}
            color={nightMode ? AppStyles.color.tint : AppStyles.color.white}
          />
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: 10,
            right: 10,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: nightMode ? AppStyles.color.white : AppStyles.color.tint
          }}
          onPress={() => setFiltersMenu(!filtersMenu)}
        >
          <Icon
            name="sound-mix"
            size={30}
            color={nightMode ? AppStyles.color.tint : AppStyles.color.white}
          />
        </Pressable>
        <FiltersComponent />
        {modalVisible ? (
          <Modal animationType={'fade'} transparent={true} visible={true} onRequestClose={{}}>
            <View style={styles.modal}>
              <View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%' }}
                >
                  <Pressable onPress={() => addStationToFavorites(modalData.charger.id)}>
                    <Icon
                      name={modalData.charger.isFavorite ? 'heart' : 'heart-outlined'}
                      size={30}
                      color={AppStyles.color.tint}
                    />
                  </Pressable>
                  <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>
                    {modalData.charger.name}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Icon name="cross" size={30} color="green" />
                  </Pressable>
                </View>
                <ModalInformation station={modalData} />
              </View>
              <View>
                <SafeAreaView style={{ height: '60%', padding: '5%' }}>
                  <ScrollView>
                    <View>
                      {modalData.charger.rates.length > 0 ? (
                        modalData.charger.rates.map((comment) => (
                          <UserComment userComment={comment} key={comment.id} />
                        ))
                      ) : (
                        <Text>
                          Be the first to rate this station to help other users in their search !
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
              {!modalData.charger.public ? (
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Button containerStyle={styles.bookButton} style={styles.shareText}>
                    Book
                  </Button>
                </View>
              ) : (
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    containerStyle={styles.bookButton}
                    style={styles.shareText}
                    onPress={navigateToStationRatingScreen}
                  >
                    Rate
                  </Button>
                </View>
              )}
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  map: {
    flex: 1
  },
  textEntry: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  modal: {
    backgroundColor: AppStyles.color.white,
    height: '70%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppStyles.color.grey,
    marginTop: '30%',
    marginLeft: '12%'
  },
  userProfile: {
    backgroundColor: AppStyles.color.tint,
    borderRadius: 15,
    padding: 5
  },
  userTransaction: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18
  },
  filters: {
    backgroundColor: AppStyles.color.white,
    color: AppStyles.color.tint,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  apply: {
    backgroundColor: AppStyles.color.tint,
    color: AppStyles.color.white,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  save: {
    backgroundColor: AppStyles.color.facebook,
    color: AppStyles.color.white,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  compare: {
    backgroundColor: AppStyles.color.grey,
    color: AppStyles.color.white,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  bookButton: {
    width: 200,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 80
  },
  shareText: {
    color: AppStyles.color.white
  }
});

export default Map;
