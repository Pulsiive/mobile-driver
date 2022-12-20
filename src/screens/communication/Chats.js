import React, { useEffect, useState } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { AppStyles } from '../../AppStyles';

import Chat from './Chat';
import api from '../../db/Api';

function Chats() {
  const [chats, setChats] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => console.log(chats), [chats]);

  useEffect(() => {
    console.log('getting last messages');
    api
      .send('GET', '/api/v1/profile/messages/last-by-user')
      .then((data) =>
        setChats(
          data.data.map((message) => {
            message.user.profilePictureUri =
              'https://vignette.wikia.nocookie.net/krypton-series/images/c/c3/Character-avatar-lyta-zod.png/revision/latest?cb=20180323124150';
            return message;
          })
        )
      )
      .catch((e) => setErrorMessage(e));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      {chats.length > 0 && (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.message.id}
          renderItem={({ item }) => <Chat chat={item}></Chat>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  InputContainer: {
    width: 300,
    marginVertical: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  input: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  }
});

export default Chats;
