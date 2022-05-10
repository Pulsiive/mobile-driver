import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AppStyles } from '../../AppStyles';
import { Configuration } from '../../Configuration';

function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home'
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.color.background,
    flex: 1,
    padding: Configuration.home.listing_item.offset
  },
  title: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 25
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  }
});

export default Home;
