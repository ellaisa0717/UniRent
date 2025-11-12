import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { useCart } from '../context/CartContext';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// --- Cart Icon with Badge Component (Unchanged) ---
const CartIconWithBadge = ({ navigation }) => {
  const { itemCount } = useCart(); 

  return (
    <TouchableOpacity
      style={{ marginRight: 16 }}
      onPress={() => navigation.navigate('Cart')}
    >
      <Feather name="shopping-cart" size={24} color="#0F172A" />
      {itemCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function MainTabNavigator() {
  // Define colors for the tab bar
  const NAVY = '#0029F3';
  const GRAY_MEDIUM = '#6B7280';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: NAVY,
        tabBarInactiveTintColor: GRAY_MEDIUM,
        
        // --- THIS IS THE FIX ---
        // This explicitly tells the tab bar to center 
        // the content (icon + label) within each button.
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        // --- END OF FIX ---
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.white,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: () => (
            <Image
              source={require('../assets/images/logo.png')}
              style={{ width: 80, height: 50 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => <CartIconWithBadge navigation={navigation} />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#FDB022', 
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: '#111827',
    fontSize: 10,
    fontWeight: 'bold',
  },
});