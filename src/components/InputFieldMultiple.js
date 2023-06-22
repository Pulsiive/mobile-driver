import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles } from '../AppStyles';

const InputField = ({ labels, errorChecks, subText, setValues, secures }) => {
  const [isFocused, setIsFocused] = useState([...Array(labels.length)].map(() => false));
  const [errors, setErrors] = useState([...Array(labels.length)].map(() => false));
  const [inputValues, setInputValues] = useState([...Array(labels.length)].map(() => ''));
  const [secureTexts, setSecureTexts] = useState(secures || []);

  const borderStyles = isFocused.map((focused) => ({
    borderWidth: focused ? 2 : 1,
    borderColor: focused ? AppStyles.color.borderFocused : AppStyles.color.border
  }));

  const labelStyles = isFocused.map((focused, index) => ({
    top: focused || inputValues[index] !== '' ? 10 : 18,
    fontSize: focused || inputValues[index] !== '' ? 12 : 18
  }));

  const handleFocus = (index) => {
    setIsFocused((prevFocused) => {
      const updatedFocused = [...prevFocused];
      updatedFocused[index] = true;
      return updatedFocused;
    });
  };

  const handleBlur = (index) => {
    setIsFocused((prevFocused) => {
      const updatedFocused = [...prevFocused];
      updatedFocused[index] = false;
      return updatedFocused;
    });
    setValues[index](inputValues[index]);
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = errorChecks[index](inputValues[index]);
      return updatedErrors;
    });
  };

  const handleChangeText = (text, index) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = text;
      return updatedValues;
    });
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = false;
      return updatedErrors;
    });
  };

  const toggleSecureText = (index) => {
    setSecureTexts((prevSecureTexts) => {
      const updatedSecureTexts = [...prevSecureTexts];
      updatedSecureTexts[index] = !updatedSecureTexts[index];
      return updatedSecureTexts;
    });
  };

  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <View key={index} style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, labelStyles[index], errors[index] && styles.errorLabel]}
          >
            {label}
          </Animated.Text>
          <TextInput
            style={[
              styles.input,
              borderStyles[index],
              errors[index] && styles.inputError,
              index === 0 && styles.firstInput,
              index === labels.length - 1 && styles.lastInput
            ]}
            onFocus={() => handleFocus(index)}
            onBlur={() => handleBlur(index)}
            onChangeText={(text) => handleChangeText(text, index)}
            value={inputValues[index]}
            secureTextEntry={secureTexts[index]}
          />
          {secures && secures[index] && (
            <TouchableOpacity
              style={styles.secureContainer}
              onPress={() => toggleSecureText(index)}
            >
              <Icon
                name={secureTexts[index] ? 'eye-with-line' : 'eye'}
                size={20}
                color={AppStyles.color.darkgrey}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {errors.map(
        (error) =>
          error && (
            <View style={styles.errorContainer}>
              <Icon name="info-with-circle" size={14} style={styles.infoIcon} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )
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
    color: AppStyles.color.text
  },
  inputError: {
    borderColor: AppStyles.color.error
  },
  firstInput: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  lastInput: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
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
