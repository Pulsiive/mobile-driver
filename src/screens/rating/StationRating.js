import Button from 'react-native-button';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FormData from 'form-data';

import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';

const StationRatingScreen = ({ route, navigation }) => {
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [rate, setRate] = useState([false, false, false, false, false]);
  const predefinedMessages = ['Works great', 'Unavailable', 'Broken'];
  const [selectedPredefinedMessage, setSelectedPredefinedMessage] = useState(-1);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loadingText, setLoadingText] = useState('Uploading notation...');

  const [pictures, setPictures] = useState([]);

  const { stationId } = route.params;

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
    const res = await api.send('POST', '/api/v1/station/rate', {
      rating: {
        //id: stationId,
        id: '8b7bdb5e-b6f4-4c9e-ad9c-603b2b44bcd4',
        rate: rate.lastIndexOf(true) + 1,
        date: new Date(),
        comment: message
      }
    });
    if (res.status === -1) {
      setErrorMessage('Failed to create rating. Please try again later');
      setLoadingModalIsOpen(false);
    } else {
      if (pictures.length > 0) {
        const formData = new FormData();
        pictures.forEach((picture) => {
          formData.append('file', { uri: picture.uri, type: 'image/jpeg', name: picture.name });
        });
        formData.append('commentId', res.data.rate.id);
        setLoadingText('Uploading attached pictures...');
        const picres = await api.send('POST', '/api/v1/picture', formData, true, true);
        setLoadingModalIsOpen(false);
        if (picres.status === -1) {
          setErrorMessage('Failed to upload pictures. Your comment was successfully saved');
        } else {
          setSubmitButtonIsDisabled(true);
          setSuccessModalIsOpen(true);
        }
      } else {
        setLoadingModalIsOpen(false);
        setSubmitButtonIsDisabled(true);
        setSuccessModalIsOpen(true);
      }
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    navigation.goBack();
  };

  const takePictureFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back'
    });
    if (!result.didCancel && !result.errorCode) {
      setPictures([...pictures, { uri: result.assets[0].uri, name: result.assets[0].fileName }]);
    }
    setCameraModalIsOpen(false);
  };

  const selectPictureFromStorage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && !result.errorCode) {
      setPictures([...pictures, { uri: result.assets[0].uri, name: result.assets[0].fileName }]);
    }
    setCameraModalIsOpen(false);
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
          <Button style={styles.secondaryButton} onPress={() => setCameraModalIsOpen(true)}>
            Add picture
          </Button>
          {pictures &&
            pictures.map((picture) => (
              <Image
                key={picture.name}
                source={{ uri: picture.uri }}
                style={{ height: 150, width: 150 }}
              />
            ))}
          <View style={styles.buttonContainer}>
            <Button
              style={{
                ...styles.submitButton,
                backgroundColor: submitButtonIsDisabled ? 'grey' : AppStyles.color.tint
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
            visible={cameraModalIsOpen}
            onRequestClose={() => setCameraModalIsOpen(false)}
          >
            <View style={styles.modalView}>
              <Button style={styles.secondaryButton} onPress={takePictureFromCamera}>
                Take picture from camera
              </Button>
              <Button style={styles.secondaryButton} onPress={selectPictureFromStorage}>
                Select picture from storage
              </Button>
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
    width: AppStyles.buttonWidth.main,
    borderRadius: AppStyles.borderRadius.main,
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

export default StationRatingScreen;
