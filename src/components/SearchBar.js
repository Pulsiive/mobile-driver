import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';
import Separator from './Separator';
import ButtonConditional from './ButtonConditional';

{
  /*
  <SearchBar
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const SearchBar = ({ title, subtext, style, icon, list, onPress, onSelect }) => {
  const { AppColor } = useTheme();

  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(list);

  const handleSearch = (text) => {
    setInputValue(text);
    if (text == '') {
      setFilteredLocations(list);
      return;
    }
    setFilteredLocations(
      list.filter((location) => location[0].toLowerCase().includes(text.toLowerCase()))
    );
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputValue(inputValue);
  };

  const changeLocation = (item) => {
    onSelect(item[1]);
    setIsInputFocused(false);
    handleSearch('');
  };

  const styles = StyleSheet.create({
    SearchBar: {
      width: '90%',
      height: 50,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: AppColor.background,
      borderRadius: 100,
      elevation: 10,
      shadowColor: AppColor.title,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      paddingHorizontal: 10
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginLeft: 5
    },
    textContainer: {
      marginLeft: 20
    },
    labelContainer: {
      top: 24
    },
    title: {
      color: AppColor.title,
      fontWeight: '500',
      fontSize: AppStyles.fontSize.content
    },
    subtext: {
      fontSize: 12,
      color: AppColor.subText
    },
    icon: {
      width: 40,
      height: 40,
      backgroundColor: AppColor.background,
      borderColor: AppColor.bottomColor,
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30
    },
    item: {
      fontSize: AppStyles.fontSize.content,
      lineHeight: 24,
      color: AppColor.text,
      paddingVertical: 14
    },
    list: {
      paddingHorizontal: 20,
      width: '100%',
      backgroundColor: AppColor.background
    }
  });

  return (
    <>
      {isInputFocused && (
        <>
          <ScrollView
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: AppColor.background
            }}
          >
            <ButtonConditional
              title="Annuler"
              isEnabled={true}
              style={{
                backgroundColor: AppColor.separator,
                marginTop: 100
              }}
              onPress={() => setIsInputFocused(false)}
            />
            {filteredLocations.map((location, index) => {
              return (
                <View key={index} style={styles.list}>
                  <TouchableOpacity onPress={() => changeLocation(location)}>
                    <View>
                      <Text style={styles.item}>{location[0]}</Text>
                    </View>
                  </TouchableOpacity>
                  <Separator style={{ marginTop: 0 }} />
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
      <View style={{ ...styles.SearchBar, ...(style || {}) }}>
        <View style={styles.searchContainer}>
          <Icon name="magnifying-glass" size={20} color={AppColor.icon} />
          <View style={styles.textContainer}>
            {!isInputFocused && inputValue === '' && (
              <View style={styles.labelContainer}>
                <Text style={styles.title}>{title}</Text>
                {subtext && <Text style={[AppStyles.subtext, { marginTop: 0 }]}>{subtext}</Text>}
              </View>
            )}
            <TextInput
              style={styles.title}
              value={inputValue}
              onChangeText={handleSearch}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              selectionColor={AppColor.icon}
            />
          </View>
        </View>
        {!isInputFocused && (
          <TouchableOpacity style={styles.icon} onPress={onPress}>
            <Icon name={icon} size={20} color={AppColor.icon} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default SearchBar;
