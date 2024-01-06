import { StyleSheet } from 'react-native';
import { AppStyles } from '../../AppStyles';

const styles = StyleSheet.create({
  screenOptions: {
    headerStyle: { borderBottomWidth: 1 },
    headerMode: 'screen',
    headerShadowVisible: true,
    headerTransparent: false,
    headerTitle: ''
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  iconStyle: { tintColor: AppStyles.color.pulsive, width: 30, height: 30 }
});

export default styles;
