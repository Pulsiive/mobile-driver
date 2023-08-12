import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <InputFieldMultiple
    labels(required)={['Label 1', 'Label 2']} // Labels of the input areas
    setValues(required)={[setLabel1, setLabel2]} // functions to set the values in the parent
    errorChecks(optional)={[checkForLabel1Errors, checkForLabel2Errors]} // functions to check inputs errors
    secures(optional)={[true, false]} // to put or not the secureText options
    subText(optional)="Subtext" // to put a subtext
  />
  */
}

const InputField = ({ labels, errorChecks, subText, setValues, secures }) => {
  const { AppColor } = useTheme();

  const [isFocused, setIsFocused] = useState([...Array(labels.length)].map(() => false));
  const [errors, setErrors] = useState([...Array(labels.length)].map(() => false));
  const [inputValues, setInputValues] = useState([...Array(labels.length)].map(() => ''));
  const [secureTexts, setSecureTexts] = useState(secures || []);

  const borderStyles = isFocused.map((focused) => ({
    borderWidth: focused ? 2 : 1,
    borderColor: focused ? AppColor.borderFocused : AppColor.border
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
    if (errorChecks && errorChecks[index]) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors];
        updatedErrors[index] = errorChecks[index](inputValues[index]);
        return updatedErrors;
      });
    }
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

  const styles = StyleSheet.create({
    container: {
      marginVertical: 12,
      width: AppStyles.buttonWidth,
      alignSelf: 'center'
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 2,
      marginTop: 8
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
      color: AppColor.text,
      backgroundColor: AppColor.background
    },
    inputError: {
      borderColor: AppColor.error
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
      color: AppColor.error
    },
    errorText: {
      color: AppColor.error,
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
            selectionColor={AppColor.icon}
          />
          {secures && secures[index] && (
            <TouchableOpacity
              style={styles.secureContainer}
              onPress={() => toggleSecureText(index)}
            >
              <Icon
                name={secureTexts[index] ? 'eye-with-line' : 'eye'}
                size={20}
                color={AppColor.secured}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {errors.map(
        (error, index) =>
          error && (
            <View key={index} style={styles.errorContainer}>
              <Icon name="info-with-circle" size={14} style={styles.infoIcon} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )
      )}
      {subText && <Text style={styles.subText}>{subText}</Text>}
    </View>
  );
};

export default InputField;
