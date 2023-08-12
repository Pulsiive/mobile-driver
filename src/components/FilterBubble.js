import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, FlatList } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import { AnimatedLoading } from '.';

{
  /*
  <FilterBubble
    title(required)="FilterBubble" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
    loading(optional)={true} // add or not a loading animation
  />
  */
}

const FilterBubble = ({ options, style, onPress, initValue, loading }) => {
  const { AppColor } = useTheme();

  const [selectedOption, setSelectedOption] = useState(options[initValue ? initValue : 0].value);

  const handleOptionToggle = (value) => {
    if (selectedOption === value && options.length > 1) return;
    setSelectedOption(value);
    onPress(value);
  };

  const styles = StyleSheet.create({
    FilterBubble: {
      width: '100%',
      alignSelf: 'center',
      marginBottom: 10
    },
    option: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginRight: 12,
      backgroundColor: AppColor.background,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: AppColor.separator,
      minWidth: 40
    },
    selectedOption: {
      backgroundColor: AppColor.bottomColor
    },
    optionInner: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    optionText: {
      fontSize: 14,
      color: AppColor.text
    }
  });

  const renderOption = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleOptionToggle(item.value)}
      style={[styles.option, selectedOption === item.value && styles.selectedOption]}
    >
      <View style={styles.optionInner}>
        <Text style={styles.optionText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        ...styles.FilterBubble,
        ...(style || {})
      }}
    >
      <FlatList
        data={options}
        renderItem={renderOption}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FilterBubble;
