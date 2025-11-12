import React from 'react';
import { CartProvider } from './src/context/CartContext'; // <-- Import
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // Wrap your entire app with the CartProvider
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}