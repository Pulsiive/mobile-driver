import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppIcon, useTheme } from '../../AppStyles';
import Backend from '../../db/Backend';
import { showMessage } from 'react-native-flash-message';

function Checkout({ navigation, route }) {
  const { AppColor } = useTheme();
  const slot = route.params.slot;
  const station = route.params.station;
  const [profile, setProfile] = useState(null);
  const [paymentType, setPaymentType] = useState('stripe');

  useEffect(() => {
    const getProfile = async () => {
      const response = await Backend.me();

      if (response.status === 200) {
        setProfile(response.data);
        showMessage({
          message: `Balance récupéré avec succès`,
          type: 'success',
          backgroundColor: 'green'
        });
      } else {
        showMessage({
          message: 'Impossible de récupérer la balance',
          type: 'error',
          backgroundColor: 'red'
        });
      }
    };

    getProfile();
  }, []);

  const styles = StyleSheet.create({
    activeBtn: {
      borderColor: 'green',
      borderWidth: 2,
      borderRadius: 8
    },
    header: {
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: 30,
      top: 5 + '%',
      color: '#2F313E'
    },
    reception: {
      height: 5.8 + '%',
      top: 50 + '%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    history2: {
      height: 9 + '%',
      top: 40 + '%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    test: {
      marginTop: 5 + '%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    word: {
      position: 'absolute',
      top: 20.4 + '%',
      fontWeight: 'bold',
      color: '#2F313E'
    },
    recent: {
      position: 'absolute',
      top: 35.3 + '%',
      fontWeight: 'bold',
      color: '#2F313E'
    },
    container: {
      flex: 1,
      top: 47 + '%'
    },
    content: {
      backgroundColor: AppColor.background,
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 4,
      borderColor: AppColor.border
    },
    contentTitle: {
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 12,
      color: '#2F313E',
      marginLeft: 'auto'
    },
    view: {
      justifyContent: 'flex-end',
      margin: 0
    },
    appButtonContainer: {
      color: '#ffffff',
      elevation: 8,
      backgroundColor: '#009688',
      borderRadius: 10,
      height: 6 + '%',
      top: 76 + '%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10 + '%',
      marginRight: 15.5 + '%'
    },
    ModalButton: {
      color: '#ffffff',
      elevation: 8,
      backgroundColor: 'black',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 100 + '%',
      display: 'flex',
      alignItems: 'center',
      marginTop: 3 + '%'
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: AppColor.background }}>
        <View style={styles.content}>
          <Text style={{ color: '#2F313E', fontSize: 30, fontWeight: 'bold' }}>Paiement</Text>

          <View
            style={{
              marginLeft: -10 + '%',
              marginTop: 7 + '%',
              marginBottom: 2 + '%',
              height: 10,
              width: 200 + '%',
              backgroundColor: '#f2f2f2'
            }}
          ></View>

          <TouchableOpacity style={styles.test}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{ flex: 1, width: 90 + '%', height: 90 + '%', resizeMode: 'contain' }}
                source={AppIcon.images.station3}
              ></Image>
            </View>
            <View style={{ marginLeft: 5 + '%', left: 30 + '%', width: 80 + '%' }}>
              <Text style={{ color: 'black', fontSize: 20 }}>
                Location Chargeur {station?.properties?.plugTypes[0] ?? 'non défini'}
              </Text>
              <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 12 }}>
                User - propriétaire
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 7 + '%',
              marginBottom: 2 + '%',
              height: 1,
              width: 100 + '%',
              backgroundColor: '#d9d9d9'
            }}
          ></View>

          <TouchableOpacity style={styles.test}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{ flex: 1, width: 70 + '%', height: 70 + '%', resizeMode: 'contain' }}
                source={AppIcon.images.time}
              ></Image>
            </View>
            <View style={{ marginLeft: 5 + '%', left: 30 + '%', width: 80 + '%' }}>
              <Text style={{ color: 'black', fontSize: 20 }}>{slot?.date}</Text>
              <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 12 }}>
                Horaire: {slot.Hour}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 7 + '%',
              marginBottom: 2 + '%',
              height: 1,
              width: 100 + '%',
              backgroundColor: '#d9d9d9'
            }}
          ></View>

          <TouchableOpacity style={styles.test}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{ flex: 1, width: 90 + '%', height: 90 + '%', resizeMode: 'contain' }}
                source={AppIcon.images.proprio}
              ></Image>
            </View>
            <View
              style={{
                borderRadius: 20,
                padding: 10,
                backgroundColor: '#f2f2f2',
                marginLeft: 5 + '%',
                left: 50 + '%',
                width: 70 + '%'
              }}
            >
              <Text style={{ color: 'black', fontSize: 16 }}>M. Mathieu Gerard</Text>
              <Text style={{ color: 'black', marginTop: 2, fontSize: 12 }}>propriétaire</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 7 + '%',
              marginBottom: 2 + '%',
              height: 1,
              width: 100 + '%',
              backgroundColor: '#d9d9d9'
            }}
          ></View>

          <TouchableOpacity style={styles.test}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{ flex: 1, width: 90 + '%', height: 90 + '%', resizeMode: 'contain' }}
                source={AppIcon.images.location}
              ></Image>
            </View>
            <View style={{ marginLeft: 5 + '%', left: 50 + '%', width: 60 + '%' }}>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                {station?.coordinates?.address}
              </Text>
              <Text style={{ color: 'grey', marginTop: 2, fontSize: 16 }}>
                {station?.coordinates?.countryCode} {station?.coordinates?.city}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginLeft: -10 + '%',
              marginTop: 7 + '%',
              marginBottom: 2 + '%',
              height: 5,
              width: 200 + '%',
              backgroundColor: 'black'
            }}
          ></View>

          <View style={{ marginTop: 5 + '%', display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'grey', fontSize: 20 }}>Sous-total</Text>
            <Text style={{ color: 'grey', fontSize: 20, marginLeft: 'auto' }}>1.00€</Text>
          </View>
          <View style={{ marginTop: 5 + '%', display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'grey', fontSize: 20 }}>Frais</Text>
            <Text style={{ color: 'grey', fontSize: 20, marginLeft: 'auto' }}>0.30€</Text>
          </View>
          <View style={{ marginTop: 5 + '%', display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>Service</Text>
            <Text style={{ color: 'grey', fontSize: 16, marginLeft: 'auto' }}>1.60€</Text>
          </View>
          <View style={{ marginTop: 5 + '%', display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>Autres</Text>
            <Text style={{ color: 'grey', fontSize: 16, marginLeft: 'auto' }}>0.10€</Text>
          </View>
          <View style={{ marginTop: 5 + '%', display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 20 }}>Total</Text>
            <Text style={{ color: 'black', fontSize: 20, marginLeft: 'auto' }}>3.00€</Text>
          </View>
          <View
            style={{
              marginLeft: -10 + '%',
              marginTop: 7 + '%',
              marginBottom: 2 + '%',
              height: 5,
              width: 200 + '%',
              backgroundColor: 'black'
            }}
          ></View>

          <Text style={{ color: 'black', fontSize: 26, marginTop: 3 + '%' }}> Paiement </Text>

          <TouchableOpacity
            style={[styles.test, paymentType === 'stripe' && styles.activeBtn]}
            onPress={() => {
              setPaymentType('stripe');
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{ flex: 1, width: 90 + '%', height: 90 + '%', resizeMode: 'contain' }}
                source={AppIcon.images.visa}
              ></Image>
            </View>
            <View style={{ marginLeft: 5 + '%', left: 30 + '%', width: 80 + '%' }}>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                Paiement par carte (Stripe)
              </Text>
            </View>
          </TouchableOpacity>

          {
            <TouchableOpacity
              style={[styles.test, paymentType === 'balance' && styles.activeBtn]}
              onPress={() => {
                setPaymentType('balance');
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{ flex: 1, width: 80 + '%', height: 80 + '%', resizeMode: 'contain' }}
                  source={AppIcon.images.logo}
                ></Image>
              </View>
              <View style={{ marginLeft: 5 + '%', left: 30 + '%', width: 80 + '%' }}>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                  Porte-feuille intégré ({profile?.balance ? profile.balance / 100 : 0}€)
                </Text>
              </View>
            </TouchableOpacity>
          }

          <View
            style={{
              marginTop: 5 + '%',
              marginBottom: 2 + '%',
              height: 1,
              width: 100 + '%',
              backgroundColor: 'black'
            }}
          ></View>

          <Text>
            <Text style={{ fontWeight: 'bold' }}>Contrats sur les services</Text> En cliquant sur le
            bouton pour passer votre commande, vous acceptez le{' '}
            <Text style={{ color: 'green', fontWeight: 'bold' }}>
              Contrat sur les services de Pulsiive France SAS(RCS 841 983 828)
            </Text>
          </Text>
          <Text>
            Lors de la commande, l’installation automatique d’un cookie sur le logiciel de
            navigation de l’Utilisateur peut survenir. Les cookies correspondent à de petits
            fichiers déposés temporairement sur le disque dur de l’ordinateur de l’Utilisateur. Ces
            cookies sont nécessaires pour assurer l’accessibilité et la navigation sur le site. Ces
            fichiers ne comportent pas d’informations personnelles et ne peuvent pas être utilisés
            pour l’identification d’une personne.
          </Text>

          <View
            style={{
              marginTop: 5 + '%',
              marginBottom: 2 + '%',
              height: 1,
              width: 100 + '%',
              backgroundColor: 'black'
            }}
          ></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={async () => {
              if (paymentType === 'stripe')
                navigation.navigate('PaymentUICustomScreen', { slot_id: slot.slotId });
              if (paymentType === 'balance') {
                const response = await Backend.submitPaymentBalance();
                if (response.status === 200) {
                  // const {data, status} = await Backend.bookSlot(slot.slotId); //TODO: create reservation request instead
                  const { data, status } = await Backend.createReservationRequest({
                    slotId: slot.slotId,
                    price: 20
                  });
                  if (status === 200) {
                    showMessage({
                      duration: 2000,
                      message: `Payment effectué avec succès !`,
                      description: 'Vous allez être rediriger dans quelques secondes',
                      type: 'success',
                      backgroundColor: 'green'
                    });
                    showMessage({
                      duration: 4000,
                      message: `Demande de réservation crée avec succès !`,
                      description:
                        'La réservation sera sur votre calendrier après acceptation du propriétaire.',
                      type: 'success',
                      backgroundColor: 'green'
                    });
                    navigation.navigate('Planning');
                  } else {
                    showMessage({
                      duration: 4000,
                      message: `Impossible de réserver le créneau !`,
                      type: 'error',
                      backgroundColor: 'red'
                    });
                  }
                } else {
                  showMessage({
                    duration: 4000,
                    message: `Balance insuffisante (${
                      profile?.balance ? profile.balance / 100 : 0
                    }€)`,
                    type: 'error',
                    backgroundColor: 'red'
                  });
                }
              }
            }}
            style={{
              color: '#ffffff',
              elevation: 8,
              backgroundColor: 'black',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 12,
              width: 100 + '%',
              display: 'flex',
              alignItems: 'center',
              marginTop: 5 + '%'
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 20 }}> Payer </Text>
          </TouchableOpacity>

          <View
            style={{ marginTop: 2 + '%', height: 1, width: 100 + '%', backgroundColor: 'black' }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Checkout;
