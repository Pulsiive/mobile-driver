import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../db/Api';

function StationInformations({ station, userProfile, navigation }) {
  const [stationIsFavorite, setStationIsFavorite] = useState(station.isFavorite);

  const onHeartPressed = async () => {
    let reqType = stationIsFavorite ? 'DELETE' : 'POST';
    const res = await api.send(reqType, `/api/v1/station/favorite/${station.id}`);
    if (res.status === -1) {
      showMessage({
        message: `Failed to ${
          stationIsFavorite ? 'remove' : 'add'
        } the selected station to your list of favorites`,
        type: 'danger',
        duration: 2200
      });
    } else {
      setStationIsFavorite(!stationIsFavorite);
    }
  };

  return (
    <View
      style={{
        width: '92%',
        backgroundColor: 'white',
        height: '20%',
        borderRadius: 10,
        marginLeft: 20,
        bottom: '1%',
        position: 'absolute',
        padding: 3
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate('StationInformations', {
            station: station,
            userProfile
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
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
                {station.address}
              </Text>
              <Pressable onPress={onHeartPressed}>
                <Icon
                  name={stationIsFavorite ? 'heart' : 'heart-outlined'}
                  size={22}
                  color={AppStyles.color.tint}
                />
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Icon name="flow-branch" size={20} color="grey" />
              <Text style={{ color: 'grey' }}>
                {station.type == undefined ? 'no data' : station.type}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Icon name="flash" size={20} color="grey" />
              <Text style={{ color: 'grey' }}>{station.voltage} kWh</Text>
            </View>
            {station.rating !== 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Icon name="star" size={20} color="grey" />
                <Text style={{ color: 'grey' }}>{station.rating}</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Icon name="credit" size={20} color="grey" />
              <Text style={{ color: 'grey' }}>{station.pricing} / hour</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default StationInformations;
