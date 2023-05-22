import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import { FlatList } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';

function Profile() {
  const [myCommentsModalIsOpen, setMyCommentsModalIsOpen] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [myCommentsFetchIsLoading, setMyCommentsFetchIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: null,
    lastName: null,
    email: null
  });

  useEffect(() => {
    try {
      api.send('GET', '/api/v1/profile', null).then((data) =>
        setProfile({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  const openMyCommentsModal = async () => {
    try {
      setMyCommentsModalIsOpen(true);
      setMyCommentsFetchIsLoading(true);
      const myComments = await api.send('GET', '/api/v1/profile/comments/stations');
      setMyComments(myComments.data);
    } catch (e) {
      console.log('Failed to fetch stations comments');
    } finally {
      setMyCommentsFetchIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Profile</Text>
      <View style={styles.leftTitle}>
        <Text style={styles.text}>
          Name: {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.text}>Email: {profile.email}</Text>
      </View>
      <Button containerStyle={styles.shareButton} style={styles.shareText}>
        Share my profile
      </Button>
      <Button
        containerStyle={styles.shareButton}
        style={styles.shareText}
        onPress={openMyCommentsModal}
      >
        My comments
      </Button>
      <View>
        <Modal
          transparent
          animationType="slide"
          visible={myCommentsModalIsOpen}
          onRequestClose={() => setMyCommentsModalIsOpen(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setMyCommentsModalIsOpen(false);
              }}
            >
              <Icon name="cross" size={30} color="green" />
            </TouchableOpacity>
            {myCommentsFetchIsLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                data={myComments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const starsRating = [];
                  for (let i = 0; i < item.rate; i++) {
                    starsRating.push(<Icon name="star" size={15} color={'orange'} key={i} />);
                  }
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                          {item.station.coordinates.address.slice(
                            0,
                            item.station.coordinates.address.indexOf('75')
                          )}
                        </Text>
                        <Text style={{ fontSize: 13 }}>
                          {item.date.slice(0, item.date.indexOf('T'))}
                        </Text>
                      </View>
                      <View style={{ marginBottom: 5 }}>
                        {item.comment ? (
                          <Text style={{ fontSize: 16 }}>{item.comment}</Text>
                        ) : undefined}
                        <View style={{ flexDirection: 'row' }}>{starsRating}</View>
                      </View>
                      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                          <Icon name="thumbs-up" size={15} color={'grey'} />
                          <Text>{item.likes}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Icon name="thumbs-down" size={15} color={'grey'} />
                          <Text>{item.dislikes}</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </Modal>
      </View>
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
    color: AppStyles.color.tint,
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
    marginBottom: 15
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
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
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  shareText: {
    color: AppStyles.color.white
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22
  // },
  modalView: {
    margin: 20,
    marginTop: '20%',
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
  }
});

export default Profile;
