import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
import { useCart } from '../context/CartContext';
// --- THIS IS THE FIX (Part 1) ---
import Toast from 'react-native-toast-message'; // Import the Toast library
// --- END OF FIX ---

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const YELLOW_ACCENT = '#FFE58A';
const GREEN_PRIMARY = '#10B981';
const GREEN_ACCENT = '#D1FAE5';
const PRIMARY_BLUE = '#0029F3';
const BORDER_LIGHT = '#E5E7EB'; 
const YELLOW_PRIMARY = '#FDB022';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params; 
  const { addToCart, cartItems, toggleItemChecked } = useCart();

  // --- THIS IS THE FIX (Part 2) ---
  const handleAddToCart = () => {
    addToCart(product);
    // Show a success pop-up instead of navigating
    Toast.show({
      type: 'success', // This will be a green pop-up
      text1: 'Added to Cart',
      text2: `${product.title} was added to your cart.`,
      position: 'top',
      visibilityTime: 2000, // Show for 2 seconds
    });
    // navigation.navigate('Cart'); // <-- We remove this line
  };
  // --- END OF FIX ---

  const handleRentNow = () => {
    const itemInCart = cartItems.find(item => item.id === product.id);
    if (!itemInCart) {
      addToCart(product);
    } 
    else if (!itemInCart.checked) {
      toggleItemChecked(product.id);
    }
    
    navigation.navigate('Checkout', {
      items: [{ ...product, quantity: 1, checked: true }], 
      total: product.price,
    });
  };

  const handleChat = () => {
    navigation.navigate('Chat', { 
      userName: `Chat with ${product.owner}`,
    });
  };

  const handleCheckAvailability = () => {
    navigation.navigate('Calendar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.img }} style={styles.image} resizeMode="contain" />
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>AVAILABLE</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>₱{product.price}/day</Text>

          <TouchableOpacity 
            style={styles.availabilityButton}
            onPress={handleCheckAvailability}
          >
            <Feather name="calendar" size={16} color={PRIMARY_BLUE} />
            <Text style={styles.availabilityButtonText}>Check Availability</Text>
          </TouchableOpacity>
          
          <View style={styles.ownerSection}>
            <View style={styles.ownerInfo}>
              <View style={styles.ownerRow}>
                <Feather name="user" size={16} color={GRAY_MEDIUM} />
                <Text style={styles.ownerText}>Posted by {product.owner}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Feather name="star" size={16} color={YELLOW_PRIMARY} />
                <Text style={styles.ratingText}>
                  {product.rating.toFixed(1)} 
                  <Text style={styles.reviewCount}> ({product.reviewCount} reviews)</Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={handleChat}
            >
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{product.desc}</Text>
        </View>
      </ScrollView>

      {/* --- Bottom Action Bar --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.pillBtn, styles.cartBtn]}
          onPress={handleAddToCart} // <-- This now shows the pop-up
        >
          <MaterialCommunityIcons name="cart-plus" size={18} color={TEXT_PRIMARY} />
          <Text style={styles.pillText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pillBtn, styles.rentBtn]}
          onPress={handleRentNow}
        >
          <MaterialCommunityIcons name="wallet" size={18} color={TEXT_PRIMARY} />
          <Text style={styles.pillText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Styles (Unchanged) ---
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
  availabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    marginBottom: 16,
  },
  availabilityButtonText: {
    color: PRIMARY_BLUE,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerText: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    marginLeft: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginLeft: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    fontWeight: 'normal',
  },
  chatButton: {
    backgroundColor: PRIMARY_BLUE + '1A', 
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  chatButtonText: {
    color: PRIMARY_BLUE,
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 24,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderColor: BORDER_LIGHT,
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