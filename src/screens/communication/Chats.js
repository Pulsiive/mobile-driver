import React from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { AppStyles } from '../../AppStyles';
// import { Text } from '../Themed';
import chats from '../../chats';
import Chat from './Chat';

function Chats() {
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Chat chat={item} />}
        showsVerticalScrollIndicator={false}
      />
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
