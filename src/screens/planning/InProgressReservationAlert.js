import React from 'react';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { FloatingNormalCard, TextSubTitle } from '../../components';

const InProgressReservationAlert = ({ reservation, onClick }) => {
  return (
    <FloatingNormalCard style={{ backgroundColor: '#edf7ed', elevation: 0 }}>
      <Pressable onPress={onClick}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <TextSubTitle
            style={{ fontSize: 18, color: '#527354' }}
            title={`Réservation en cours chez\n ${reservation.owner.firstName}`}
          />
          <Icon name="arrow-right" size={30} color="#4a8f4d" />
        </View>
      </Pressable>
    </FloatingNormalCard>
  );
};

export default InProgressReservationAlert;
