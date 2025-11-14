import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// (Your other imports)
import CartScreen from '../screens/CartScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ConfigureSettingsScreen from '../screens/ConfigureSettingsScreen';
import CreateListingScreen from '../screens/CreateListingScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LeaveReviewScreen from '../screens/LeaveReviewScreen';
import LoginScreen from '../screens/LoginScreen';
import MyListingsScreen from '../screens/MyListingsScreen';
import MyRentalsScreen from '../screens/MyRentalsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RentalDetailsScreen from '../screens/RentalDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';

// --- ADD IMPORT FOR NEW CALENDAR SCREEN ---
import CalendarScreen from '../screens/CalendarScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome" 
        screenOptions={{ headerShown: false }}
      >
        {/* --- Main App Stack --- */}
        <Stack.Group>
          {/* (All your other screens) */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="HomeTabs" component={MainTabNavigator} />
          
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Settings', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="ConfigureSettings" component={ConfigureSettingsScreen} options={{ headerShown: true, title: 'Configure Settings', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, title: 'My Cart', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: true, title: 'Item Details', headerStyle: { backgroundColor: '#F3F44F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: true, title: 'Checkout', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ headerShown: true, title: 'Receipt', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center', headerLeft: () => null }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: 'Notifications', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: true, title: 'My Messages', headerStyle: { backgroundColor: '#F3F4Verify:6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ headerShown: true, title: route.params.userName, headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' })} />
          <Stack.Screen name="MyListings" component={MyListingsScreen} options={{ headerShown: true, title: 'My Listings', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="RentalDetails" component={RentalDetailsScreen} options={{ headerShown: true, title: 'Rental Details', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen name="MyRentals" component={MyRentalsScreen} options={{ headerShown: true, title: 'My Rentals', headerStyle: { backgroundColor: '#F3F4F6' }, headerShadowVisible: false, headerTitleAlign: 'center' }} />
        </Stack.Group>
        
        {/* --- Modal Stack Group --- */}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen 
            name="CreateListing" 
            component={CreateListingScreen} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="LeaveReview" 
            component={LeaveReviewScreen} 
            options={{
              headerShown: false,
            }}
          />
          {/* --- THIS IS THE FIX --- */}
          <Stack.Screen 
            name="Calendar" 
            component={CalendarScreen} 
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}