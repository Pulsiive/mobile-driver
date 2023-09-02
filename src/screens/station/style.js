import { StyleSheet } from 'react-native';
import { AppStyles } from '../../AppStyles';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 30
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingBottom: 15,
    marginBottom: 20
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 20
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 15
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black'
  },
  text: {
    color: 'black',
    fontSize: 16
  },
  smallText: {
    color: 'black',
    fontSize: 14
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  button: {
    backgroundColor: AppStyles.color.main,
    borderRadius: 5,
    height: 35,
    width: '50%',
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
});

export default style;
