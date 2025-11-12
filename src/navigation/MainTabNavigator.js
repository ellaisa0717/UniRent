import { Feather } from '@expo/vector-icons'; // <-- Import Feather
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors'; // <-- Import COLORS

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>•</Text>, // Your original icon
        headerShown: false, // <-- Hide header by default (as you had)
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // --- This is the fix for Bug 2 ---
          headerShown: true, // <-- Show header ONLY for the Home screen
          headerStyle: {
            backgroundColor: COLORS.white, // Match your screen's bg
            shadowColor: 'transparent', // Remove shadow
            elevation: 0,
          },
          headerTitle: () => ( // <-- Add your logo
            <Image
              source={require('../assets/images/logo.png')}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => ( // <-- Add your cart icon
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Feather name="shopping-cart" size={24} color="#0F172A" />
            </TouchableOpacity>
          ),
          // --- End of fix ---
        }}
      />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}