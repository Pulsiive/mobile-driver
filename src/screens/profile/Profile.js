import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles, useTheme } from '../../AppStyles';
import api from '../../db/Api';
import {
  AnimatedLoading,
  ButtonCommon,
  FloatingCard,
  ModalSwipeUp,
  TextList,
  TextSubTitle,
  TextTitle
} from '../../components';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FormData from 'form-data';
import { showMessage } from 'react-native-flash-message';
import { getUser, useUserUpdate } from '../../contexts/UserContext';
import ProfilePicture from '../../components/ProfilePicture';

function Profile() {
  const user = getUser();
  const updateUser = useUserUpdate();

  const { AppColor } = useTheme();

  const [myCommentsModalIsOpen, setMyCommentsModalIsOpen] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [myCommentsFetchIsLoading, setMyCommentsFetchIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [changeProfilePicModalIsOpen, setChangeProfilePicModalIsOpen] = useState(false);

  const openMyCommentsModal = async () => {
    try {
      setMyCommentsModalIsOpen(true);
      setMyCommentsFetchIsLoading(true);
      const myComments = await api.send('GET', '/api/v1/profile/comments/stations');
      setMyComments(myComments.data);
      console.log(myComments.data);
    } catch (e) {
      console.log('Failed to fetch stations comments');
    } finally {
      setMyCommentsFetchIsLoading(false);
    }
  };

  const uploadPicture = async (picture) => {
    if (picture.uri && picture.name) {
      const formData = new FormData();

      formData.append('file', { uri: picture.uri, type: 'image/jpeg', name: picture.name });
      const res = await api.send('POST', '/api/v1/profile/picture', formData, true, true);
      if (res.status === -1) {
        showMessage({
          message: `Impossible de traiter l'image`,
          type: 'error',
          backgroundColor: 'red'
        });
      } else {
        showMessage({
          message: `Photo de profile traitée avec succès`,
          type: 'success',
          backgroundColor: 'green'
        });
        updateUser({ profilePictureId: res.data.file });
      }
    }
  };

  const takePictureFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo'
    });
    if (!result.didCancel && !result.errorCode) {
      uploadPicture({ uri: result.assets[0].uri, name: result.assets[0].fileName });
    }
    setChangeProfilePicModalIsOpen(false);
  };

  const selectPictureFromStorage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && !result.errorCode) {
      uploadPicture({ uri: result.assets[0].uri, name: result.assets[0].fileName });
    }
    setChangeProfilePicModalIsOpen(false);
  };

  const styles = StyleSheet.create({
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center'
    },
    initialsText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: AppColor.background
    },
    commentContainer: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: AppColor.separator
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5
    },
    address: {
      color: AppColor.title,
      fontWeight: 'bold',
      fontSize: AppStyles.fontSize.content
    },
    ratingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5
    },
    starsContainer: {
      flexDirection: 'row'
    },
    likesDislikesContainer: {
      flexDirection: 'row'
    },
    likesDislikes: {
      flexDirection: 'row',
      marginLeft: 10
    },
    likesDislikesText: {
      marginLeft: 2,
      color: AppColor.icon
    }
  });

  return (
    <ScrollView style={[AppStyles.container, { backgroundColor: AppColor.background }]}>
      <View style={{ paddingTop: 50 }}>
        <FloatingCard>
          <View style={styles.profilePicture}>
            {user.firstName && (
              <ProfilePicture
                width={100}
                height={100}
                borderRadius={100}
                profilePictureId={user.profilePictureId}
              />
            )}
          </View>
          <TextSubTitle title={user.firstName + ' ' + user.lastName} style={{ marginTop: 5 }} />
          <Text style={[AppStyles.subtext, { color: AppColor.text }]}>Conducteur</Text>
        </FloatingCard>
        <TextList
          titles={['Prénom', 'Nom', 'E-mail']}
          infos={[user.firstName, user.lastName, user.email]}
        />
        <ButtonCommon
          title="Changer ma photo de profil"
          onPress={() => {
            setChangeProfilePicModalIsOpen(true);
          }}
          style={{ marginTop: 20 }}
        />
        <TextSubTitle
          title="Mes commentaires"
          style={{ marginLeft: 20, marginTop: 40, marginBottom: 10 }}
        />
        <ButtonCommon
          title="Afficher mes commentaires"
          onPress={() => {
            openMyCommentsModal();
          }}
          loading={loading}
        />
      </View>
      <ModalSwipeUp
        title="Mes commentaires"
        visible={myCommentsModalIsOpen}
        onClose={() => setMyCommentsModalIsOpen(false)}
        closeButton={true}
      >
        {myCommentsFetchIsLoading ? (
          <AnimatedLoading />
        ) : (
          <View>
            {myComments.length == 0 ? (
              <Text style={AppStyles.subtext}>Vous n'avez pas encore de commentaires</Text>
            ) : (
              myComments.map((item, index) => {
                const starsRating = [];
                for (let i = 0; i < item.rate; i++)
                  starsRating.push(<Icon name="star" size={15} color={'orange'} key={i} />);
                return (
                  <View key={index} style={styles.commentContainer}>
                    <View style={styles.infoRow}>
                      <Text style={styles.address}>
                        {item.station.coordinates.address.slice(
                          0,
                          item.station.coordinates.address.indexOf('75')
                        )}
                      </Text>
                      <Text style={AppStyles.subtext}>
                        {item.date.slice(0, item.date.indexOf('T'))}
                      </Text>
                    </View>
                    <Text style={AppStyles.subtext}>{item.comment}</Text>
                    <View style={styles.ratingRow}>
                      <View style={styles.starsContainer}>{starsRating}</View>
                      <View style={styles.likesDislikesContainer}>
                        <View style={styles.likesDislikes}>
                          <Icon name="thumbs-up" size={15} color={AppColor.icon} />
                          <Text style={styles.likesDislikesText}>{item.likes}</Text>
                        </View>
                        <View style={styles.likesDislikes}>
                          <Icon name="thumbs-down" size={15} color={AppColor.icon} />
                          <Text style={styles.likesDislikesText}>{item.dislikes}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        )}
      </ModalSwipeUp>
      <ModalSwipeUp
        title="Changer ma photo de profil"
        visible={changeProfilePicModalIsOpen}
        onClose={() => setChangeProfilePicModalIsOpen(false)}
        closeButton
      >
        <ButtonCommon
          title="Choisir depuis la galerie"
          onPress={() => {
            selectPictureFromStorage();
          }}
        />
        <ButtonCommon
          title="Utiliser la caméra"
          onPress={() => {
            takePictureFromCamera();
          }}
        />
      </ModalSwipeUp>
    </ScrollView>
  );
}

export default Profile;
