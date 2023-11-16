import Button from 'react-native-button';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
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

import { AppIcon, AppStyles, useTheme } from '../../AppStyles';

import api from '../../db/Api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  ButtonCommon,
  ButtonConditional,
  FilterBubble,
  InputField,
  ModalSwipeUp,
  Separator,
  TextSubTitle,
  TextTitle
} from '../../components';

const StationRatingScreen = ({ route, navigation }) => {
  const { AppColor } = useTheme();

  const [submitButtonIsEnabled, setSubmitButtonIsEnabled] = useState(false);
  const [rate, setRate] = useState([false, false, false, false, false]);
  const predefinedMessages = ['Marche bien', 'Indisponible', 'Borne cassée'];
  const [selectedPredefinedMessage, setSelectedPredefinedMessage] = useState(-1);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState(false);
  const [loadingText, setLoadingText] = useState('Uploading notation...');

  const [pictures, setPictures] = useState([]);

  const { stationId } = route.params;

  useEffect(() => {
    if (rate.indexOf(true) !== -1) {
      setSubmitButtonIsEnabled(true);
    }
  }, [rate]);

  useEffect(() => {
    if (successModalIsOpen) {
      setTimeout(closeSuccessModal, 2000);
    }
  }, [successModalIsOpen]);

  const submitRating = async () => {
    setErrorMessage('');
    const res = await api.send('POST', '/api/v1/station/rate', {
      rating: {
        id: stationId,
        rate: rate.lastIndexOf(true) + 1,
        date: new Date(),
        comment: message
      }
    });
    if (res.status === -1) {
      setErrorMessage('Failed to create rating. Please try again later');
    } else {
      if (pictures.length > 0) {
        const formData = new FormData();
        pictures.forEach((picture) => {
          formData.append('file', { uri: picture.uri, type: 'image/jpeg', name: picture.name });
        });
        formData.append('commentId', res.data.rate.id);
        setLoadingText('Uploading attached pictures...');
        const picres = await api.send('POST', '/api/v1/picture', formData, true, true);
        if (picres.status === -1) {
          setErrorMessage('Failed to upload pictures. Your comment was successfully saved');
        } else {
          setSubmitButtonIsEnabled(false);
          setSuccessModalIsOpen(true);
        }
      } else {
        setSubmitButtonIsEnabled(false);
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: AppColor.background }}>
        <TextTitle title="Noter la borne" style={{ marginTop: 80, marginBottom: 0 }} />
        <View style={{ padding: 15 }}>
          {errorMessage.length > 0 && (
            <View
              style={{
                backgroundColor: AppColor.errorMessage,
                borderRadius: 5,
                padding: 10,
                marginBottom: 30
              }}
            >
              <Text
                style={{
                  color: AppColor.background,
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 'bold'
                }}
              >
                {errorMessage}
              </Text>
            </View>
          )}
          <Separator />
          <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-around' }}>
            {rate.map((selected, index) => (
              <IconAwesome
                key={index}
                name="star"
                size={40}
                color={selected ? AppColor.rate : AppColor.separator}
                onPress={() => setRate([...rate.fill(true, 0, index + 1).fill(false, index + 1)])}
              />
            ))}
          </View>
          <Separator />
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 30,
              justifyContent: 'space-between'
            }}
          >
            {predefinedMessages.map((message, index) => (
              <Button
                key={index}
                style={{
                  color: AppColor.lightText,
                  borderWidth: 1,
                  borderColor: AppColor.border,
                  width: '100%',
                  // minHeight: 50,
                  borderRadius: 5,
                  padding: 5,
                  backgroundColor:
                    index === selectedPredefinedMessage ? AppColor.pressed : AppColor.background
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
            style={{
              color: AppColor.text,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: AppColor.border,
              padding: 10
            }}
            multiline
            numberOfLines={3}
            onChangeText={(text) => {
              setSelectedPredefinedMessage(-1);
              setMessage(text);
            }}
            value={message}
            placeholder="Votre commentaire (facultatif)"
            placeholderTextColor={AppColor.lightText}
          />
          <Separator />

          <ButtonConditional
            title="Ajouter une photo"
            isEnabled={true}
            style={{ backgroundColor: AppColor.secured, marginTop: 30 }}
            onPress={() => setCameraModalIsOpen(true)}
          />
          {pictures &&
            pictures.map((picture) => (
              <Image
                key={picture.name}
                source={{ uri: picture.uri }}
                style={{ height: 150, width: 150 }}
              />
            ))}
        </View>

        <ModalSwipeUp visible={successModalIsOpen} closeButton={false}>
          <View
            style={{
              padding: 15,
              paddingTop: 50,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TextSubTitle
              title="Merci pour votre aide !"
              style={{
                marginBottom: 15
              }}
            />
            <IconAwesome name="check" size={50} color={AppColor.pulsive} />
          </View>
        </ModalSwipeUp>

        <ModalSwipeUp
          title="Ajouter une photo"
          visible={cameraModalIsOpen}
          onClose={() => setCameraModalIsOpen(false)}
          closeButton={true}
        >
          <ButtonCommon
            title="Ouvrir la caméra"
            onPress={() => takePictureFromCamera()}
            style={{ marginTop: 10 }}
          />
          <ButtonCommon
            title="Parcourir la galerie photo"
            onPress={() => selectPictureFromStorage()}
          />
        </ModalSwipeUp>
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
          title="Envoyer"
          isEnabled={submitButtonIsEnabled}
          style={{
            backgroundColor: submitButtonIsEnabled ? AppStyles.color.pulsive : AppColor.disabled
          }}
          onPress={() => submitRating()}
        />
      </View>
    </SafeAreaView>
  );
};

export default StationRatingScreen;
