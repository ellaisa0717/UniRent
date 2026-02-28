import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext'; 
import { COLORS } from '../constants/colors';
import { useCart } from '../context/CartContext';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
// --- NEW LINE ADDED ---
import DashboardScreen from '../screens/DashboardScreen'; 

const Tab = createBottomTabNavigator();

const NAVY = '#0B2B66';
const GRAY_MEDIUM = '#6B7280';

// --- Cart Icon ---
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

// --- Header Icons ---
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

// --- "Post" button ---
const CustomTabButton = ({ onPress, isVerified }) => (
  <TouchableOpacity
    style={styles.fabContainer}
    onPress={onPress}
  >
    <View style={[styles.fab, !isVerified && styles.fabDisabled]}>
      <Feather name={isVerified ? "plus" : "lock"} size={22} color="#FFFFFF" />
    </View>
  </TouchableOpacity>
);

function PostDummyScreen() {
  return null;
}

export default function MainTabNavigator() {
  const { isVerified, isPending } = useUser();

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
      {/* --- NEW TAB ADDED: Dashboard (First Screen) --- */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />

      {/* --- Tab 2: Home --- */}
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
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        })}
      />
      
      {/* --- Tab 3: The "Post" button --- */}
      <Tab.Screen 
        name="Post" 
        component={PostDummyScreen} 
        options={({ navigation }) => ({
          tabBarLabel: () => null, 
          tabBarIcon: () => null, 
          tabBarButton: () => (
            <CustomTabButton 
              isVerified={isVerified}
              onPress={() => {
                if (isVerified) {
                  navigation.navigate('CreateListing');
                } else if (isPending) {
                  Alert.alert(
                    "Verification Pending",
                    "Your account is currently under review."
                  );
                } else {
                  Alert.alert(
                    "Verification Required",
                    "You must be a verified user to list an item.",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Get Verified", onPress: () => navigation.navigate('Verification') }
                    ]
                  );
                }
              }} 
            />
          ),
        })}
      />

      {/* --- Tab 4: Profile --- */}
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
  fabContainer: {
    position: 'relative',
    width: 60, 
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    top: -22, 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#0029F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  fabDisabled: {
    backgroundColor: GRAY_MEDIUM, 
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, 
  },
  headerIcon: {
    marginRight: 16, 
  },
});