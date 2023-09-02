import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'react-native-button';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import api from '../../db/Api';
import { FlatList } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import {
  AnimatedLoading,
  ButtonCommon,
  FloatingCard,
  ModalSwipeUp,
  TextList,
  TextTitle
} from '../../components';

function Profile() {
  const { AppColor } = useTheme();

  const [myCommentsModalIsOpen, setMyCommentsModalIsOpen] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [myCommentsFetchIsLoading, setMyCommentsFetchIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: null,
    lastName: null,
    email: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      api.send('GET', '/api/v1/profile', null).then((data) => {
        console.log(data.data);
        setProfile({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const styles = StyleSheet.create({
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: AppColor.title,
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
      fontSize: AppStyles.fontSize.normal
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
      <View style={AppStyles.containerHeader}>
        <FloatingCard>
          {loading ? (
            <View style={styles.profilePicture}>
              <AnimatedLoading />
            </View>
          ) : false ? (
            <Image
              source={{
                uri: 'https://vignette.wikia.nocookie.net/krypton-series/images/3/36/Dev-Em_BioPic.jpg/revision/latest/top-crop/width/360/height/360?cb=20180303151203'
              }}
              style={styles.profilePicture}
            />
          ) : (
            <View style={styles.profilePicture}>
              {profile.firstName && <Text style={styles.initialsText}>{profile.firstName[0]}</Text>}
            </View>
          )}
          <TextTitle
            title={profile.firstName + ' ' + profile.lastName}
            style={{ marginBottom: 0, marginTop: 5 }}
          />
          <Text style={[AppStyles.subtext, { color: AppColor.text }]}>Conducteur</Text>
        </FloatingCard>
        <TextList
          titles={['Prénom', 'Nom', 'E-mail']}
          infos={[profile.firstName, profile.lastName, profile.email]}
        />
        <TextTitle title="Mes commentaires" style={{ marginTop: 40 }} />
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
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center'
//   },
//   title: {
//     fontSize: AppStyles.fontSize.title,
//     fontWeight: 'bold',
//     color: AppStyles.color.pulsive,
//     marginTop: 20,
//     marginBottom: 50
//   },
//   leftTitle: {
//     alignSelf: 'stretch',
//     textAlign: 'left',
//     marginLeft: 20
//   },
//   text: {
//     fontWeight: 'bold',
//     color: AppStyles.color.title,
//     fontSize: 20,
//     marginBottom: 15
//   },
//   content: {
//     paddingLeft: 50,
//     paddingRight: 50,
//     textAlign: 'center',
//     fontSize: AppStyles.fontSize.content,
//     color: AppStyles.color.text
//   },
//   loginContainer: {
//     width: AppStyles.buttonWidth,
//     backgroundColor: AppStyles.color.pulsive,
//     borderRadius: AppStyles.borderRadius,
//     padding: 10,
//     marginTop: 30
//   },
//   loginText: {
//     color: AppStyles.color.white
//   },
//   placeholder: {
//     color: 'red'
//   },
//   InputContainer: {
//     width: AppStyles.textInputWidth.main,
//     marginTop: 30,
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderColor: AppStyles.color.grey,
//     borderRadius: AppStyles.borderRadius
//   },
//   body: {
//     height: 42,
//     paddingLeft: 20,
//     paddingRight: 20,
//     color: AppStyles.color.text
//   },
//   shareButton: {
//     width: 200,
//     backgroundColor: AppStyles.color.facebook,
//     borderRadius: AppStyles.borderRadius,
//     padding: 10,
//     marginTop: 30,
//     position: 'absolute',
//     bottom: 20
//   },
//   shareText: {
//     color: AppStyles.color.white
//   },
//   // centeredView: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   marginTop: 22
//   // },
//   modalView: {
//     margin: 20,
//     marginTop: '20%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   }
// });

export default Profile;
