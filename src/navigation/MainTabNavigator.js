import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { useCart } from '../context/CartContext';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// --- Cart Icon with Badge Component (Unchanged) ---
const CartIconWithBadge = ({ navigation }) => {
  const { itemCount } = useCart(); 

  return (
    <TouchableOpacity
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

// --- Header Icons Component (Unchanged) ---
const HeaderRightIcons = ({ navigation }) => {
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity 
        style={styles.headerIcon}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Feather name="bell" size={24} color="#0F172A" />
      </TouchableOpacity>
      <CartIconWithBadge navigation={navigation} />
    </View>
  );
};

// --- THIS IS THE "POST" BUTTON (FIXED) ---
const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.fabContainer}
    onPress={onPress}
  >
    <View style={styles.fab}>
      {/* --- Adjusted icon size --- */}
      <Feather name="plus" size={22} color="#FFFFFF" />
    </View>
  </TouchableOpacity>
);

// --- Dummy component for the "Post" tab ---
function PostDummyScreen() {
  return null;
}

export default function MainTabNavigator() {
  const NAVY = '#0B2B66';
  const GRAY_MEDIUM = '#6B7280';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: NAVY,
        tabBarInactiveTintColor: GRAY_MEDIUM,
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
        }
      }}
    >
      {/* --- Tab 1: Home --- */}
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
              style={{ width: 90, height: 33 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => <HeaderRightIcons navigation={navigation} />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        })}
      />
      
      {/* --- Tab 2: The new "Post" button --- */}
      <Tab.Screen 
        name="Post" 
        component={PostDummyScreen} 
        options={({ navigation }) => ({
          tabBarLabel: () => null, 
          tabBarIcon: () => null, 
          tabBarButton: () => (
            <CustomTabButton 
              onPress={() => navigation.navigate('CreateListing')} 
            />
          ),
        })}
      />

      {/* --- Tab 3: Profile --- */}
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
  // --- New styles for the FAB (FIXED) ---
  fabContainer: {
    position: 'relative',
    width: 60, // <-- Smaller width for the tap area
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    top: -22, // <-- Lifted up a bit less
    width: 50, // <-- Smaller width
    height: 50, // <-- Smaller height
    borderRadius: 25, // <-- Half of new width/height
    backgroundColor: '#0029F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  // --- End of FAB styles ---
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, 
  },
  headerIcon: {
    marginRight: 16, 
  },
});