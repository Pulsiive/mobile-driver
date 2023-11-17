import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';
import { FlatList } from 'react-native-gesture-handler';

function Owner(props) {
  const [stations, setStations] = useState([]);
  const [ratings, setRatings] = useState();
  const [ratingsModalIsOpen, setRatingsModalIsOpen] = useState(false);
  const { imageUri, name, userId } = useRoute().params;
  const navigation = useNavigation();

  const onPress = (nav) => {
    navigation.navigate(nav, {
      imageUri: imageUri,
      name: name,
      ownerId: userId
    });
  };

  // useEffect(() => {
  //   async function fetchStations() {
  //     const res = await api.send('get', '/api/v1/profile/getStations', null, true);
  //     console.log('res: ', res);
  //     setStations(res);
  //   }
  //   try {
  //     fetchStations();
  //   } catch (e) {
  //     console.log('e: ', e);
  //   }
  // }, []);
  const navigateToOwnerRating = () => {
    navigation.navigate('OwnerRating', {
      ownerId: userId
    });
  };

  useEffect(() => {
    api
      .send('GET', `/api/v1/user/${userId}/rate`)
      .then((ratings) => setRatings(ratings.data.ratings));
  }, []);

  const renderRating = (rating) => {
    const stars = new Array(rating.rate).fill(<Icon name="star" size={20} color={'orange'} />);
    return (
      <View style={styles.ratingContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={styles.ratingAuthor}
          >{`${rating.author.firstName} ${rating.author.lastName} -  `}</Text>
          <Text>{rating.date.slice(0, rating.date.indexOf('T'))}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>{stars}</View>
        <Text>{rating.comment}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <Icon name="thumbs-up" size={15} color={'grey'} />
            <Text>{rating.likes}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="thumbs-down" size={15} color={'grey'} />
            <Text>{rating.dislikes}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Owner</Text>
      <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75
          }}
        />
      </View>
      <View style={styles.leftTitle}>
        <Text style={styles.text}>Username: {name}</Text>
        <Text style={styles.text}>Rating: 4.2/5</Text>
      </View>
      <Modal
        animationType="slide"
        visible={ratingsModalIsOpen}
        onRequestClose={() => setRatingsModalIsOpen(false)}
        transparent
      >
        <View style={styles.modal}>
          <FlatList data={ratings} renderItem={({ item }) => renderRating(item)}></FlatList>
        </View>
      </Modal>

      <Button
        onPress={() => onPress('Calendar')}
        containerStyle={styles.calendarButton}
        style={styles.buttonText}
      >
        Your reservations
      </Button>
      <Button
        onPress={() => onPress('Station')}
        containerStyle={styles.stationButton}
        style={styles.buttonText}
      >
        Station
      </Button>
      <Button containerStyle={styles.shareButton} style={styles.buttonText}>
        Share this profil
      </Button>
      <Button
        containerStyle={styles.rateButton}
        style={styles.buttonText}
        onPress={navigateToOwnerRating}
      >
        Rate user
      </Button>
      <Button
        containerStyle={styles.rateButton}
        style={styles.buttonText}
        onPress={() => setRatingsModalIsOpen(true)}
      >
        See ratings
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.pulsive,
    marginTop: 20,
    marginBottom: 50
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 20,
    marginBottom: 13
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: 'red'
  },
  InputContainer: {
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: 25
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  stationButton: {
    width: 200,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
    padding: 10,
    position: 'absolute',
    bottom: 70
  },
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: 25,
    padding: 10,
    position: 'absolute',
    bottom: 20
  },
  calendarButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: 25,
    padding: 10,
    position: 'absolute',
    bottom: 120
  },
  buttonText: {
    color: AppStyles.color.white
  },
  rateButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: 25,
    padding: 10,
    marginBottom: 10
  },
  modal: {
    backgroundColor: AppStyles.color.background,
    padding: 10,
    height: '70%',
    width: '80%',
    borderRadius: 10,
    marginTop: '30%',
    marginLeft: '12%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  ratingContainer: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderRadius: 5
  },
  ratingAuthor: {
    fontWeight: 'bold'
  }
});

export default Owner;
