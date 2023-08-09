import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

const ContextTheme = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const AppColor = isDarkMode ? AppStyles.darkStyles : AppStyles.lightStyles;

  return (
    <ContextTheme.Provider value={{ isDarkMode, toggleTheme, AppColor }}>
      {children}
    </ContextTheme.Provider>
  );
};

export const useTheme = () => {
  return useContext(ContextTheme);
};

const CustomHeader = ({ navigation }) => {
  const { toggleTheme, AppColor } = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: AppColor.bottomColor,
        top: 15,
        left: 15
      }}
    >
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={AppColor.background} />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => toggleTheme()}>
        <Icon name="chevron-left" size={20} color={AppColor.subText} />
      </TouchableOpacity>
    </View>
  );
};
export default CustomHeader;

export const AppStyles = {
  lightStyles: {
    background: 'white',
    pulsive: '#81CD2C',
    title: 'black',
    text: 'black',
    subText: '#1c2024',
    label: '#1c2024',
    pressed: 'whitesmoke',
    error: 'firebrick',
    border: '#1c2024',
    borderFocused: 'black',
    disabled: 'lightgrey',
    secured: '#1c2024',
    icon: 'grey',
    separator: 'lightgrey',
    bottomColor: '#F3F3F3'
  },

  darkStyles: {
    background: '#1c2024',
    pulsive: '#81CD2C',
    title: '#D1D1D1',
    text: '#747679',
    subText: '#747679',
    label: '#747679',
    pressed: 'whitesmoke',
    error: 'firebrick',
    border: '#747679',
    borderFocused: 'white',
    disabled: '#747679',
    secured: '#747679',
    icon: 'grey',
    separator: '#2E343B',
    bottomColor: '#2E343B'
  },

  color: {
    // pulsiveDark: '#436342',
    // pulsiveDark: '#4D8837',

    overlay: 'rgba(0, 0, 0, 0.5)',
    transparent: 'transparent',

    //---------------------- à supprimer à terme
    background: 'white',
    pulsive: '#81CD2C',
    title: 'black',
    text: 'black',
    subText: 'darkgrey',
    label: 'darkgrey',
    pressed: 'whitesmoke',
    error: 'firebrick',
    border: 'darkgrey',
    borderFocused: 'black',
    disabled: 'darkgrey',
    secured: 'darkgrey',
    separator: 'lightgrey',

    white: 'white',
    grey: 'grey',

    //----------------------
    main: '#5ea23a',
    subtitle: '#545454',
    tint: '#7fb27c',
    description: '#bbbbbb',
    facebook: '#337472',
    greenBlue: '#00aea8'
  },

  fontSize: {
    title: 24,
    content: 20,
    button: 16,
    normal: 16,
    subText: 14
  },

  buttonWidth: width * 0.9,

  subtext: {
    fontSize: 14,
    marginTop: 2,
    color: 'darkgrey',
    fontWeight: '300'
  },

  container: {
    flex: 1
  },

  containerHeader: {
    flex: 1,
    paddingTop: 50
  },

  //------------- à enlever à la fin -------------------
  borderRadius: 25,

  textInputWidth: {
    main: '80%'
  }
};

export const AppIcon = {
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    marginRight: 10
  },
  style: {
    tintColor: AppStyles.color.pulsive,
    width: 25,
    height: 25
  },
  images: {
    home: require('../assets/icons/home.png'),
    profile: require('../assets/icons/profile_2.png'),
    profile_icon: require('../assets/icons/profile.png'),
    logout: require('../assets/icons/shutdown.png'),
    menu: require('../assets/icons/menu.png'),
    settings: require('../assets/icons/settings.png'),
    leftArrow: require('../assets/icons/left_arrow.png'),
    station: require('../assets/icons/plug.png'),
    station_img: require('../assets/icons/station.png'),
    messages: require('../assets/icons/messages.png'),
    mapicon: require('../assets/icons/mapicon.png'),
    map: require('../assets/icons/map.png'),
    planning: require('../assets/icons/planning.png'),
    heart: require('../assets/icons/heart.png'),
    charger1: require('../assets/images/charger1.jpg'),
    charger2: require('../assets/images/charger2.jpg'),
    charger3: require('../assets/images/charger3.jpg'),
    phone: require('../assets/icons/phone.png'),
    remove: require('../assets/icons/remove.png'),
    avis: require('../assets/images/avis.png'),
    logo: require('../assets/images/logo.png'),
    logo2: require('../assets/images/logo-2.png'),
    notif: require('../assets/images/notif.png'),
    Pulsiive: require('../assets/images/Pulsiive.png'),
    pulsive: require('../assets/images/pulsive.png'),
    bill: require('../assets/images/bill.png'),
    calendar: require('../assets/images/calendar.png'),
    back: require('../assets/images/back.png'),
    arrowRight: require('../assets/images/arrow_right.png'),
    borne: require('../assets/images/borne.jpg'),
    eclair: require('../assets/images/eclair.png'),
    historyUser: require('../assets/images/history_user.png'),
    location: require('../assets/images/location.png'),
    proprio: require('../assets/images/proprio.png'),
    station1: require('../assets/images/station1.png'),
    station2: require('../assets/images/station2.png'),
    station3: require('../assets/images/station3.png'),
    time: require('../assets/images/time.png'),
    visa: require('../assets/images/visa.png'),
    xMark: require('../assets/images/x-mark.png'),
    applePay: require('../assets/images/apple-pay.png')
  }
};

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: AppStyles.color.subtitle,
    fontWeight: 'bold'
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 10
  },
  leftSubtitle: {
    flex: 2
  },
  avatarStyle: {
    height: 80,
    width: 80
  }
});
