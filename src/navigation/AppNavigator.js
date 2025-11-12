import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// (Your other imports)
import CartScreen from '../screens/CartScreen';
import ConfigureSettingsScreen from '../screens/ConfigureSettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';

// --- ADD IMPORT FOR NEW DETAIL SCREEN ---
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome" 
        screenOptions={{ headerShown: false }}
      >
        {/* (Your other screens) */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={MainTabNavigator} />
        
        {/* (Profile Screens) */}
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
        
        {/* (Cart Screen) */}
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

        {/* --- ADD NEW DETAIL SCREEN --- */}
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={{
            headerShown: true,
            title: 'Item Details', // You can set this dynamically if you want
            headerStyle: { backgroundColor: '#F3F4F6' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}