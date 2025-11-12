import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCart } from '../context/CartContext'; // <-- Import the hook

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

// --- Cart Item Component ---
// Now receives functions from the context
const CartItem = ({ item, onRemove, onUpdateQty, onToggleCheck }) => {
  return (
    <View style={styles.card}>
      <View style={styles.itemRow}>
        <TouchableOpacity style={styles.checkbox} onPress={onToggleCheck}>
          <MaterialCommunityIcons
            name={item.checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={NAVY}
          />
        </TouchableOpacity>

        <Image source={{ uri: item.img }} style={styles.itemImage} />
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSpecs} numberOfLines={3}>{item.specs}</Text>
        </View>

        <View style={styles.quantityStepper}>
          <TouchableOpacity onPress={() => onUpdateQty(1)}>
            <Feather name="plus-circle" size={20} color={GRAY_MEDIUM} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onUpdateQty(-1)}>
            <Feather name="minus-circle" size={20} color={GRAY_MEDIUM} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemFooter}>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
        <Text style={styles.priceText}>₱{item.price}/day</Text>
      </View>
    </View>
  );
};

// --- Main Cart Screen ---
export default function CartScreen({ navigation }) {
  // Get all data and functions from the Cart Context
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    toggleItemChecked,
    toggleSelectAll,
    totalPrice,
    isAllChecked,
  } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <FlatList
        data={cartItems} // <-- Use live data from context
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            // Pass context functions down
            onRemove={() => removeFromCart(item.id)}
            onUpdateQty={(amount) => updateQuantity(item.id, amount)}
            onToggleCheck={() => toggleItemChecked(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="shopping-cart" size={60} color={GRAY_MEDIUM} />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.browseText}>Start browsing</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* --- Footer --- */}
      {/* Only show footer if there are items */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkAllRow} onPress={toggleSelectAll}>
            <MaterialCommunityIcons
              name={isAllChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={NAVY}
            />
            <Text style={styles.checkAllText}>All</Text>
          </TouchableOpacity>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total: </Text>
            <Text style={styles.totalPrice}>₱{totalPrice}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Space for the footer
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 8,
    marginTop: 4,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: GRAY_LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  itemSpecs: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    marginTop: 4,
    lineHeight: 16,
  },
  quantityStepper: {
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginVertical: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  removeText: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 24, // Extra padding for home bar
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  checkAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkAllText: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    marginLeft: 8,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
  },
  checkoutButton: {
    backgroundColor: YELLOW_PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  checkoutText: {
    color: TEXT_PRIMARY,
    fontWeight: 'bold',
    fontSize: 15,
  },
});