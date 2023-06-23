import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';
import { AnimatedLoading } from './';

{
  /*
  <ButtonConditional
    title(required)="ButtonConditional" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
    isEnable(optional)={true} // condition for the button to be enable or not
    loading(optional)={true} // add or not a loading animation
  />
  */
}

const ButtonConditional = ({ title, style, isEnabled, onPress, loading }) => {
  const isButtonEnabled = isEnabled && typeof isEnabled === 'boolean';

  const buttonStyle = {
    opacity: !isButtonEnabled || loading ? 0.5 : 1
  };

  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={{ ...styles.ButtonCommon, ...buttonStyle, ...(style || {}) }}
      disabled={!isButtonEnabled || loading}
    >
      {loading ? <AnimatedLoading /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonCommon: {
    borderRadius: 8,
    padding: '4%',
    minHeight: 54,
    margin: '2%',
    width: AppStyles.buttonWidth,
    alignSelf: 'center',
    backgroundColor: AppStyles.color.pulsive
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: AppStyles.color.lightmode,
    fontSize: 16
  },
  loadingText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: AppStyles.color.lightmode
  },
  dot: {
    marginHorizontal: 2
  }
});

export default ButtonConditional;

// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
// import { AppStyles } from '../AppStyles';

// {
//   /*
//   <ButtonConditional
//     title(required)="ButtonConditional" // text of the button
//     onPress(required)={() => onPress()} // function called when the button is pressed
//     style(optional)={{ insert style here }} // to change the style
//     isEnable(optional)={true} // condition for the button to be enable or not
//   />
//   */
// }

// const ButtonConditional = ({ title, style, isEnabled, onPress, loading }) => {
//   const isButtonEnabled = isEnabled && typeof isEnabled === 'boolean';

//   const buttonStyle = {
//     opacity: isButtonEnabled ? 1 : 0.5
//   };

//   const handlePress = () => {
//     if (onPress) onPress();
//   };

//   const renderContent = () => {
//     if (loading) {
//       return (

//       );
//     }
//     return <Text style={styles.buttonText}>{title}</Text>;
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.5}
//       onPress={handlePress}
//       style={[styles.button, buttonStyle, style]}
//       disabled={!isButtonEnabled || loading}
//     >
//       {renderContent()}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 8,
//     padding: '4%',
//     margin: '2%',
//     width: AppStyles.buttonWidth,
//     alignSelf: 'center',
//     backgroundColor: AppStyles.color.pulsive
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: AppStyles.color.lightmode,
//     fontSize: 16
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   dot: {
//     marginLeft: 6
//   },
//   lottie: {
//     width: 100,
//     height: 100
//   }
// });

// export default ButtonConditional;
