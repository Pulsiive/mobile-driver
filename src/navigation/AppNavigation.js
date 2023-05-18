import React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppIcon, AppStyles } from '../AppStyles';

import DrawerContainer from '../components/DrawerContainer';

import Welcome from '../screens/welcome/Welcome';
import Login from '../screens/login/Login';
import SignUp from '../screens/register/SignUp';
import Home from '../screens/home/Home';
import Settings from '../screens/settings/Settings';
import Logout from '../screens/settings/Logout';
import ChangePassword from '../screens/settings/ChangePassword';
import ChangeEmail from '../screens/settings/ChangeEmail';
import Profile from '../screens/profile/Profile';
import Owner from '../screens/profile/Owner';
import Calendar from '../screens/profile/Calendar';
import Station from '../screens/station/Station';
import Stations from '../screens/station/Stations';
import Messages from '../screens/communication/Messages';
import Message from '../screens/communication/Message';
import Map from '../screens/map/Map';
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

const Stack = createStackNavigator();

const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const MessagesStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
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
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold' }
      }}
    />
    <Stack.Screen name="Calendar" component={Calendar} />
    <Stack.Screen name="Station" component={Station} />
    <Stack.Screen name="Stations" component={Stations} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
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
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
    <Stack.Screen name="Logout" component={Logout} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen
      name="Contacts"
      component={Contact}
      options={{
        headerShown: true,
        headerTitle: 'Contact',
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold' }
      }}
    />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen
      name="Map"
      component={Map}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: { paddingLeft: 10 }
      })}
    />
    <Stack.Screen name="Locations" component={Locations} />
  </Stack.Navigator>
);

const PlanningStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
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

const FavoritesStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
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

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarInactiveTintColor: 'grey',
      tabBarActiveTintColor: AppStyles.color.tint,
      headerShown: false
    }}
  >
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
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
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
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
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
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
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
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
        tabBarLabel: 'Messages',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
              }}
              source={AppIcon.images.messages}
            />
          );
        }
      }}
      name="MessagesStack"
      component={MessagesStack}
    />
  </BottomTab.Navigator>
);

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
    <Stack.Screen name="LoginStack" component={LoginStack} />
    <Stack.Screen name="ReqEmailVerification" component={ReqEmailVerification} options={{headerShown: false}}/>
    <Stack.Screen name="ReqPhoneNumberOTP" component={ReqPhoneNumberOTP} options={{headerShown: false}}/>
    <Stack.Screen name="VerifyEmailToken" component={VerifyEmailToken} options={{headerShown: false}}/>
    <Stack.Screen name="SendEmailConfirmation" component={SendEmailConfirmation} options={{headerShown: false}}/>
    <Stack.Screen name="VerifyPhoneNumberOTP" component={VerifyPhoneNumberOTP} options={{headerShown: false}}/>
    <Stack.Screen name="DrawerStack" component={DrawerStack} />
    <Stack.Screen name="StationRating" component={StationRating} />
    <Stack.Screen name="BookingPlanning" component={BookingPlanning} />
    <Stack.Screen name="PaymentUICustomScreen" component={PaymentsUICustomScreen} />
    <Stack.Screen name="Panier" component={Panier} options={{headerShown: false}}/>
    <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}}/>
    <Stack.Screen name="PaymentHistory" component={PaymentHistory} options={{headerShown: false}}/>
    <Stack.Screen name="OwnerRating" component={OwnerRating} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
    <FlashMessage position="top"/>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  iconStyle: { tintColor: AppStyles.color.tint, width: 30, height: 30 }
});

export default AppNavigator;
