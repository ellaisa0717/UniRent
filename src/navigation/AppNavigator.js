import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// MVP Core Screens ONLY
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          {/* Auth Flow */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          
          {/* Main App Tabs (Dashboard, Home, Profile) */}
          <Stack.Screen name="HomeTabs" component={MainTabNavigator} />
          
          {/* Stack Screens accessible from Tabs */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, title: 'My Cart', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: true, title: 'Item Details', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: true, title: 'Secure Checkout', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          
          {/* Profile Actions */}
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Settings', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}