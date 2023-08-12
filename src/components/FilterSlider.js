import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import { AnimatedLoading } from '.';
import Slider from '@react-native-community/slider';

{
  /*
  <FilterSlider
    style(optional)={{ insert style here }} // to change the style
    title(required)="FilterSlider" // text of the button
    onChange(required)={onChange} // onChange fonction
    unit(optional)="km" // unit of the slider
    decimal(optional)=1 // number of decimal wanted
    loading(optional)={true} // add or not a loading animation
  />
  */
}

const FilterSlider = ({ style, range, onChange, unit, decimal, initValue, loading }) => {
  const { AppColor } = useTheme();

  const [selectedValue, setSelectedValue] = useState(initValue ? initValue : range[1].toString());

  const handleValueChange = (value) => {
    setSelectedValue(parseFloat(value).toFixed(decimal ? decimal : 0));
    onChange(parseFloat(value).toFixed(decimal ? decimal : 0));
  };

  const styles = StyleSheet.create({
    FilterSlider: {
      flex: 1,
      marginBottom: 10
    },
    slider: {
      width: '100%'
    },
    sliderContainer: {
      alignItems: 'stretch'
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
    },
    label: {
      minWidth: 50,
      padding: 5,
      paddingHorizontal: 10,
      fontSize: 14,
      color: AppColor.text,
      textAlign: 'center',
      backgroundColor: AppColor.bottomColor,
      borderRadius: 25
    }
  });

  return (
    <View
      style={{
        ...styles.FilterSlider,
        ...(style || {})
      }}
    >
      <Slider
        style={styles.slider}
        minimumValue={range[0]}
        maximumValue={range[1]}
        value={parseInt(selectedValue)}
        onValueChange={handleValueChange}
        minimumTrackTintColor={AppColor.title}
        maximumTrackTintColor={AppColor.separator}
        thumbTintColor={AppColor.title}
      />
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>{range[0]}</Text>
        <Text style={styles.label}>
          {selectedValue}
          {unit}
        </Text>
        <Text style={styles.label}>{range[1]}</Text>
      </View>
    </View>
  );
};

export default FilterSlider;
