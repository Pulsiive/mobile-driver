import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Comment from './comment/Comment';

import * as Animatable from 'react-native-animatable';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import {
  ButtonCommon,
  ButtonConditional,
  ButtonText,
  FloatingButton,
  ModalSwipeUp,
  Separator,
  TextTitle
} from '../../components';

import { getUser, useUserUpdate } from '../../contexts/UserContext';

import api from '../../db/Api';

const CarouselReview = ({ item, navigation }) => {
  const { AppColor } = useTheme();

  const height = Dimensions.get('screen').height * 0.325;

  return (
    <View
      style={{
        borderColor: AppColor.border,
        borderWidth: 0.8,
        borderRadius: 15,
        height: height
      }}
    >
      <Comment
        item={item}
        displayPictures={false}
        displayResponses={false}
        navigation={navigation}
      />
    </View>
  );
};

function StationInformations({ route, navigation }) {
  const { AppColor } = useTheme();

  const { station } = route.params;
  const [reviewsModalIsOpen, setReviewsModalIsOpen] = useState(false);

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

  const height = Dimensions.get('screen').height;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: AppColor.background }}>
        <Image
          source={AppIcon.images.stationInformationsModal}
          style={{ width: '100%', height: '40%', maxHeight: 200 }}
        />
        <FloatingButton
          icon="chevron-left"
          iconColor={AppColor.title}
          style={{
            top: 20,
            left: 20,
            width: 35,
            height: 35
          }}
          onPress={() => navigation.goBack()}
        />
        <FloatingButton
          icon={isFavorite ? 'heart' : 'heart-outlined'}
          iconColor={isFavorite ? AppColor.pulsive : AppColor.title}
          style={{
            top: 20,
            right: 20,
            width: 40,
            height: 40
          }}
          onPress={() => onHeartPressed()}
        />
        <View
          style={{
            height: height,
            paddingHorizontal: 20,
            marginBottom: '50%'
          }}
        >
          <TextTitle
            title={
              station.properties.isPublic
                ? station.coordinates.address
                : `Borne de ${station.owner.firstName}`
            }
            style={{ fontWeight: 'bold', marginLeft: 0 }}
          />
          {station.properties.isPublic && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {station.rates.length > 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconAwesome name="star" size={16} color={AppColor.text} />
                  <Text
                    style={{
                      fontSize: AppStyles.fontSize.normal,
                      marginHorizontal: 5,
                      color: AppColor.text
                    }}
                  >
                    {station.rate} ·
                  </Text>
                </View>
              ) : (
                <Text style={{ color: AppColor.subText }}>Aucune note ·</Text>
              )}
              {station.rates.length > 0 ? (
                <ButtonText
                  style={{ fontSize: AppStyles.fontSize.button, fontWeight: '500' }}
                  title={`${
                    station.rates.length > 1
                      ? station.rates.length + ' commentaires'
                      : '1 comentaire'
                  }`}
                  onPress={() => setReviewsModalIsOpen(true)}
                />
              ) : (
                <Text style={{ color: AppColor.subText }}> Aucun commentaire </Text>
              )}

              {station.rate > 4.5 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: AppColor.text, fontWeight: '500' }}> · </Text>
                  <Icon name="price-ribbon" size={16} color={AppColor.text} />
                  <Text style={{ color: AppColor.text }}> Superborne</Text>
                </View>
              )}
            </View>
          )}
          <Text style={{ color: AppColor.text, marginTop: 5 }}>{station.coordinates.address}</Text>

          <Separator />

          <View style={{ marginTop: 30 }}>
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
                  fontSize: AppStyles.fontSize.normal,
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
                  fontSize: AppStyles.fontSize.normal,
                  color: AppColor.text,
                  marginLeft: 10
                }}
              >
                {station.properties.maxPower} kWh
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <Icon name="credit" size={28} color={AppColor.text} />
              <Text
                style={{
                  fontSize: AppStyles.fontSize.normal,
                  color: AppColor.text,
                  marginLeft: 10
                }}
              >
                {station.properties.price} / heure
              </Text>
            </View>
          </View>

          <Separator />

          {station.properties.isPublic && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
              {station.rates.length > 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconAwesome name="star" size={26} color={AppColor.text} />
                  <Text
                    style={{
                      fontSize: AppStyles.fontSize.title,
                      fontWeight: '500',
                      marginHorizontal: 5,
                      color: AppColor.text
                    }}
                  >
                    {station.rate} ·
                  </Text>
                </View>
              ) : (
                <Text style={{ color: AppColor.subText }}>Aucune note ·</Text>
              )}
              {station.rates.length > 0 ? (
                <Text
                  style={{
                    fontSize: AppStyles.fontSize.title,
                    fontWeight: '500',
                    color: AppColor.subText
                  }}
                >
                  {station.rates.length > 1
                    ? station.rates.length + ' commentaires'
                    : '1 comentaire'}
                </Text>
              ) : (
                <Text style={{ color: AppColor.subText }}> Aucun commentaire </Text>
              )}
            </View>
          )}

          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Carousel
              layout="default"
              data={station.rates.slice(0, 5)}
              renderItem={({ item }) => <CarouselReview item={item} navigation={navigation} />}
              itemWidth={Dimensions.get('screen').width * 0.9}
              sliderWidth={Dimensions.get('screen').width}
            />
          </View>
          {station.rates.length > 0 && (
            <ButtonCommon
              title={`Voir ${
                station.rates.length > 1
                  ? 'les ' + station.rates.length + ' commentaires'
                  : 'le comentaire'
              }`}
              onPress={() => setReviewsModalIsOpen(true)}
            />
          )}
        </View>
      </ScrollView>
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
        <Animatable.View animation="pulse" iterationCount={3}>
          <ButtonConditional
            title={
              station.properties.isPublic
                ? station.rates.length == 0
                  ? 'Soyez le premier à noter cette borne'
                  : 'Noter la borne'
                : 'Réserver la borne'
            }
            onPress={() =>
              navigation.navigate(
                station.properties.isPublic ? 'StationRating' : 'BookingPlanning',
                {
                  stationId: station.id
                }
              )
            }
            isEnabled={true}
          />
        </Animatable.View>

        <ModalSwipeUp
          title="Commentaire"
          visible={reviewsModalIsOpen}
          onClose={() => setReviewsModalIsOpen(false)}
          closeButton={true}
        >
          <View style={{ flex: 1 }}>
            {station.rates.map((item) => (
              <View>
                <View style={{ maxHeight: 300 }} key={item.id}>
                  <Comment
                    key={item.id}
                    item={item}
                    displayPictures
                    displayResponses
                    navigation={navigation}
                  />
                </View>
                <Separator />
              </View>
            ))}
          </View>
        </ModalSwipeUp>
      </View>
    </SafeAreaView>
  );
}

export default StationInformations;
