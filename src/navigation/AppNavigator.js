import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import all your screens
import CartScreen from '../screens/CartScreen';
import ConfigureSettingsScreen from '../screens/ConfigureSettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';

// --- ADD IMPORTS FOR CHECKOUT AND RECEIPT ---
import CheckoutScreen from '../screens/CheckoutScreen';
import ReceiptScreen from '../screens/ReceiptScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome" 
        screenOptions={{ headerShown: false }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* Main App (Tabs) */}
        <Stack.Screen name="HomeTabs" component={MainTabNavigator} />

        {/* Profile Screens */}
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{
            headerShown: true,
            title: 'Edit Profile',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: 'Settings',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="ConfigureSettings" 
          component={ConfigureSettingsScreen}
          options={{
            headerShown: true,
            title: 'Configure Settings',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Cart & Product Screens */}
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            headerShown: true,
            title: 'My Cart',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={{
            headerShown: true,
            title: 'Item Details',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />

        {/* --- ADD CHECKOUT AND RECEIPT SCREENS --- */}
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{
            headerShown: true,
            title: 'Checkout',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="Receipt" 
          component={ReceiptScreen}
          options={{
            headerShown: true,
            title: 'Receipt',
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            // Hide the back button on the receipt screen
            headerLeft: () => null, 
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}