import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PermissionsAndroid,
  Modal,
  SafeAreaView,
  ScrollView
} from 'react-native';

import Slider from '@react-native-community/slider';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';

import MapboxGL from '@react-native-mapbox-gl/maps';
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
  const [nightMode, setNightMode] = useState(false);
  const [filtersMenu, setFiltersMenu] = useState(false);

  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const setModal = (charger) => {
    setModalVisible(true);
    setModalData({
      // name: props.event.properties.id,
      // location: props.event.geometry.coordinates,
      charger: charger
    });
  };

  const [filterType, setFilterType] = useState(1);
  const [filterPrice, setFilterPrice] = useState(500);
  const [filterStatut, setFilterStatut] = useState(2);
  const [filterRange, setFilterRange] = useState(5);
  const [filterRating, setFilterRating] = useState(0);

  const [savedFilters1, setSavedFilters1] = useState({
    savedFilterType: false,
    savedFilterPrice: false,
    savedFilterStatut: false,
    savedFilterRange: false,
    savedFilterRating: false
  });
  const [savedFilters2, setSavedFilters2] = useState({
    savedFilterType: false,
    savedFilterPrice: false,
    savedFilterStatut: false,
    savedFilterRange: false,
    savedFilterRating: false
  });
  const [filterSelect, setFilterSelect] = useState(0);

  const checkFilters = (charger) => {
    // if (filterType && charger.type != filterType) return false;
    // if (filterPrice && charger.pricing > filterPrice) return false;
    // if (filterStatut) {
    // if (filterStatut == 'Public' && !charger.public) return false;
    // if (filterStatut == 'Private' && charger.public) return false;
    // }
    if (filterRating && charger.rating < filterRating) return false;
    return true;
  };

  const FiltersComponent = () => {
    const clear = () => {
      setFilterSelect(0);
      setFilterType(1);
      setFilterPrice(500);
      setFilterStatut(2);
      setFilterRange(5);
      setFilterRating(0);
    };
    const save1 = () => {
      setSavedFilters1({
        savedFilterType: filterType,
        savedFilterPrice: filterType,
        savedFilterStatut: filterStatut,
        savedFilterRange: filterRange,
        savedFilterRating: filterRating
      });
    };
    const save2 = () => {
      setSavedFilters2({
        savedFilterType: filterType,
        savedFilterPrice: filterType,
        savedFilterStatut: filterStatut,
        savedFilterRange: filterRange,
        savedFilterRating: filterRating
      });
    };
    const compare1 = () => {
      const temp = { filterType, filterPrice, filterStatut, filterRange, filterRating };
      setFilterType(savedFilters1.savedFilterType);
      setFilterPrice(savedFilters1.savedFilterPrice);
      setFilterStatut(savedFilters1.savedFilterStatut);
      setFilterStatut(savedFilters1.savedFilterRange);
      setFilterRating(savedFilters1.savedFilterRating);
      setSavedFilters1({
        savedFilterType: temp.filterType,
        savedFilterPrice: temp.filterPrice,
        savedFilterStatut: temp.filterStatut,
        savedFilterRange: temp.filterRange,
        savedFilterRating: temp.filterRating
      });
    };
    const compare2 = () => {
      const temp = { filterType, filterPrice, filterStatut, filterRange, filterRating };
      setFilterType(savedFilters2.savedFilterType);
      setFilterPrice(savedFilters2.savedFilterPrice);
      setFilterStatut(savedFilters2.savedFilterStatut);
      setFilterStatut(savedFilters2.savedFilterRange);
      setFilterRating(savedFilters2.savedFilterRating);
      setSavedFilters2({
        savedFilterType: temp.filterType,
        savedFilterPrice: temp.filterPrice,
        savedFilterStatut: temp.filterStatut,
        savedFilterRange: temp.filterRange,
        savedFilterRating: temp.filterRating
      });
    };
    return filtersMenu ? (
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 70,
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
              left: 110,
              display: 'flex'
            }}
          >
            {/* <Button style={styles.filters} onPress={() => setFilterType(0)}>
              X
            </Button> */}
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 1 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 1 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(1)}
            >
              TYPE 1
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 2 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 2 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(2)}
            >
              TYPE 2
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 3 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 3 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(3)}
            >
              TYPE 3
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 4 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 4 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(4)}
            >
              CCS
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 5 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 5 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(5)}
            >
              CHADEMO
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 6 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 6 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(6)}
            >
              GREENUP
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 7 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 7 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(7)}
            >
              EF
            </Button>
            {/* <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterType == 8 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 8 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType(8)}
            >
              ALL
            </Button> */}
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
              top: 60,
              left: 90,
              display: 'flex'
            }}
          >
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={500}
              value={filterPrice}
              onValueChange={(value) => setFilterPrice(value)}
              step={1}
              orientation="vertical"
              minimumTrackTintColor="green"
              maximumTrackTintColor="black"
            />
            <Text
              style={{
                color: 'black',
                backgroundColor: AppStyles.color.white,
                padding: 5,
                width: 60,
                left: 45,
                marginTop: 45,
                fontSize: 11
              }}
            >
              {filterPrice}€/min
            </Text>
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
              left: 110,
              display: 'flex'
            }}
          >
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterStatut == 2 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 2 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut(2)}
            >
              ALL
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterStatut == 0 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 0 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut(0)}
            >
              Public
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor: filterStatut == 1 ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 1 ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut(1)}
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
              left: 110,
              display: 'flex'
            }}
          >
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '0' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '0' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('0')}
            >
              0
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
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 5 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 5 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(5)}
        >
          Range
        </Button>
        {filterSelect == 5 ? (
          <View
            style={{
              position: 'absolute',
              top: 60,
              left: 90,
              display: 'flex'
            }}
          >
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={5}
              value={filterRange}
              onValueChange={(value) => setFilterRange(value)}
              step={0.01}
              orientation="vertical"
              minimumTrackTintColor="green"
              maximumTrackTintColor="black"
            />
            <Text
              style={{
                color: 'black',
                backgroundColor: AppStyles.color.white,
                padding: 5,
                width: 60,
                left: 45,
                marginTop: 45,
                fontSize: 13
              }}
            >
              {filterRange.toFixed(2)} km
            </Text>
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

  const UserComment = (props) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10, height: 40 }}>
        <Icon style={styles.userProfile} name="user" size={30} color="white" />
        <View style={{ marginLeft: '3%', marginTop: '1%' }}>
          <Text style={styles.userTransaction}>{props.name}</Text>
          <Text style={{ color: 'grey' }}>{props.message}</Text>
        </View>
      </View>
    );
  };

  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    let res = '';
    if (d < 1) {
      d = d * 1000;
      res = d.toFixed(0) + ' m';
    } else res = d.toFixed(2) + ' km';
    return res;
  }

  function toRad(deg) {
    return deg * (Math.PI / 180);
  }

  const ModalInformation = (props) => {
    console.log(props.station.charger.location);
    const dist = distance(
      props.station.charger.location[1],
      props.station.charger.location[0],
      userPosition[0],
      userPosition[1]
    );
    const ratingStars = [];
    for (let rate = 0; rate < props.station.charger.rating; rate++) {
      ratingStars.push(<Icon key={rate} name="star" size={20} color="orange" />);
    }
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '2%' }}>
          {ratingStars.length === 0 ? <Text style={{ fontSize: 15 }}>No rating</Text> : ratingStars}
        </View>
        <View style={{ flexDirection: 'row', marginTop: '7%', marginLeft: '5%' }}>
          <Icon name="address" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>{dist}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '7%', marginLeft: '5%' }}>
          <Icon name="flow-branch" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.type == undefined ? 'no data' : props.station.charger.type}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '7%', marginLeft: '5%' }}>
          <Icon name="credit" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.pricing}/h
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '7%', marginLeft: '5%' }}>
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

  const [favStation, setFavStation] = useState(false);

  const navigateToStationRatingScreen = () => {
    const selectedStation = modalData.charger;
    setModalVisible(false);
    setModalData({});
    navigation.navigate('StationRating', { stationId: selectedStation.id });
  };

  const [fetchStations, setFetchStations] = useState(true);
  const [fetchPosition, setFetchPosition] = useState(false);
  const [resetPosition, setResetPosition] = useState(true);

  useEffect(() => {
    console.log('INIT');
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
              setUserPosition([location.latitude, location.longitude]);
            })
            .catch((error) => {
              const { code, message } = error;
              console.warn(code, message);
            });
        })
        .catch((err) => {
          console.warn(err);
        });
    } catch (e) {
      console.log(e);
    }
  }, [resetPosition]);

  useEffect(() => {
    console.log('FETCH');
    try {
      const fetchData = async () => {
        let data = JSON.stringify({
          params: {
            minPrice: 0,
            maxPrice: filterPrice,
            plugTypes: [filterType],
            range: (filterRange * 1000).toFixed(2),
            type: filterStatut == 2 ? '' : filterStatut,
            userLat: userPosition[0],
            userLong: userPosition[1]
          }
        });
        var conf = {
          method: 'post',
          url: config.API_URL + '/api/v1/stations',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiOTc4ZjQ2MmMtMTYxOC00YTcyLTg2NDAtZmRiOTdlMzI4NjI5IiwiZmlyc3ROYW1lIjoiQ2hyaXMiLCJsYXN0TmFtZSI6IlRlc3QiLCJlbWFpbCI6Im93bmVyQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWklYMEJ1cTJ0SElrZkMuU0U5TFYvdWZZQ2ZWYnJmRjlwaVk4SkJpVURWYmw0SHhZc29PejYiLCJkYXRlT2ZCaXJ0aCI6IjIwMDEtMDMtMDJUMDA6MDA6MDAuMDAzWiIsImVtYWlsVmVyaWZpZWRBdCI6bnVsbCwiYmFsYW5jZSI6MCwiaXNGcm9tT0F1dGgiOmZhbHNlfSwiaWF0IjoxNjczNzg0ODkwfQ.QrgdN4o3EOPdZekjrFmEBC7PDLjgjwTtr4Zx-YDITqU',
            'Content-Type': 'application/json'
          },
          data: data
        };

        const res = await axios(conf);
        console.log(JSON.stringify(res.data, null, '\t'));
        var stationsParsed = [];
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
            location: [Number(station.coordinates.long), Number(station.coordinates.lat)]
          });
        }
        setUserStation(stationsParsed);
        if (res.status == 200) {
          console.log('OK');
        } else {
          throw res;
        }
      };
      fetchData().catch(console.error);
    } catch (e) {
      console.log(e);
    }
  }, [
    fetchStations,
    filterType,
    filterPrice,
    filterStatut,
    filterRange,
    filterRating,
    userPosition
  ]);

  const onMapPress = (e) => {
    if (fetchPosition) {
      const { geometry } = e;
      setUserPosition([geometry.coordinates[1], geometry.coordinates[0]]);
    }
  };

  function handleListItemPress(location) {
    setUserPosition([location[1][0], location[1][1]]);
  }

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
          onPress={onMapPress}
        >
          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={[userPosition[1], userPosition[0]]}
            animationMode={'flyTo'}
            animationDuration={5000}
            pitchEnabled={false}
          ></MapboxGL.Camera>
          {userStation.map((charger, index) =>
            checkFilters(charger) ? (
              <MapboxGL.PointAnnotation
                id={charger.name}
                coordinate={charger.location}
                onSelected={() => setModal(charger)}
                key={index}
              >
                <Icon
                  name="pin"
                  size={24}
                  color={charger.public ? AppStyles.color.tint : AppStyles.color.greenBlue}
                />
              </MapboxGL.PointAnnotation>
            ) : (
              <></>
            )
          )}
          {userPosition && (
            <MapboxGL.PointAnnotation
              id="userPosition"
              coordinate={[userPosition[1], userPosition[0]]}
              title="Je suis ici"
            >
              <Icon name="location-pin" size={30} color={AppStyles.color.facebook} />
            </MapboxGL.PointAnnotation>
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
          <Icon name="cycle" size={30} color={AppStyles.color.white} />
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 130,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: fetchPosition ? AppStyles.color.facebook : AppStyles.color.grey
          }}
          onPress={() => setFetchPosition(!fetchPosition)}
        >
          <Icon name="globe" size={30} color={AppStyles.color.white} />
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 190,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: AppStyles.color.facebook
          }}
          onPress={() => setResetPosition(!resetPosition)}
        >
          <Icon name="location" size={30} color={AppStyles.color.white} />
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 250,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: AppStyles.color.facebook
          }}
          onPress={() => navigation.navigate('Locations', { handleListItemPress })}
        >
          <Icon name="aircraft" size={30} color={AppStyles.color.white} />
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
            left: 10,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: AppStyles.color.tint
          }}
          onPress={() => setFiltersMenu(!filtersMenu)}
        >
          <Icon name="sound-mix" size={30} color={AppStyles.color.white} />
        </Pressable>
        <FiltersComponent />
        {modalVisible ? (
          <Modal animationType={'fade'} transparent={true} visible={true} onRequestClose={{}}>
            <View style={styles.modal}>
              <View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%' }}
                >
                  <Pressable
                    onPress={() => {
                      setFavStation(!favStation);
                    }}
                  >
                    <Icon
                      name={favStation ? 'heart' : 'heart-outlined'}
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
                      <UserComment message={'Nice station'} name={'Anto'} />
                      <UserComment message={'It works good !'} name={'Thoms'} />
                      <UserComment message={'The owner is nice'} name={'Citar'} />
                      <UserComment message={'Fast and good location'} name={'PP.MJ'} />
                      <UserComment message={'Good Good'} name={'Yheb'} />
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
  slider: {
    height: 60,
    backgroundColor: AppStyles.color.white,
    width: 150,
    transform: [{ rotate: '-90deg' }]
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
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '2%'
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
