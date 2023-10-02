import React, { useEffect } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../db/Api';

import { getUser, useUserUpdate } from '../../contexts/UserContext';
import { TextTitle } from '../../components';

function StationInformations({ station, navigation }) {
  const { AppColor } = useTheme();

  const user = getUser();
  const updateUser = useUserUpdate();
  const isFavorite = user.favoriteStations.find(({ id }) => id === station.id) !== undefined;

  const onHeartPressed = async () => {
    let reqType = isFavorite ? 'DELETE' : 'POST';

    const res = await api.send(reqType, `/api/v1/station/favorite/${station.id}`);
    if (res.status === -1) {
      showMessage({
        message: `Failed to ${
          isFavorite ? 'remove' : 'add'
        } the selected station to your list of favorites`,
        type: 'danger',
        duration: 2200
      });
    } else {
      if (!isFavorite) {
        updateUser({ favoriteStations: [...user.favoriteStations, station] });
      } else
        updateUser({
          favoriteStations: user.favoriteStations.filter(({ id }) => id !== station.id)
        });
    }
  };

  return (
    <View
      style={{
        width: '94%',
        backgroundColor: AppColor.background,
        height: '20%',
        borderRadius: 10,
        marginHorizontal: '3%',
        bottom: '2%',
        position: 'absolute',
        padding: 5,
        elevation: 3
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate('StationInformations', {
            station
          })
        }
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '30%' }}>
            <Image
              source={AppIcon.images.stationInformationsModal}
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10
              }}
            />
          </View>
          <View style={{ width: '65%', marginLeft: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}
            >
              <TextTitle
                title={
                  station.properties.isPublic
                    ? station.coordinates.address
                    : `${station.owner.firstName}'s station`
                }
                style={{ fontSize: AppStyles.fontSize.normal, margin: 0 }}
              />
              <Pressable onPress={onHeartPressed}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-outlined'}
                  size={22}
                  color={AppColor.pulsive}
                />
              </Pressable>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
              {station.rate !== 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="star" size={18} color={AppColor.icon} />
                  <Text style={{ color: AppColor.icon, marginLeft: 3, marginBottom: 2 }}>
                    {station.rate}
                  </Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="credit" size={18} color={AppColor.icon} />
                <Text style={{ color: AppColor.icon, marginLeft: 3, marginBottom: 2 }}>
                  {station.properties.price} / hour
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default StationInformations;
