import Button from 'react-native-button';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';

const OwnerRatingScreen = ({ route, navigation }) => {
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [rate, setRate] = useState([false, false, false, false, false]);
  const predefinedMessages = ['Friendly and polite', 'Unavailable', 'His station does not work'];
  const [selectedPredefinedMessage, setSelectedPredefinedMessage] = useState(-1);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loadingText, setLoadingText] = useState('Uploading notation...');

  const { ownerId } = route.params;

  useEffect(() => {
    if (rate.indexOf(true) !== -1) {
      setSubmitButtonIsDisabled(false);
    }
  }, [rate]);

  useEffect(() => {
    if (successModalIsOpen) {
      setTimeout(closeSuccessModal, 2000);
    }
  }, [successModalIsOpen]);

  const submitRating = async () => {
    setLoadingModalIsOpen(true);
    setErrorMessage('');
    const res = await api.send('POST', '/api/v1/user/rate', {
      input: {
        userId: ownerId,
        rate: rate.lastIndexOf(true) + 1,
        creationDate: new Date(),
        comment: message
      }
    });
    if (res.status === -1) {
      setErrorMessage('Failed to create rating. Please try again later');
      setLoadingModalIsOpen(false);
    } else {
      setLoadingModalIsOpen(false);
      setSubmitButtonIsDisabled(true);
      setSuccessModalIsOpen(true);
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon
              name="arrow-left"
              size={20}
              color="white"
              onPress={() => navigation.goBack()}
            ></Icon>
            <Text style={styles.title}>Rate station</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {errorMessage.length > 0 && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}
          <View style={styles.starsContainer}>
            {rate.map((selected, index) => (
              <Icon
                name="star"
                size={35}
                color={selected ? 'orange' : 'grey'}
                onPress={() => setRate([...rate.fill(true, 0, index + 1).fill(false, index + 1)])}
              />
            ))}
          </View>
          <View style={styles.predefinedMessagesContainer}>
            {predefinedMessages.map((message, index) => (
              <Button
                key={index}
                style={{
                  ...styles.predefinedMessageButton,
                  backgroundColor: index === selectedPredefinedMessage ? 'lightgrey' : 'white'
                }}
                onPress={() => {
                  if (index === selectedPredefinedMessage) {
                    setMessage('');
                    setSelectedPredefinedMessage(-1);
                  } else {
                    setMessage(message);
                    setSelectedPredefinedMessage(index === selectedPredefinedMessage ? -1 : index);
                  }
                }}
              >
                {message}
              </Button>
            ))}
          </View>
          <TextInput
            style={styles.body}
            multiline
            numberOfLines={5}
            onChangeText={(text) => {
              setSelectedPredefinedMessage(-1);
              setMessage(text);
            }}
            value={message}
            placeholder="Your comment (optional)"
          ></TextInput>
          <View style={styles.buttonContainer}>
            <Button
              style={{
                ...styles.submitButton,
                backgroundColor: submitButtonIsDisabled ? 'grey' : AppStyles.color.pulsive
              }}
              disabled={submitButtonIsDisabled}
              onPress={submitRating}
            >
              Save
            </Button>
          </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            transparent
            animationType="slide"
            visible={successModalIsOpen}
            onRequestClose={closeSuccessModal}
          >
            <View style={styles.modalView}>
              <Text style={styles.sucessTitle}>Thank you for your help !</Text>
              <Icon name="check" size={50} color={AppStyles.color.main} />
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            transparent
            animationType="fade"
            visible={loadingModalIsOpen}
            onRequestClose={() => setLoadingModalIsOpen(false)}
          >
            <View style={styles.modalView}>
              <ActivityIndicator size="large" />
              <Text style={styles.sucessTitle}>{loadingText}</Text>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: AppStyles.color.main
  },
  headerContent: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20
  },
  ratingContainer: {
    marginTop: 50,
    padding: 15
  },
  starsContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  body: {
    borderWidth: 0.5
  },
  submitButton: {
    color: 'white',
    width: AppStyles.buttonWidth,
    borderRadius: 25,
    padding: 10
  },
  buttonContainer: {
    marginTop: '70%',
    marginLeft: '25%'
  },
  predefinedMessageButton: {
    color: 'grey',
    borderWidth: 0.2,
    width: 100,
    borderRadius: 2,
    padding: 5
  },
  predefinedMessagesContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 30,
    justifyContent: 'space-evenly'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    marginTop: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
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
  sucessTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15
  },
  secondaryButton: {
    backgroundColor: 'lightblue',
    marginTop: 10,
    borderRadius: 5,
    padding: 10
  },
  errorMessageContainer: {
    backgroundColor: '#FF8787',
    borderRadius: 5,
    padding: 10,
    marginBottom: 30
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default OwnerRatingScreen;
