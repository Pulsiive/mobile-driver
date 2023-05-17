import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableHighlight, Text, SafeAreaView, Pressable, Modal } from 'react-native';

import DateSlider from './DateSlider';
import { AppIcon } from '../../AppStyles';

function BookingPlanning({ navigation, route }) {
  const { stationId } = route.params;
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [slot, setSlot] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.group}>
        <Image source={AppIcon.images.logo} style={styles.logo} />
        <Image source={AppIcon.images.Pulsiive} style={styles.Pulsiive} />
        <TouchableHighlight style={styles.avisButton} onPress={() => navigation.navigate('Avis')}>
          <Image style={styles.avis} source={AppIcon.images.avis}></Image>
        </TouchableHighlight>
        <Image style={styles.notif} source={AppIcon.images.notif}></Image>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Êtes-vous sur de vouloir réserver ce créneau ?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
                setModalVisible(false);

                if (slot) {
                  navigation.navigate('Panier', {slot, stationId});
                  setSlot(null);
                }
              }}>
              <Text style={styles.textStyle}>Je réserve</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => {
                setModalVisible(false);
                setSlot(null);
              }}>
              <Text style={styles.textStyle}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.welcome}>
        <Text style={styles.first}>Station {stationId}</Text>
        <Text style={styles.second}>Voyons voir le planning d'aujourd'hui !</Text>
        <TouchableHighlight
          style={styles.profilButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={styles.profil}
            source={{
              uri: 'https://image.shutterstock.com/image-photo/photo-handsome-nice-guy-getting-260nw-1478654612.jpg'
            }}
          ></Image>
        </TouchableHighlight>
      </View>
      <DateSlider date={date} onChange={(newDate) => setDate(newDate)} stationId={stationId} setModalVisible={setModalVisible} slot={slot} setSlot={setSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#7FCB2B',
  },
  buttonCancel: {
    marginTop: 10,
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  safe: {
    flex: 1,
    left: 3 + '%',
    marginTop: 10 + '%'
  },
  welcome: {
    position: 'absolute',
    top: 12 + '%',
    left: 4 + '%',
    width: 91 + '%'
  },
  first: {
    color: 'white',
    fontWeight: '900',
    width: 326,
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: 0
  },
  second: {
    color: 'white',
    fontWeight: '500',
    width: 326,
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: 15
  },
  Line2: {
    width: 240,
    height: 1,
    position: 'absolute',
    top: 35 + '%',
    backgroundColor: 'grey'
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'cover'
  },
  Pulsiive: {
    width: 80,
    height: 27,
    resizeMode: 'cover',
    marginLeft: 12
  },
  group: {
    position: 'absolute',
    top: 6 + '%',
    left: 4 + '%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'flex-start',
    width: 91 + '%'
  },
  addSlotButton: {
    position: 'absolute',
    right: 18 + '%',
    backgroundColor: 'lightgrey',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#7FCB2B'
  },
  profilButton: {
    position: 'absolute',
    right: 0
  },
  profil: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#7FCB2B'
  },
  avis: {
    height: 20,
    width: 20
  },
  avisButton: {
    position: 'absolute',
    right: 0
  },
  notif: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 40
  }
});

export default BookingPlanning;
