import React, { createContext, useContext, useMemo, useState } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create the provider (the component that holds the state)
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // --- Core Cart Functions ---

  // Add an item to the cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If new item, add to cart
      return [...prevItems, { ...product, quantity: 1, checked: true }];
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update item quantity (+ or -)
  const updateQuantity = (productId, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove if quantity reaches 0
    );
  };

  // Toggle the 'checked' status of a single item
  const toggleItemChecked = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Check or uncheck all items
  const toggleSelectAll = () => {
    const allChecked = cartItems.every(item => item.checked);
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, checked: !allChecked }))
    );
  };

  // --- Memoized Calculations ---

  // Calculate the total number of items in the cart
  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Calculate the total price of *checked* items
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return item.checked ? sum + (item.price || 0) * item.quantity : sum;
    }, 0);
  }, [cartItems]);

  // Check if all items are selected
  const isAllChecked = useMemo(() => {
    return cartItems.length > 0 && cartItems.every(item => item.checked);
  }, [cartItems]);

  // 3. Provide these values to all children
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItemChecked,
    toggleSelectAll,
    itemCount,
    totalPrice,
    isAllChecked,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4. Create a custom hook to easily use the context
export const useCart = () => {
  return useContext(CartContext);
};