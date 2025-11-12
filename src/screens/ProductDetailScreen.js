import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCart } from '../context/CartContext'; // Still needed for 'Add to Cart'

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const YELLOW_ACCENT = '#FFE58A';
const GREEN_PRIMARY = '#10B981';
const GREEN_ACCENT = '#D1FAE5';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params; 
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate('Cart'); 
  };

  // --- THIS IS THE FIX ---
  const handleRentNow = () => {
    // 1. Create a single-item array in the same format as a cart item
    const itemToRent = {
      ...product,
      quantity: 1, // Default to 1
      checked: true, // Default to checked
    };
    
    // 2. Navigate to Checkout, passing ONLY this item and its base price
    navigation.navigate('Checkout', {
      items: [itemToRent], // Pass as an array
      total: product.price, // Pass the base price
    });
  };
  // --- END OF FIX ---

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView>
        {/* (Image Container... unchanged) */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.img }} style={styles.image} resizeMode="contain" />
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>AVAILABLE</Text>
          </View>
        </View>

        {/* (Product Info... unchanged) */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>₱{product.price}/day</Text>
          <Text style={styles.description}>{product.desc}</Text>
        </View>
      </ScrollView>

      {/* --- Bottom Action Bar --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.pillBtn, styles.cartBtn]}
          onPress={handleAddToCart}
        >
          <MaterialCommunityIcons name="cart-plus" size={18} color={TEXT_PRIMARY} />
          <Text style={styles.pillText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pillBtn, styles.rentBtn]}
          onPress={handleRentNow} // <-- Updated
        >
          <MaterialCommunityIcons name="wallet" size={18} color={TEXT_PRIMARY} />
          <Text style={styles.pillText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  imageContainer: {
    backgroundColor: WHITE,
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: GREEN_ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN_PRIMARY,
    marginRight: 6,
  },
  badgeText: {
    color: '#065F46',
    fontWeight: '700',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 24, // For home bar
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  cartBtn: {
    backgroundColor: YELLOW_ACCENT,
    marginRight: 8,
  },
  rentBtn: {
    backgroundColor: YELLOW_ACCENT,
    marginLeft: 8,
  },
  pillText: {
    color: TEXT_PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
  },
});