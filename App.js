import React from 'react';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';
// --- THIS IS THE FIX ---
import Toast from 'react-native-toast-message';
// --- END OF FIX ---

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
      {/* --- THIS IS THE FIX --- */}
      {/* This component sits on top of your whole app */}
      <Toast />
      {/* --- END OF FIX --- */}
    </CartProvider>
  );
}