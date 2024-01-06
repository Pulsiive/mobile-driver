import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import { AnimatedLoading } from '.';

{
  /*
  <FilterTab
    title(required)="FilterTab" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const FilterTab = ({ options, style, onPress, initValue }) => {
  const { AppColor } = useTheme();

  const [selectedOption, setSelectedOption] = useState(options[initValue ? initValue : 0].value);

  const handleOptionToggle = (value) => {
    if (selectedOption === value && options.length > 1) return;
    setSelectedOption(value);
    onPress(value);
  };

  const styles = StyleSheet.create({
    FilterTab: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: AppStyles.buttonWidth,
      alignSelf: 'center',
      backgroundColor: AppColor.background,
      borderColor: AppColor.border,
      borderWidth: 1,
      borderRadius: 10,
      minHeight: 50,
      marginBottom: 10
    },
    option: {
      flex: 1,
      overflow: 'hidden'
    },
    selectedOption: {
      backgroundColor: AppColor.bottomColor
    },
    optionInner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 6
    },
    optionText: {
      fontSize: 14,
      color: AppColor.text
    },
    firstOption: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10
    },
    lastOption: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10
    },
    separator: {
      borderRightWidth: 1,
      borderColor: AppColor.separator
    }
  });

  return (
    <View
      style={{
        ...styles.FilterTab,
        ...(style || {})
      }}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleOptionToggle(option.value)}
          style={[
            styles.option,
            selectedOption === option.value && styles.selectedOption,
            index === 0 && styles.firstOption,
            index === options.length - 1 && styles.lastOption,
            index !== options.length - 1 && styles.separator
          ]}
        >
          <View style={styles.optionInner}>
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTab;
