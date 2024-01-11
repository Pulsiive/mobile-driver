import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <InputField
    label(required)="Label" // Label of the input area
    setValue(required)={setName} // function to set the value in the parent
    errorCheck(optional)={checkForLabelErrors} // function to check input errors
    secure(optional)={true} // to put or not the secureText option
    subText(optional)="Subtext" // to put a subtext
    style(optional)={{ insert style here }} // to add style
  />
  */
}

const InputField = ({
  label,
  errorCheck,
  successCheck,
  subText,
  setValue,
  secure,
  style,
  icon,
  iconOnPress,
  initialValue = ''
}) => {
  const { AppColor } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [secureText, setSecureText] = useState(secure);
  const [inputValue, setInputValue] = useState(initialValue);

  const borderStyle = {
    borderWidth: isFocused ? 2 : 1,
    borderColor: isFocused ? AppColor.borderFocused : AppColor.border
  };
  const labelStyle = {
    top: isFocused || inputValue !== '' ? 10 : 18,
    fontSize: isFocused || inputValue !== '' ? 12 : 18
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setValue(inputValue);
    if (errorCheck) setError(errorCheck(inputValue));
    if (successCheck) setSuccess(successCheck(inputValue));
  };

  const handleChangeText = (text) => {
    setInputValue(text);
    setError(false);
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: '3%',
      width: AppStyles.buttonWidth,
      alignSelf: 'center'
    },
    subTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: '1%',
      marginTop: '2%'
    },
    label: {
      position: 'absolute',
      left: 10,
      color: AppColor.label,
      zIndex: 1
    },
    errorLabel: {
      color: AppColor.error
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    input: {
      flex: 1,
      height: 60,
      paddingTop: 30,
      paddingHorizontal: 10,
      borderRadius: 8,
      color: AppColor.text,
      backgroundColor: AppColor.background
    },
    errorInput: {
      borderColor: AppColor.error
    },
    successIcon: {
      marginRight: 6,
      color: AppColor.pulsive
    },
    errorIcon: {
      marginRight: 6,
      color: AppColor.error
    },
    errorText: {
      color: AppColor.error,
      fontSize: 12
    },
    successText: {
      color: AppColor.pulsive,
      fontSize: 12
    },
    subText: {
      marginTop: 6,
      paddingHorizontal: 6,
      fontSize: 12,
      color: AppColor.subText
    },
    secureContainer: {
      padding: 10,
      position: 'absolute',
      right: 14,
      top: 10
    }
  });

  return (
    <View
      style={{
        ...styles.container,
        ...(style || {})
      }}
    >
      <Animated.Text style={[styles.label, labelStyle, error && styles.errorLabel]}>
        {label}
      </Animated.Text>
      <TextInput
        style={[styles.input, borderStyle, error && styles.errorInput]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        value={inputValue}
        secureTextEntry={secureText}
        selectionColor={AppColor.icon}
      />
      {secure && (
        <TouchableOpacity style={styles.secureContainer} onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? 'eye-with-line' : 'eye'} size={20} color={AppColor.secured} />
        </TouchableOpacity>
      )}
      {error && (
        <View style={styles.subTextContainer}>
          <Icon name="info-with-circle" size={14} style={styles.errorIcon} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {success && (
        <View style={styles.subTextContainer}>
          <Icon name="info-with-circle" size={14} style={styles.successIcon} />
          <Text style={styles.successText}>{success}</Text>
        </View>
      )}
      {icon && (
        <TouchableOpacity style={styles.secureContainer} onPress={iconOnPress}>
          <Icon name={icon} size={20} color={AppColor.icon} />
        </TouchableOpacity>
      )}
      {subText && !error && !success && <Text style={styles.subText}>{subText}</Text>}
    </View>
  );
};

export default InputField;
