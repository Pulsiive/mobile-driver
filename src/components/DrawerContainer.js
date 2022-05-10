import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from './MenuButton';
import { AppIcon, AppStyles } from '../AppStyles';

export default function DrawerContainer({ navigation }) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Log out"
          source={AppIcon.images.logout}
          onPress={() => {
            navigation.navigate('LoginStack');
          }}
        />
        <MenuButton
          title="Change password"
          source={AppIcon.images.settings}
          onPress={() => {
            navigation.navigate('ChangePassword');
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
