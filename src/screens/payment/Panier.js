import React, { useEffect, useState, useRef } from 'react';
import {View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native';

import Modal from 'react-native-modal';

import { AppIcon } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';
import * as Animatable from 'react-native-animatable';

function Panier({ navigation, route }) {
  const slot = route.params.slot;
  const stationId = route.params.stationId;
  const [isModalVisible, setModalVisible] = useState(false);
  const [station, setStation] = useState(null);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    const getStation = async () => {
      const response = await Backend.getStation(stationId);

      if (response.status === 200) {
        setStation(response.data.station);
        console.log(station);
        showMessage({
          message: `Station récupéré avec succès`,
          type: 'success',
          backgroundColor: 'green'
        });
      } else {
        showMessage({
          message: 'Impossible de récupérer la station',
          type: 'error',
          backgroundColor: 'red'
        });
      }
    };

    getStation();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePromoCodeChange = (text) => {
    setPromoCode(text);
  };

  // Additional handler for applying the promo code
  const applyPromoCode = () => {
    // Perform the necessary action with the promo code (e.g., validate, calculate discounts, etc.)
    // For demonstration purposes, we'll just log the promo code value here.
    console.log('Promo code applied:', promoCode);
    // You can implement the logic to apply the promo code as needed.
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Dimensions.get("window").height * 0.05}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginRight: 'auto', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems:'center'}}
          onPress={() => navigation.goBack()}
        >
          <Image style={{ width: 20, height: 20 }} source={AppIcon.images.back}></Image>
        </TouchableOpacity>

        <Text style={styles.header}> Paniers </Text>

        <Animatable.View
          animation="jello"
          iterationCount="infinite"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity style={styles.itemContainer} onPress={toggleModal}>
            <View style={styles.itemIconContainer}>
              <Image style={styles.itemIcon} source={AppIcon.images.station_img} />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>
                Chargeur {station?.properties?.plugTypes[0] ?? 'non défini'}
              </Text>
              <Text style={styles.itemDetail}>ID: {station?.properties?.id ?? 'non défini'}</Text>
              <Text style={styles.itemDetail}>M.Mathieu</Text>
              <Text style={styles.itemPrice}>{slot.price} € ({slot.pricePerMin} € / minute)</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        {/* The modal component */}
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={toggleModal}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Votre Commande</Text>

            {/* Order details inside the modal */}
            <TouchableOpacity style={styles.modalItemContainer} onPress={toggleModal}>
              <View style={styles.itemIconContainer}>
                <Image style={styles.itemIcon} source={AppIcon.images.checkIcon} />
              </View>
              <View style={styles.modalItemDetails}>
                <Text style={styles.itemName}>
                  Chargeur {station?.properties?.plugTypes[0] ?? 'non défini'}
                </Text>
                <Text style={styles.itemDetail}>M.Mathieu</Text>
              </View>
              <Text style={styles.itemPrice}>{slot.pricePerMin}€ / minute</Text>
            </TouchableOpacity>

            <View style={styles.horizontalLine} />
            <View style={styles.spaceAfterHorizontalLine} />

            {/* Content for Taxes, Services, and Discounts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taxes</Text>
              <Text style={styles.sectionContent}>Total taxes: 0€</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Services</Text>
              <Text style={styles.sectionContent}>Service charge: 0€</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Discounts</Text>
              <Text style={styles.sectionContent}>Promo code applied: XYZ123</Text>
              <Text style={styles.sectionContent}>Discount amount: 0.00€</Text>
            </View>

            <View style={styles.promoCodeContainer}>
              <TextInput
                style={styles.promoCodeInput}
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={handlePromoCodeChange}
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyPromoCode}
                activeOpacity={0.8}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.horizontalLine} />

            {/* Subtotal */}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Sous-total</Text>
              <Text style={styles.subtotalAmount}>{slot.price} €</Text>
            </View>

            {/* Modal buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Checkout', { slot, station });
                  setModalVisible(false);
                }}
                style={styles.commanderButton}
              >
                <Text style={styles.buttonText}>Commander</Text>
              </TouchableOpacity>
            </View>

            {/* Close modal button */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal} activeOpacity={0.7}>
              <Image source={AppIcon.images.xMark} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5.5%',
  },
  backIcon: {
    width: 20,
    height: 20
  },
  header: {
    // position: 'absolute',
    fontWeight: 'bold',
    fontSize: 30,
    // top: '15%',
    color: '#2F313E'
  },
  //   itemContainer: {
  //     height: '9%',
  //     top: '40%',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  itemContainer: {
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 10, // Add border radius for rounded corners
    shadowColor: '#000', // Set shadow color
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3, // Adjust shadow opacity
    shadowRadius: 4, // Adjust shadow radius
    elevation: 10, // Android shadow elevation
    marginVertical: 10, // Add vertical margin for spacing
    padding: 16 // Add padding inside the card
  },
  itemIconContainer: {
    backgroundColor: '#f4f4f5',
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemIcon: {
    flex: 1,
    width: '70%',
    height: '70%',
    resizeMode: 'contain'
  },
  itemDetails: {
    marginLeft: 12
  },
  itemName: {
    color: 'black',
    fontSize: 18, // Ajuster la taille du texte pour le nom de l'article
    fontWeight: 'bold', // Utiliser du texte en gras pour le nom de l'article
    marginBottom: 4 // Espacement entre le nom de l'article et le détail
  },
  itemDetail: {
    color: 'grey',
    marginTop: 6
  },
  itemPrice: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  horizontalLine: {
    marginTop: 20,
    marginBottom: 3,
    height: 1,
    width: '90%',
    backgroundColor: 'black'
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: '#FFFFFF', // Blanc
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2F313E',
    textAlign: 'center'
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  modalItemDetails: {
    flex: 1,
    marginLeft: 12
  },
  newSection: {
    marginBottom: 16
  },
  newSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2F313E'
  },
  newSectionText: {
    color: '#2F313E',
    fontSize: 16
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  subtotalText: {
    color: '#2F313E',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtotalAmount: {
    color: '#2F313E',
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Pour aligner le bouton sur la droite
    marginBottom: 20
  },
  commanderButton: {
    backgroundColor: '#00A84A',
    borderRadius: 8, // Un petit arrondi pour le bouton
    paddingVertical: 10, // Ajuster la taille verticale du bouton
    paddingHorizontal: 12, // Ajuster la taille horizontale du bouton
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // Ajuster la taille du texte du bouton
    fontWeight: 'bold'
  },
  ajouterButton: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginLeft: 16,
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 10,
    position: 'absolute',
    top: '5%',
    right: '5%'
  },
  closeIcon: {
    width: 24,
    height: 24
  },
  promoCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  promoCodeInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16
  },
  applyButton: {
    marginLeft: 16,
    backgroundColor: '#00A84A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  spaceAfterHorizontalLine: {
    marginTop: 20
  },
  section: {
    marginBottom: 10 // Adjust the separation between sections
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F313E' // Text color for section titles
  },
  sectionContent: {
    fontSize: 16,
    color: '#2F313E' // Text color for section content
  }
});

export default Panier;
