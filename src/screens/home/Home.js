import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  Text,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import { AppStyles } from '../../AppStyles';
import { Configuration } from '../../Configuration';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'react-native-button';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location';
import config from '../../db/config';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../db/Api';
import Planning from '../planning/Planning';
import serviceAccessToken from '../../db/AccessToken';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
);
MapboxGL.setConnected(true);

var axios = require('axios');

function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home'
    });
  }, []);

  function Chat({ chat }) {
    console.log(JSON.stringify(chat, null, '\t'));

    const name = `${chat.user.firstName} ${chat.user.lastName}`;
    const lastMessage = chat.message.body;

    return (
      <View>
        <View style={styles.separator}></View>
        <View style={[styles.container, { flexDirection: 'row' }]}>
          <View style={styles.chatContainer}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.message}>You: {lastMessage}</Text>
          </View>
        </View>
      </View>
    );
  }

  const MyMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      api.send('GET', '/api/v1/profile/messages/last-by-user').then((data) =>
        setMessages(
          data.data.map((message, index) => {
            return message;
          })
        )
      );
    }, []);

    console.log(JSON.stringify(messages, null, '\t'));
    return (
      <View style={[styles.container, { height: 198, width: 328 }]}>
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.message.id}
            renderItem={({ item }) => <Chat chat={item}></Chat>}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={{ color: 'black' }}>No messages yet</Text>
        )}
      </View>
    );
  };

  const MyMap = () => {
    const [userPosition, setUserPosition] = useState([0, 0]);
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
    }, []);

    useEffect(() => {
      console.log('FETCH');
      try {
        const fetchData = async () => {
          let data = JSON.stringify({
            params: {
              minPrice: 0,
              maxPrice: 500,
              plugTypes: [1],
              range: 5000,
              type: '',
              userLat: userPosition[0],
              userLong: userPosition[1]
            }
          });
          var conf = {
            method: 'post',
            url: config.API_URL + '/api/v1/stations',
            headers: {
              Authorization: `Bearer ${await serviceAccessToken.get()}`,
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
    }, [userPosition]);

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
    const [favStation, setFavStation] = useState(false);
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
            {ratingStars.length === 0 ? (
              <Text style={{ fontSize: 15 }}>No rating</Text>
            ) : (
              ratingStars
            )}
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
              {props.station.charger.pricing} €/h
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

    const navigateToStationBookingScreen = () => {
      const selectedStation = modalData.charger;
      setModalVisible(false);
      setModalData({});
      //navigation.navigate('PlanningUser', { stationId: selectedStation.id });
      navigation.navigate('Planning', { stationId: selectedStation.id });
    };

    return (
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/mapbox/light-v9"
          zoomLevel={11}
          center={[userPosition]}
          key="map"
        >
          <MapboxGL.Camera
            zoomLevel={11}
            centerCoordinate={[userPosition[1], userPosition[0]]}
            animationMode={'flyTo'}
            animationDuration={5000}
            pitchEnabled={false}
          ></MapboxGL.Camera>
          {userStation.map((charger, index) => (
            <MapboxGL.PointAnnotation
              id={charger.name}
              coordinate={charger.location}
              onSelected={() => setModal(charger)}
              key={index}
            >
              <Icon
                name="pin"
                size={24}
                color={charger.public ? AppStyles.color.pulsive : AppStyles.color.greenBlue}
              />
            </MapboxGL.PointAnnotation>
          ))}
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
                      color={AppStyles.color.pulsive}
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
                  <Button
                    containerStyle={styles.bookButton}
                    style={{ color: AppStyles.color.white }}
                    onPress={navigateToStationBookingScreen}
                  >
                    Book
                  </Button>
                </View>
              ) : (
                <></>
              )}
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const [components, setComponents] = useState([
    <MyMap />,
    <MyMessages />,
    <Planning home={true} />
  ]);

  return (
    <ScrollView style={styles.container}>
      {components.map((component, index) => (
        <View style={styles.component} key={index}>
          {component}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.background,
    padding: Configuration.home.listing_item.offset
  },
  mapContainer: {
    flex: 1,
    height: 198,
    width: 328
  },
  map: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 25
  },
  component: {
    flex: 1,
    height: 200,
    width: '100%',
    marginBottom: 20,
    backgroundColor: AppStyles.color.background,
    borderWidth: 1,
    borderColor: AppStyles.color.grey
  },
  arrow: {
    fontSize: 24,
    color: 'black'
  },
  modal: {
    backgroundColor: AppStyles.color.background,
    height: '70%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppStyles.color.grey,
    marginTop: '30%',
    marginLeft: '12%'
  },
  bookButton: {
    width: 200,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 80
  },
  userProfile: {
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '2%'
  },
  userTransaction: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18
  },
  addressText: {
    fontWeight: 'bold',
    color: AppStyles.color.pulsive,
    fontSize: 19,
    marginBottom: 15
  },
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.grey,
    fontSize: 18,
    marginBottom: 15
  },
  messageReadImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5
  },
  chatBubble: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  separator: {
    height: 1,
    marginVertical: 3,
    backgroundColor: '#000'
  },
  imageContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  chatContainer: {
    width: '100%'
  },
  profileName: {
    fontSize: 18,
    color: AppStyles.color.pulsive
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22.5
  },
  message: {
    fontSize: 16,
    color: AppStyles.color.text,
    paddingRight: 10
  }
});

export default Home;
