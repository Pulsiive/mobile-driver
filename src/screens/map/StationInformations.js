import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../db/Api';

import { getUser, useUserUpdate } from '../../contexts/UserContext';
import { FloatingButton, TextSubTitle, TextTitle } from '../../components';

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
        height: '50%',
        borderRadius: 10,
        marginHorizontal: '3%',
        bottom: '2%',
        position: 'absolute',
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
        <View style={{ flex: 1, minHeight: '60%' }}>
          <Image
            source={
              station.properties.isPublic
                ? AppIcon.images.stationInformationsModal
                : AppIcon.images.stationPrivate
            }
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          />
          <FloatingButton
            icon={isFavorite ? 'heart' : 'heart-outlined'}
            iconColor={isFavorite ? AppColor.pulsive : AppColor.title}
            style={{
              top: 10,
              right: 10,
              width: 40,
              height: 40
            }}
            onPress={() => onHeartPressed()}
          />
        </View>
        <View style={{ padding: 10, paddingHorizontal: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <TextSubTitle
                title={
                  station.properties.isPublic
                    ? station.coordinates.address
                    : `Borne de ${station.owner.firstName}`
                }
                style={{ fontSize: AppStyles.fontSize.contentTitle }}
              />
            </View>
            {station.rates.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconAwesome name="star" size={14} color={AppColor.title} />
                <Text style={{ color: AppColor.title, marginLeft: 3, marginBottom: 2 }}>
                  {station.rate} ({station.rates.length})
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
              style={{ color: AppColor.text, marginLeft: 3, marginBottom: 2, fontWeight: '600' }}
            >
              {station.properties.price / 100}€
            </Text>
            <Text style={{ color: AppColor.text, marginLeft: 3, marginBottom: 2 }}>par minute</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default StationInformations;
