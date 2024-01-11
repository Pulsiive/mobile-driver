import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { AppStyles, useTheme, AppIcon } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';
import { ButtonConditional, FloatingNormalCard, Separator, TextSubTitle } from '../../components';
import Icon from 'react-native-vector-icons/Entypo';

function Panier({ navigation, route }) {
  const { AppColor } = useTheme();

  const slot = route.params.slot;
  const stationId = route.params.stationId;
  const [station, setStation] = useState(null);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    const getStation = async () => {
      const response = await Backend.getStation(stationId);

      if (response.status === 200) {
        setStation(response.data.station);
        showMessage({
          message: `Station récupéré avec succès`,
          type: 'success',
          backgroundColor: AppColor.pulsive
        });
      } else {
        showMessage({
          message: 'Impossible de récupérer la station',
          type: 'error',
          backgroundColor: AppColor.error
        });
      }
    };
    getStation();
  }, []);

  const styles = StyleSheet.create({
    container: { backgroundColor: AppColor.background, paddingTop: 30 },
    planning: {
      paddingBottom: 30,
      borderBottomColor: AppColor.separator,
      borderBottomWidth: 1
    },
    itemIconContainer: {
      backgroundColor: AppColor.bottomColor,
      height: 50,
      width: 50,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemIcon: {
      flex: 1,
      width: '70%',
      height: '70%',
      resizeMode: 'contain'
    }
  });

  return (
    <View style={[AppStyles.container, styles.container]}>
      {station && (
        <>
          <View style={{ flex: 1, backgroundColor: AppColor.background }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 40,
                marginBottom: '50%'
              }}
            >
              <TextSubTitle title="Votre panier" style={{ marginTop: 20 }} />

              <FloatingNormalCard
                style={{ width: '100%', paddingVertical: 30, paddingLeft: 30, marginTop: 30 }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20
                  }}
                >
                  <View style={styles.itemIconContainer}>
                    <Image style={styles.itemIcon} source={AppIcon.images.station_img} />
                  </View>
                  <Text
                    style={{
                      fontSize: AppStyles.fontSize.content,
                      fontWeight: '500',
                      color: AppColor.text,
                      marginLeft: 10,
                      width: '70%'
                    }}
                  >
                    {station.coordinates.address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    marginLeft: 10
                  }}
                >
                  <Icon name="flow-branch" size={28} color={AppColor.text} />
                  <Text
                    style={{
                      fontSize: AppStyles.fontSize.content,
                      color: AppColor.text,
                      marginLeft: 10
                    }}
                  >
                    {station.properties.plugTypes}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    marginLeft: 10
                  }}
                >
                  <Icon name="flash" size={28} color={AppColor.text} />
                  <Text
                    style={{
                      fontSize: AppStyles.fontSize.content,
                      color: AppColor.text,
                      marginLeft: 10
                    }}
                  >
                    {station.properties.maxPower} kWh
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10
                  }}
                >
                  <Icon name="credit" size={28} color={AppColor.text} />
                  <Text
                    style={{
                      fontSize: AppStyles.fontSize.content,
                      color: AppColor.text,
                      marginLeft: 10
                    }}
                  >
                    {slot.price} € ({slot.pricePerMin} € / minute)
                  </Text>
                </View>
              </FloatingNormalCard>

              <Separator style={{ marginTop: 20 }} />
            </View>
          </View>

          <View
            style={{
              backgroundColor: AppColor.bottomColor,
              borderTopColor: AppColor.separator,
              borderTopWidth: 1,
              height: '10%',
              width: '100%',
              paddingTop: 4
            }}
          >
            <ButtonConditional
              title={'Procéder au paiement'}
              onPress={() => navigation.navigate('Checkout', { slot, station })}
              isEnabled={true}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default Panier;
