import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { Pressable, Text, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { ModalSwipeUp, ProfilePicture, ButtonText } from '../../components';
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';

const InProgressReservationModal = ({ isOpen, onClose, onFinish, reservation, navigation }) => {
  const diff = (new Date(reservation.closesAt).getTime() - new Date().getTime()) / 1000;
  const timeout = diff > 0 ? diff : 0;

  const driverRating =
    reservation.owner.ratings.length > 0
      ? (
          reservation.owner.ratings.reduce((sum, nextValue) => sum + nextValue, 0) /
          reservation.owner.ratings.length
        ).toFixed(2)
      : 0;

  const handleTimeoutFinish = () => {
    showMessage({
      message: `Votre réservation chez ${reservation.owner.firstName} est terminée`,
      autoHide: false,
      hideOnPress: true,
      type: 'info'
    });
    onFinish();
  };

  const navigateToStationInformations = async () => {
    const station = await Backend.getStation(reservation.stationProperties.stationId);
    if (station.status !== -1) {
      navigation.navigate('StationInformations', {
        station: { ...station.data.station, owner: reservation.owner }
      });
    }
  };

  return (
    <ModalSwipeUp
      visible={isOpen}
      onClose={onClose}
      title={`Réservation en cours chez \n${reservation.owner.firstName}`}
      closeButton
      style={{ height: '65%' }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 50,
          marginLeft: 20
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Pressable
            onPress={() =>
              navigation.navigate('Owner', {
                imageUri: reservation.owner.profilePictureId,
                name: `${reservation.owner.firstName} ${reservation.owner.lastName}`,
                userId: reservation.owner.id
              })
            }
          >
            <ProfilePicture
              width={75}
              height={75}
              borderRadius={25}
              profilePictureId={reservation.owner.profilePictureId}
            />
          </Pressable>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ color: 'black', fontSize: 20, marginBottom: 5, fontWeight: '500' }}>
            {reservation.owner.firstName} {reservation.owner.lastName}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Icon name="star" size={20} color={'black'} />
            <Text style={{ color: 'black', fontSize: 18, marginLeft: 5 }}>
              {0 === 0 ? 'No rating' : driverRating}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="location-pin" size={20} color="black" />
            <ButtonText
              style={{ marginLeft: 5, fontSize: 18, color: 'black' }}
              title={`${reservation.address}, ${reservation.city}`}
              onPress={navigateToStationInformations}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 3 }}>
            <FontAwesomeIcon name="euro" size={20} color="black" />
            <Text style={{ marginLeft: 10, fontSize: 18, color: 'black' }}>
              {reservation.price}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 50 }}>
        <CountDown
          until={timeout}
          onFinish={handleTimeoutFinish}
          size={30}
          digitTxtStyle={{ color: '#80cc2c' }}
          digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#80cc2c' }}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{ h: '', m: '', s: '' }}
          showSeparator
          separatorStyle={{ color: '#80cc2c' }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 10
        }}
      >
        <Pressable
          style={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 15,
            marginRight: 10
          }}
          onPress={() =>
            navigation.navigate('Message', {
              imageUri: reservation.owner.profilePictureId,
              name: `${reservation.owner.firstName} ${reservation.owner.lastName}`,
              receiverId: reservation.owner.id
            })
          }
        >
          <Text
            style={{
              textTransform: 'uppercase',
              color: 'white',
              fontSize: 15,
              textAlign: 'center'
            }}
          >
            Contacter le proprétaire
          </Text>
        </Pressable>
      </View>
    </ModalSwipeUp>
  );
};

export default InProgressReservationModal;
