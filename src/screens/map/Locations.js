import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AppStyles } from '../../AppStyles';
import * as locations from '../../locations';

function Locations({ navigation, route }) {
  console.log(route);
  const { handleListItemPress } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations.locations);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text == '') {
      setFilteredLocations(locations.locations);
      return;
    }
    setFilteredLocations(
      locations.locations.filter((location) =>
        location[0].toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const changeLocation = (item) => {
    handleListItemPress(item);
    navigation.goBack();
  };

  const renderLocation = ({ item }) => (
    <TouchableOpacity onPress={() => changeLocation(item)}>
      <View>
        <Text style={styles.item}>{item[0]}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.item}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Rechercher une localisation"
        placeholderTextColor="#999999"
      />
      <FlatList
        style={styles.list}
        data={filteredLocations}
        renderItem={renderLocation}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 6,
    width: '100%'
  },
  item: {
    paddingHorizontal: 10,
    fontSize: 18,
    lineHeight: 24,
    color: 'black',
    marginBottom: 4
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 8
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
    marginBottom: 15
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.subTitle,
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
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  shareText: {
    color: AppStyles.color.white
  }
});

export default Locations;
