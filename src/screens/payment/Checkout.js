import React, { useState } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Backend from '../../db/Backend';
import { showMessage } from 'react-native-flash-message';
import serviceAccessToken from '../../db/AccessToken';
import { useFocusEffect } from '@react-navigation/native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import {
  ButtonCommon,
  ButtonConditional,
  InputField,
  Separator,
  TextSubTitle
} from '../../components';
import { AppStyles, useTheme, AppIcon } from '../../AppStyles';

function Checkout({ navigation, route }) {
  const { AppColor } = useTheme();
  const slot = route.params.slot;
  const station = route.params.station;
  const [profile, setProfile] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [price, setPrice] = useState(slot.price);

  console.log('slot');
  console.log(slot);
  const getProfile = async () => {
    const response = await Backend.me();
    console.log(response);
    if (response.status === 200) {
      setProfile(response.data);
      showMessage({
        message: `Balance récupéré avec succès`,
        type: 'success',
        backgroundColor: AppColor.pulsive
      });
    } else {
      showMessage({
        message: 'Impossible de récupérer la balance',
        type: 'error',
        backgroundColor: AppColor.error
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const checkPromoCodeSuccess = (input) => {
    if (input == 'PLSV10') {
      setPromoCode(0.1);
      setPrice(slot.price - slot.price * 0.1);
      return 'Code promo appliqué';
    }
    if (input == 'PLSV20') {
      setPromoCode(0.2);
      setPrice(slot.price - slot.price * 0.2);
      return 'Code promo appliqué';
    }
    return false;
  };
  const checkPromoCodeError = (input) => {
    if (input != 'PLSV10' && input != 'PLSV20') {
      setPromoCode(null);
      setPrice(slot.price);
      return 'Code promo invalide';
    }
    return false;
  };

  const onPressBuy = async () => {
    const { data, status } = await Backend.createReservationRequest({
      slotId: slot.slotId,
      price: price * 100
    });
    if (status === 200) {
      showMessage({
        duration: 4000,
        message: `Demande de réservation créée avec succès !`,
        description: 'La réservation sera sur votre calendrier après acceptation du propriétaire.',
        type: 'success',
        backgroundColor: AppColor.pulsive
      });
      navigation.navigate('Planning');
    } else {
      showMessage({
        duration: 4000,
        message: `Impossible de réserver le créneau !`,
        type: 'error',
        backgroundColor: AppColor.error
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[AppStyles.container, { backgroundColor: AppColor.background }]}>
        <TextSubTitle title="Demande de réservation" style={{ paddingLeft: 70, paddingTop: 20 }} />

        <View
          style={{
            flex: 1,
            marginHorizontal: 25,
            paddingTop: 40,
            flexDirection: 'row'
          }}
        >
          <Image
            source={AppIcon.images.stationPrivate}
            style={{
              width: 125,
              height: 125,
              borderRadius: 10
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              paddingLeft: 15,
              justifyContent: 'space-between',
              width: '60%'
            }}
          >
            <View>
              <Text style={{ color: AppColor.subText, marginBottom: 10, fontWeight: '300' }}>
                Information de la borne:
              </Text>
              <TextSubTitle
                title={station.coordinates.address}
                style={{ fontSize: AppStyles.fontSize.content }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              {station.rates.length > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconAwesome name="star" size={16} color={AppColor.text} />
                  <Text
                    style={{
                      marginLeft: 5,
                      marginRight: 3,
                      color: AppColor.text
                    }}
                  >
                    {station.rate}
                  </Text>
                  <Text
                    style={{
                      color: AppColor.subText,
                      fontWeight: '300'
                    }}
                  >
                    ({station.rates.length})
                  </Text>
                </View>
              )}
              {station.rate > 4.5 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: AppColor.text, fontWeight: '500' }}> · </Text>
                  <Icon name="price-ribbon" size={16} color={AppColor.text} />
                  <Text style={{ color: AppColor.text }}> Superborne</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={{ height: 10, backgroundColor: AppColor.bottomColor, marginVertical: 20 }} />

        <View
          style={{
            flex: 1,
            marginHorizontal: 25
          }}
        >
          <TextSubTitle title="Votre réservation" />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}
          >
            <TextSubTitle title="Date:" style={{ fontSize: AppStyles.fontSize.content }} />
            <Text style={{ color: AppColor.subText, fontWeight: '300' }}>{slot?.date}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}
          >
            <TextSubTitle title="Horaire:" style={{ fontSize: AppStyles.fontSize.content }} />
            <Text style={{ color: AppColor.subText, fontWeight: '300' }}>{slot?.Hour}</Text>
          </View>
        </View>

        <View style={{ height: 10, backgroundColor: AppColor.bottomColor, marginVertical: 20 }} />

        <View
          style={{
            flex: 1,
            marginHorizontal: 25
          }}
        >
          <TextSubTitle title="Vous avez une promotion ?" />
          <View style={{ marginTop: 20 }}>
            <InputField
              label="Code promo"
              errorCheck={checkPromoCodeError}
              successCheck={checkPromoCodeSuccess}
              subText="Entrez un code de réduction valide"
              setValue={setPromoCode}
            />
          </View>
        </View>

        <View style={{ height: 10, backgroundColor: AppColor.bottomColor, marginVertical: 20 }} />

        <View
          style={{
            flex: 1,
            marginHorizontal: 25
          }}
        >
          <TextSubTitle title="Détail du prix" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}
          >
            <TextSubTitle
              title={slot.pricePerMin + ' € x ' + slot.nbMins + ' minutes'}
              style={{ fontSize: AppStyles.fontSize.content, fontWeight: '300' }}
            />
            <TextSubTitle
              title={slot.price + ' €'}
              style={{ fontSize: AppStyles.fontSize.content, fontWeight: '300' }}
            />
          </View>
          {promoCode && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10
              }}
            >
              <TextSubTitle
                title="Réduction"
                style={{ fontSize: AppStyles.fontSize.content, fontWeight: '300' }}
              />
              <TextSubTitle
                title={promoCode * 100 + '%'}
                style={{ fontSize: AppStyles.fontSize.content, fontWeight: '300' }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10
            }}
          >
            <TextSubTitle
              title="Taxes"
              style={{ fontSize: AppStyles.fontSize.content, fontWeight: '300' }}
            />
            <TextSubTitle
              title="0.0 €"
              style={{ fontSize: AppStyles.fontSize.content, fontWeight: '300' }}
            />
          </View>
          <Separator style={{ marginTop: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}
          >
            <TextSubTitle title="Total(EUR)" style={{ fontSize: AppStyles.fontSize.content }} />
            <TextSubTitle title={price + ' €'} style={{ fontSize: AppStyles.fontSize.content }} />
          </View>
        </View>

        <View style={{ height: 10, backgroundColor: AppColor.bottomColor, marginVertical: 20 }} />
        <View
          style={{
            flex: 1,
            marginHorizontal: 25
          }}
        >
          <TextSubTitle title="Votre moyen de paiement" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}
          >
            <TextSubTitle
              title="Porte-feuille intégré:"
              style={{ fontSize: AppStyles.fontSize.content }}
            />
            <TextSubTitle
              title={(profile?.balance ? profile.balance / 100 : 0) + '€'}
              style={{ fontSize: AppStyles.fontSize.content }}
            />
          </View>

          <ButtonCommon
            title="Ajouter de l'argent"
            style={{ marginLeft: 0, marginVertical: 20 }}
            onPress={() => {
              navigation.navigate('PaymentUICustomScreen');
            }}
          />
        </View>

        <View style={{ height: 10, backgroundColor: AppColor.bottomColor, marginVertical: 20 }} />

        <View
          style={{
            flex: 1,
            marginHorizontal: 25
          }}
        >
          <TextSubTitle title="Règles de base" style={{ marginBottom: 20 }} />
          <TextSubTitle
            title="En cliquant sur le bouton pour passer votre commande, vous acceptez le Contrat sur les services de Pulsive France SAS(RCS 841 983 828).
            Lors de la commande, l’installation automatique d’un cookie sur le logiciel de navigation de l’Utilisateur peut survenir.
            Les cookies correspondent à de petits fichiers déposés temporairement sur le disque dur de l’ordinateur de l’Utilisateur.
            Ces cookies sont nécessaires pour assurer l’accessibilité et la navigation sur le site.
            Ces fichiers ne comportent pas d’informations personnelles et ne peuvent pas être utilisés pour l’identification d’une personne."
            style={{ fontSize: AppStyles.fontSize.content, marginBottom: 20 }}
          />
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
        <ButtonConditional
          title={'Procéder au paiement'}
          onPress={() => onPressBuy()}
          isEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
}

export default Checkout;
