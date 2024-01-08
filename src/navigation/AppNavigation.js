import React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppIcon, AppStyles, useTheme } from '../AppStyles';

import DrawerContainer from '../components/DrawerContainer';

import Login from '../screens/login/Login';
import SignUp from '../screens/register/SignUp';
import Home from '../screens/home/Home';
import Settings from '../screens/settings/Settings';
import NotificationScreen from '../screens/settings/NotificationScreen';
import Profile from '../screens/profile/Profile';
import Owner from '../screens/profile/Owner';
import Calendar from '../screens/profile/Calendar';
import Station from '../screens/station/Station';
import Stations from '../screens/station/Stations';
import Messages from '../screens/communication/Messages';
import Message from '../screens/communication/Message';
import Map from '../screens/map/MapNew';
import Locations from '../screens/map/Locations';
import Planning from '../screens/planning/Planning';
import StationRating from '../screens/rating/StationRating';
import OwnerRating from '../screens/rating/OwnerRating';
import Favorites from '../screens/favorites/Favorites';
import Contact from '../screens/contacts/ContactList';
import OwnerV2 from '../screens/profile/OwnerV2';
import PaymentsUICustomScreen from '../screens/payment/PaymentUICustomScreen';
import BookingPlanning from '../screens/booking/BookingPlanning';
import FlashMessage from 'react-native-flash-message';
import ReqEmailVerification from '../screens/verification/ReqEmailVerification';
import VerifyEmailToken from '../screens/verification/VerifyEmailToken';
import VerifyPhoneNumberOTP from '../screens/verification/VerifyPhoneNumberOTP';
import SendEmailConfirmation from '../screens/verification/SendEmailConfirmation';
import ReqPhoneNumberOTP from '../screens/verification/ReqPhoneNumberOTP';
import Checkout from '../screens/payment/Checkout';
import Panier from '../screens/payment/Panier';
import PaymentHistory from '../screens/payment/History';
import InitLinkComponent from '../components/InitLinkComponent';
import StationInformations from '../screens/station/StationInformations';
import PromoCodesPage from '../screens/promo/Codepromo';
import Fonctionnement from '../screens/settings/Fonctionnement';

import Components from '../screens/components/Components';
import CustomHeader from '../AppStyles';

import { UserProvider } from '../contexts/UserContext';

const Stack = createStackNavigator();

const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      header: ({ navigation }) => <CustomHeader navigation={navigation} />
    }}
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const MessagesStack = () => {
  const { AppColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }}
    >
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={({ navigation }) => ({
          headerLeft: () => <></>,
          headerLeftContainerStyle: { paddingLeft: 10 }
        })}
      />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen
        name="Owner"
        component={OwnerV2}
        options={{
          headerShown: true,
          headerTitle: 'Profil',
          headerStyle: { backgroundColor: 'white' },
          headerTitleStyle: { color: 'black', fontWeight: 'bold' }
        }}
      />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Station" component={Station} />
      <Stack.Screen name="Stations" component={Stations} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  const { AppColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image style={styles.iconStyle} source={AppIcon.images.menu} />
            </Pressable>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 }
        })}
      />
      <Stack.Screen
        name="Contacts"
        component={Contact}
        options={{
          headerShown: true,
          headerTitle: 'Contact',
          headerStyle: { backgroundColor: 'white' },
          headerTitleStyle: { color: 'black', fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
};

const ProfilStack = () => {
  const { AppColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        header: ({ navigation }) => <CustomHeader navigation={navigation} />
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="PromoCodesPage" component={PromoCodesPage} />
      <Stack.Screen name="Fonctionnement" component={Fonctionnement} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Components" component={Components} />
    </Stack.Navigator>
  );
};

const MapStack = () => {
  const { AppColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ navigation }) => <CustomHeader navigation={navigation} />
      }}
    >
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Locations" component={Locations} />
    </Stack.Navigator>
  );
};

const PlanningStack = () => {
  const { AppColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }}
    >
      <Stack.Screen
        name="Planning"
        component={Planning}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image style={styles.iconStyle} source={AppIcon.images.menu} />
            </Pressable>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 }
        })}
      />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  const { AppColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image style={styles.iconStyle} source={AppIcon.images.menu} />
            </Pressable>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 }
        })}
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  const { AppColor } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColor.pulsive,
        tabBarInactiveTintColor: AppColor.icon,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: AppColor.bottomColor,
          borderTopWidth: 0,
          height: '7%'
        }
      }}
    >
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.home}
              />
            );
          }
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.heart}
              />
            );
          }
        }}
        name="FavoriteStations"
        component={FavoritesStack}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.map}
              />
            );
          }
        }}
        name="MapStack"
        component={MapStack}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Planning',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.planning}
              />
            );
          }
        }}
        name="PlanningStack"
        component={PlanningStack}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.logo}
              />
            );
          }
        }}
        name="PaymentHistory"
        component={PaymentHistory}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.messages}
              />
            );
          }
        }}
        name="MessagesStack"
        component={MessagesStack}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.profile_icon}
              />
            );
          }
        }}
        name="ProfilStack"
        component={ProfilStack}
      />
    </BottomTab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: { outerWidth: 200 },
      drawerPosition: 'left',
      headerShown: false
    }}
    drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
  >
    <Drawer.Screen name="Tab" component={TabNavigator} />
  </Drawer.Navigator>
);

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="LoginStack" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="InitLink" component={InitLinkComponent} />
    <Stack.Screen name="LoginStack" component={LoginStack} />
    <Stack.Screen
      name="ReqEmailVerification"
      component={ReqEmailVerification}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ReqPhoneNumberOTP"
      component={ReqPhoneNumberOTP}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VerifyEmailToken"
      component={VerifyEmailToken}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SendEmailConfirmation"
      component={SendEmailConfirmation}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VerifyPhoneNumberOTP"
      component={VerifyPhoneNumberOTP}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="DrawerStack" component={DrawerStack} />
    <Stack.Screen name="StationRating" component={StationRating} />
    <Stack.Screen name="BookingPlanning" component={BookingPlanning} />
    <Stack.Screen name="PaymentUICustomScreen" component={PaymentsUICustomScreen} />
    <Stack.Screen name="Panier" component={Panier} options={{ headerShown: false }} />
    <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
    <Stack.Screen name="OwnerRating" component={OwnerRating} />
    <Stack.Screen name="StationInformations" component={StationInformations} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { AppColor } = useTheme();

  return (
    <NavigationContainer
      style={{
        backgroundColor: AppColor.background
      }}
    >
      <UserProvider>
        <RootNavigator />
      </UserProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenOptions: {
    headerStyle: { borderBottomWidth: 1 },
    headerMode: 'screen',
    headerShadowVisible: true,
    headerTransparent: false,
    headerTitle: ''
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  iconStyle: { tintColor: AppStyles.color.pulsive, width: 30, height: 30 }
});

export default AppNavigator;
