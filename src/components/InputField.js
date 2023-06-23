import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles } from '../AppStyles';

{
  /*
  <InputField
    label(required)="Label" // Label of the input area
    setValue(required)={setName} // function to set the value in the parent
    errorCheck(optional)={checkForLabelErrors} // function to check input errors
    secure(optional)={true} // to put or not the secureText option
    subText(optional)="Subtext" // to put a subtext
  />
  */
}

const InputField = ({ label, errorCheck, subText, setValue, secure }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [secureText, setSecureText] = useState(secure);
  const [inputValue, setInputValue] = useState('');

  const borderStyle = {
    borderWidth: isFocused ? 2 : 1,
    borderColor: isFocused ? AppStyles.color.borderFocused : AppStyles.color.border
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
  };

  const handleChangeText = (text) => {
    setInputValue(text);
    setError(false);
  };

  return (
    <View style={styles.container}>
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
      />
      {secure && (
        <TouchableOpacity style={styles.secureContainer} onPress={() => setSecureText(!secureText)}>
          <Icon
            name={secureText ? 'eye-with-line' : 'eye'}
            size={20}
            color={AppStyles.color.darkgrey}
          />
        </TouchableOpacity>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="info-with-circle" size={14} style={styles.infoIcon} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {subText && <Text style={styles.subText}>{subText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '3%',
    width: AppStyles.buttonWidth,
    alignSelf: 'center'
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '1%',
    marginTop: '2%'
  },
  label: {
    position: 'absolute',
    left: 10,
    color: AppStyles.color.label
  },
  errorLabel: {
    color: AppStyles.color.error
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
    color: AppStyles.color.text
  },
  errorInput: {
    borderColor: AppStyles.color.error
  },
  infoIcon: {
    marginRight: 6,
    color: AppStyles.color.error
  },
  errorText: {
    color: AppStyles.color.error,
    fontSize: 12
  },
  subText: {
    marginTop: 6,
    paddingHorizontal: 6,
    fontSize: 12,
    color: AppStyles.color.subText
  },
  secureContainer: {
    padding: 10,
    position: 'absolute',
    right: 14,
    top: 10
  }
});

export default InputField;
