import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from './MenuButton';
import { AppIcon, AppStyles } from '../AppStyles';

export default function DrawerContainer({ navigation }) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Profile"
          source={AppIcon.images.profile}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <MenuButton
          title="Settings"
          source={AppIcon.images.settings}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20
  }
});
