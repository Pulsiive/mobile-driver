import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUser } from '../../contexts/UserContext';
import {
  FloatingButton,
  FloatingNormalCard,
  TextContent,
  TextSubTitle,
  TextTitle
} from '../../components';

const Favorites = ({ navigation }) => {
  const user = getUser();
  const { AppColor } = useTheme();

  const navigateToStationScreen = (rate, stationId) => {
    navigation.navigate(rate ? 'StationRating' : 'BookingPlanning', { stationId });
  };

  const navigateToStationInformations = (station) => {
    navigation.navigate('StationInformations', {
      station
    });
  };

  return (
    <View
      style={[AppStyles.container, { backgroundColor: AppColor.background, paddingTop: Platform.OS === 'android' ? 0 : Dimensions.get("window").height * 0.05}]}
    >
      <ScrollView>
        <TextTitle title="Vos favorites" style={{ paddingBottom: 10 }} />
        <View>
          {user.favoriteStations.map((station) => {
            return (
              <FloatingNormalCard
                key={station.id}
                style={{ paddingLeft: 0, paddingVertical: 0, marginVertical: 8 }}
              >
                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row'}} onPress={() => navigateToStationInformations(station)}>
                  <View style={{ maxHeight: 120, height: '100%', marginRight: 10 }}>
                      <Image
                        source={
                          station.properties.isPublic
                            ? AppIcon.images.stationInformationsModal
                            : AppIcon.images.stationPrivate
                        }
                        style={{
                          width: 100,
                          height: '100%',
                        }}
                      />
                  </View>
                  <View style={{ flex: 1, paddingVertical: 7, paddingRight: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ flex: 1 }}>
                        <TextSubTitle
                          title={
                            station.properties.isPublic
                              ? station.coordinates.address
                              : `Borne de ${station.owner.firstName}`
                          }
                          inLine={true}
                          style={{ fontSize: AppStyles.fontSize.content }}
                        />
                      </View>
                      {station.rates.length > 0 && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <IconAwesome name="star" size={14} color={AppColor.title} />
                          <Text style={{ color: AppColor.title, marginLeft: 3, marginBottom: 2 }}>
                            {station.rate}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="flow-branch" size={18} color={AppColor.icon} />
                      <Text style={{ color: AppColor.icon, marginLeft: 3, marginBottom: 2 }}>
                        {station.properties.plugTypes.toString().length == 0
                          ? 'no data'
                          : station.properties.plugTypes.toString()}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="flash" size={18} color={AppColor.icon} />
                      <Text style={{ color: AppColor.icon, marginLeft: 3, marginBottom: 2 }}>
                        {station.properties.maxPower} kWh
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                      <Text
                        style={{
                          color: AppColor.text,
                          marginLeft: 3,
                          marginBottom: 2,
                          fontWeight: '600',
                        }}
                      >
                        {station.properties.price}€
                      </Text>
                      <Text style={{ color: AppColor.text, marginLeft: 3, marginBottom: 2 }}>
                        par heure
                      </Text>


                    </View>
                  </View>
                </TouchableOpacity>
                {station.properties.isPublic && (
                    <FloatingButton
                        icon="new-message"
                        iconColor={AppColor.title}
                        style={{
                          bottom: 5,
                          right: 0,
                          width: 40,
                          height: 40,
                        }}
                        onPress={() => navigateToStationScreen(true, station.id)}
                    />
                )}
                {!station.properties.isPublic && (
                    <FloatingButton
                        icon="calendar"
                        iconColor={AppColor.title}
                        style={{
                          bottom: 5,
                          right: 0,
                          width: 40,
                          height: 40,
                        }}
                        onPress={() => navigateToStationScreen(false, station.id)}
                    />
                )}
              </FloatingNormalCard>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Favorites;
