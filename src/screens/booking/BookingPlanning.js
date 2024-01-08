import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Text,
  SafeAreaView,
  Pressable,
  Modal
} from 'react-native';

import DateSlider from './DateSlider';
import {AppIcon, AppStyles} from '../../AppStyles';
import { useTheme } from '../../AppStyles';
import * as Animatable from 'react-native-animatable';

function BookingPlanning({ navigation, route }) {
  const { AppColor } = useTheme();
  const { stationId } = route.params;
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [slot, setSlot] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: AppColor.background }}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{backgroundColor: AppColor.background, ...styles.modalView}}>
            <Text style={{color: AppColor.title, ...styles.modalText}}>Êtes-vous sur de vouloir réserver ce créneau ?</Text>
            <View style={styles.groupButton}>
              <TouchableOpacity
                  style={{backgroundColor: AppColor.private, ...styles.button}}
                  onPress={() => {
                    setModalVisible(false);
                    setSlot(null);
                  }}
              >
                <Text style={{color: 'white', ...styles.textStyle}}>Annuler</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
                setModalVisible(false);

                if (slot) {
                  navigation.navigate('Panier', { slot, stationId });
                  setSlot(null);
                }
              }}
            >
              <Text style={{color: 'white', ...styles.textStyle}}>Je réserve</Text>
            </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.welcomeContainer}>
        <View style={styles.card}>
          {/* a changer */}
          <Text style={{color: AppColor.title, ...styles.first}}>Borne de warmup</Text>
          <Text style={{color: AppColor.title, ...styles.second}}>Voyons voir le planning d'aujourd'hui !</Text>
          <TouchableOpacity style={styles.profilButton} onPress={() => navigation.navigate('Home')}>
            <Image
              animation="bounce"
              iterationCount="infinite"
              style={styles.profil}
              source={{
                uri: 'https://image.shutterstock.com/image-photo/photo-handsome-nice-guy-getting-260nw-1478654612.jpg'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <DateSlider
        date={date}
        onChange={(newDate) => setDate(newDate)}
        stationId={stationId}
        setModalVisible={setModalVisible}
        slot={slot}
        setSlot={setSlot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding:30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  groupButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    width: 120,
    height: 30,
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#7FCB2B'
  },
  buttonCancel: {
    backgroundColor: 'red'
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    paddingBottom: 35,
    paddingTop:10,
    fontSize: 15,
    textAlign: 'center'
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
    fontWeight: '900',
    width: 326,
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: 0
  },
  second: {
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
  },
  welcomeContainer: {
    position: 'absolute',
    top: 12 + '%',
    left: 4 + '%',
    width: '91%',
    alignItems: 'center' // Center the card horizontally
  },
  card: {
    // backgroundColor: 'black',
    // borderRadius: 10,
    width: '95%',
    // padding: 10,
    // shadowColor: 'white',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 10,
    // alignItems: 'center'
  }
});

export default BookingPlanning;
