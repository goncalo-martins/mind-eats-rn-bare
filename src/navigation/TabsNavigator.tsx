import FavouriteIcon from '../../assets/images/icons/favourite';
import HomeIcon from '../../assets/images/icons/home';
import { BaseColors } from '../constants/colors';
import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favourites from '../screens/favourites';
import Homepage from '../screens/homepage';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: BaseColors.highlightDarkest,
        tabBarInactiveTintColor: BaseColors.neutralLightMedium,
        headerShown: false,
      }}
    >
      <Tab.Screen
        component={Homepage}
        name="index"
        options={{
          title: 'Home',
          unmountOnBlur: true,
          tabBarTestID: 'home-tab',
          tabBarLabel: ({ focused, color, children }) => (
            <Text
              style={{
                marginTop: 6,
                color: focused
                  ? BaseColors.neutralDarkDarkest
                  : BaseColors.neutralDarkLightest,
                fontSize: 12,
                fontFamily: focused ? 'Epilogue-Bold' : 'Epilogue-Medium',
              }}
            >
              {children}
            </Text>
          ),
          tabBarIcon: ({ color }) => <HomeIcon size={20} color={color} />,
        }}
      />
      <Tab.Screen
        component={Favourites}
        name="favourites"
        options={{
          title: 'Favourites',
          unmountOnBlur: true,
          tabBarTestID: 'favourites-tab',
          tabBarLabel: ({ focused, color, children }) => (
            <Text
              style={{
                marginTop: 6,
                color: focused
                  ? BaseColors.neutralDarkDarkest
                  : BaseColors.neutralDarkLightest,
                fontSize: 12,
                fontFamily: focused ? 'Epilogue-Bold' : 'Epilogue-Medium',
              }}
            >
              {children}
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <FavouriteIcon height={20} width={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
