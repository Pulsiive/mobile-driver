import React, { useState, useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Image } from 'react-native';
import {
  AnimatedLoading,
  ButtonConditional,
  FilterBubble,
  FilterSlider,
  FilterTab,
  FloatingButton,
  ModalSwipeUp,
  SearchBar,
  TextSubTitle,
  TextTitle
} from '../../components';

import { AppIcon, AppStyles, useTheme } from '../../AppStyles';

import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location';

import Icon from 'react-native-vector-icons/Entypo';
import StationInformations from './StationInformations';

import config from '../../db/config';
import serviceAccessToken from '../../db/AccessToken';
import { useFocusEffect } from '@react-navigation/native';
import * as locations from '../../locations';
import * as Animatable from 'react-native-animatable';

var axios = require('axios');

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
);
MapboxGL.setConnected(true);

function Map({ navigation }) {
  const { isDarkMode, AppColor } = useTheme();

  const [userPosition, setUserPosition] = useState([0, 0]);
  const [resetPosition, setResetPosition] = useState(true);
  const [fetchPosition, setFetchPosition] = useState(false);

  const [filterModal, setFilterModal] = useState(false);
  const [filterStatut, setFilterStatut] = useState(0);
  const [filterType, setFilterType] = useState(2);
  const [filterRating, setFilterRating] = useState(0);
  const [filterRange, setFilterRange] = useState(5);
  const [filterPrice, setFilterPrice] = useState(500);

  const [resetFilters, setResetFilters] = useState(true);

  const [nbStations, setNbStations] = useState(0);
  const [stationModal, setStationModal] = useState(false);

  const [selectedStation, setSelectedStation] = useState();
  const [userStation, setUserStation] = useState();

  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loading, setLoading] = useState(true);
  const [drawPin, setDrawPin] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setDrawPin(false);
    });
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setDrawPin(true);
      // fetchData();
    }, [])
  );

  // useEffect(() => {
  //   setDrawPin(true);
  // }, [drawPin]);

  useEffect(() => {
    console.log('INIT');
    setLoadingLocation(true);
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
              // setUserPosition([48.85836907344881, 2.3412766196414907]);
              setLoadingLocation(false);
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
    } finally {
      setDrawPin(true);
    }
  }, [resetPosition]);

  const fetchData = async () => {
    let data = JSON.stringify({
      params: {
        minPrice: 0,
        maxPrice: filterPrice,
        plugTypes: [filterType - 1],
        range: (filterRange * 1000).toFixed(2),
        type: filterStatut,
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

    // console.log(data);
    const res = await axios(conf);
    console.log(JSON.stringify(res.data.stations, null, '\t'));
    var stationsParsed = res.data.stations
      .map((station, index) => ({
        ...station,
        name: 'Station ' + index,
        type: station.properties.plugTypes[0],
        location: [Number(station.coordinates.long), Number(station.coordinates.lat)]
      }))
      .filter((station) => station.rate >= filterRating);
    setNbStations(stationsParsed.length);
    setUserStation(stationsParsed);
    // console.log(JSON.stringify(stationsParsed, null, '\t'));
    if (res.status == 200) {
      console.log('OK');
    } else {
      throw res;
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [userPosition]);

  const onMapPress = (e) => {
    if (fetchPosition) {
      const { geometry } = e;
      setUserPosition([geometry.coordinates[1], geometry.coordinates[0]]);
      setFetchPosition(false);
    }
    if (selectedStation) {
      setSelectedStation(undefined);
    }
    setDrawPin(true);
  };

  const resetAllFilters = async () => {
    setLoading(true);
    setResetFilters(false);
    setFilterStatut(0);
    setFilterType(2);
    setFilterRating(0);
    setFilterRange(5);
    setFilterPrice(500);
    try {
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setResetFilters(true);
      setLoading(false);
    }
  };

  const checkStations = async () => {
    setLoading(true);
    try {
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setStationModal(true);
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      flex: 1,
      marginBottom: -30
    }
  });

  const FiltersModalBottom = () => {
    return (
      <View style={{ minHeight: '10%', justifyContent: 'center' }}>
        {loading ? (
          <AnimatedLoading style={{ backgroundColor: AppColor.title }} />
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <ButtonConditional
              title="Tout effacer"
              titleStyle={{ color: AppColor.title }}
              isEnabled={true}
              style={{ backgroundColor: AppColor.background, flex: 1 }}
              onPress={() => resetAllFilters()}
            />
            <ButtonConditional
              title="Rechercher"
              isEnabled={true}
              style={{ backgroundColor: AppColor.title, flex: 1 }}
              onPress={() => checkStations()}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[AppStyles.container, { backgroundColor: AppColor.background }]}>
      {loadingLocation ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Animatable.Image
            animation="wobble"
            iterationCount="infinite"
            source={isDarkMode ? AppIcon.images.loadingDarkmode : AppIcon.images.loadingLightmode}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.container}>
              <MapboxGL.MapView
                style={styles.map}
                styleURL={
                  isDarkMode ? 'mapbox://styles/mapbox/dark-v9' : 'mapbox://styles/mapbox/light-v9'
                }
                center={[userPosition]}
                key="map"
                onPress={onMapPress}
              >
                <MapboxGL.Camera
                  zoomLevel={10}
                  centerCoordinate={[userPosition[1], userPosition[0]]}
                  animationMode={'flyTo'}
                  animationDuration={2500}
                  pitchEnabled={false}
                ></MapboxGL.Camera>
                {drawPin &&
                  userStation &&
                  userStation.map((charger, index) => (
                    <MapboxGL.PointAnnotation
                      id={charger.name}
                      coordinate={charger.location}
                      onSelected={() => setSelectedStation(charger)}
                      key={charger.id}
                    >
                      <Icon
                        name="location-pin"
                        size={24}
                        color={charger.properties.isPublic ? AppColor.public : AppColor.private}
                      />
                    </MapboxGL.PointAnnotation>
                  ))}
                {drawPin && userPosition && (
                  <MapboxGL.PointAnnotation
                    key={userPosition}
                    id="userPosition"
                    coordinate={[userPosition[1], userPosition[0]]}
                    title="Je suis ici"
                  >
                    <Icon name="location-pin" size={30} color={AppColor.pulsive} />
                  </MapboxGL.PointAnnotation>
                )}
              </MapboxGL.MapView>
            </View>
          </View>

          <FloatingButton
            icon="globe"
            iconColor={fetchPosition ? AppColor.pulsive : AppColor.icon}
            style={{
              top: 90,
              right: 0,
              marginRight: '5%',
              backgroundColor: AppColor.background
            }}
            onPress={() => {
              setFetchPosition(!fetchPosition), setDrawPin(!drawPin), setSelectedStation(undefined);
            }}
          />
          {fetchPosition && (
            <TextSubTitle
              title="Cliquez où vous le souhaitez sur la map pour changer de localisation"
              style={{
                position: 'absolute',
                bottom: '10%',
                fontSize: AppStyles.fontSize.contentTitle,
                alignSelf: 'center',
                padding: 10
              }}
            />
          )}
          <FloatingButton
            icon="location"
            style={{ top: 90, right: 75, marginRight: '5%', backgroundColor: AppColor.background }}
            onPress={() => {
              setResetPosition(!resetPosition), setSelectedStation(undefined);
            }}
          />
          <SearchBar
            title="Chercher"
            subtext="Choisissez votre localisation"
            icon="sound-mix"
            onPress={() => setFilterModal(true)}
            style={{ position: 'absolute', top: 30 }}
            list={locations.locations}
            onSelect={setUserPosition}
          />
          <ModalSwipeUp
            title="Filtres"
            visible={filterModal}
            onClose={() => setFilterModal(false)}
            closeButton={true}
            bottom={true}
            bottomChildren={<FiltersModalBottom />}
          >
            <Image
              source={isDarkMode ? AppIcon.images.filtersDarkmode : AppIcon.images.filtersLightmode}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
            {resetFilters && (
              <View>
                <TextSubTitle
                  title="Statut des bornes"
                  style={{
                    marginTop: 30,
                    marginBottom: 20,
                    fontSize: AppStyles.fontSize.contentTitle
                  }}
                />
                <FilterTab
                  options={[
                    // { title: 'Public', value: 0 },
                    { title: 'Tout', value: 0 },
                    { title: 'Privé', value: 1 }
                  ]}
                  initValue={filterStatut}
                  onPress={(value) => setFilterStatut(value)}
                />

                <TextSubTitle
                  title="Type de recharge"
                  style={{
                    marginTop: 30,
                    marginBottom: 20,
                    fontSize: AppStyles.fontSize.contentTitle
                  }}
                />
                <FilterBubble
                  options={[
                    { title: 'Type 1', value: 1 },
                    { title: 'Type 2', value: 2 },
                    { title: 'Type 3', value: 3 },
                    { title: 'CCS', value: 4 },
                    { title: 'CHADEM0', value: 5 },
                    { title: 'GREENUP', value: 6 },
                    { title: 'EF', value: 7 }
                  ]}
                  initValue={filterType - 1}
                  onPress={(value) => setFilterType(value)}
                />

                <TextSubTitle
                  title="Limite de prix"
                  style={{
                    marginTop: 30,
                    marginBottom: 20,
                    fontSize: AppStyles.fontSize.contentTitle
                  }}
                />
                <FilterSlider
                  range={[0, 500]}
                  unit=" €"
                  initValue={filterPrice}
                  onChange={(value) => setFilterPrice(value)}
                />

                <TextSubTitle
                  title="Distance maximale"
                  style={{
                    marginTop: 30,
                    marginBottom: 20,
                    fontSize: AppStyles.fontSize.contentTitle
                  }}
                />
                <FilterSlider
                  range={[0, 5]}
                  unit=" km"
                  decimal={1}
                  initValue={filterRange}
                  onChange={(value) => setFilterRange(value)}
                />

                <TextSubTitle
                  title="Notation des bornes"
                  style={{
                    marginTop: 30,
                    marginBottom: 20,
                    fontSize: AppStyles.fontSize.contentTitle
                  }}
                />
                <FilterBubble
                  options={[
                    { title: 'Tout', value: 0 },
                    { title: '1+', value: 1 },
                    { title: '2+', value: 2 },
                    { title: '3+', value: 3 },
                    { title: '4+', value: 4 },
                    { title: '5', value: 5 }
                  ]}
                  initValue={filterRating}
                  onPress={(value) => setFilterRating(value)}
                />
              </View>
            )}
          </ModalSwipeUp>
          <ModalSwipeUp visible={stationModal} onClose={() => setStationModal(false)}>
            {nbStations > 0 ? (
              <View>
                <TextSubTitle
                  title={
                    'Vous avez trouvé\n' +
                    nbStations +
                    `${nbStations === 1 ? ' station' : ' stations'}`
                  }
                  style={{ margin: 20 }}
                />
                <ButtonConditional
                  title="Les afficher"
                  isEnabled={true}
                  style={{ backgroundColor: AppColor.title, flex: 1 }}
                  onPress={() => {
                    setStationModal(false);
                    setFilterModal(false);
                  }}
                />
              </View>
            ) : (
              <TextSubTitle
                title={"Il n'y a pas de stations correspondantes à vos critères..."}
                style={{ margin: 20 }}
              />
            )}
            <ButtonConditional
              title="Modifier la recherche"
              titleStyle={{ color: nbStations === 0 ? AppColor.background : AppColor.title }}
              isEnabled={true}
              style={{
                backgroundColor: nbStations === 0 ? AppColor.title : AppColor.background,
                flex: 1
              }}
              onPress={() => setStationModal(false)}
            />
          </ModalSwipeUp>
        </>
      )}
      {selectedStation && <StationInformations station={selectedStation} navigation={navigation} />}
    </View>
  );
}

export default Map;
