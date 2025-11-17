import React from 'react';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

// --- THIS IS THE FIX ---
// 1. Import the new UserProvider
import { UserProvider } from './src/context/UserContext';
// --- END OF FIX ---

export default function App() {
  return (
    // --- THIS IS THE FIX ---
    // 2. Wrap your CartProvider with the UserProvider
    <UserProvider>
      <CartProvider>
        <AppNavigator />
        <Toast />
      </CartProvider>
    </UserProvider>
    // --- END OF FIX ---
  );
}