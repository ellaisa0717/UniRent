import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
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

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const YELLOW_ACCENT = '#FFE58A';
const BORDER_LIGHT = '#E5E7EB'; 

export default function ProductDetailScreen({ route, navigation }) {
  // FIXED: Removed the curly braces around product!
  const product = route.params.item; 
  
  const { addToCart, cartItems } = useCart();

  const isOccupied = product.status === "Occupied";
  const imageUrl = product.image 
    ? (product.image.startsWith('http') ? product.image : `http://192.168.5.95:8000${product.image}`) 
    : null;

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Added to Cart', `${product.title} was added to your cart.`);
  };

  const handleRentNow = () => {
    const itemInCart = cartItems.find(item => item.id === product.id);
    if (!itemInCart) {
      addToCart(product);
    } 
    // Go straight to checkout
    navigation.navigate('Checkout', {
      items: [{ ...product, quantity: 1, checked: true }], 
      total: product.price,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={[styles.image, { backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{color: '#94A3B8'}}>No Image</Text>
            </View>
          )}
          
          <View style={[styles.badge, { backgroundColor: isOccupied ? '#64748B' : '#D1FAE5' }]}>
            <Text style={[styles.badgeText, { color: isOccupied ? '#FFFFFF' : '#065F46' }]}>
              {product.status || "AVAILABLE"}
            </Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>₱{product.price}<Text style={{fontSize: 14, color: GRAY_MEDIUM, fontWeight: 'normal'}}>/day</Text></Text>

          <View style={styles.ownerSection}>
            <Feather name="user" size={16} color={GRAY_MEDIUM} />
            <Text style={styles.ownerText}>Posted by User ID: {product.owner}</Text>
          </View>

          <Text style={styles.descriptionTitle}>Item Description</Text>
          <Text style={styles.description}>{product.description || "No description provided by the owner."}</Text>
        </View>
      </ScrollView>

      {/* --- Bottom Action Bar --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.pillBtn, styles.cartBtn, isOccupied && {opacity: 0.5}]}
          onPress={handleAddToCart} 
          disabled={isOccupied}
        >
          <MaterialCommunityIcons name="cart-plus" size={18} color={TEXT_PRIMARY} />
          <Text style={styles.pillText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pillBtn, styles.rentBtn, isOccupied && {opacity: 0.5}]}
          onPress={handleRentNow}
          disabled={isOccupied}
        >
          <MaterialCommunityIcons name="wallet" size={18} color={WHITE} />
          <Text style={[styles.pillText, {color: WHITE}]}>{isOccupied ? "Occupied" : "Rent Now"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GRAY_LIGHT_BG },
  imageContainer: { backgroundColor: WHITE, padding: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  image: { width: '100%', height: 300 },
  badge: { position: 'absolute', top: 16, right: 16, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  badgeText: { fontWeight: '700', fontSize: 12 },
  detailsContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: TEXT_PRIMARY, marginBottom: 4 },
  category: { fontSize: 14, color: GRAY_MEDIUM, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 12 },
  price: { fontSize: 26, fontWeight: 'bold', color: NAVY, marginBottom: 20 },
  ownerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: BORDER_LIGHT },
  ownerText: { fontSize: 14, color: GRAY_MEDIUM, marginLeft: 8 },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', color: TEXT_PRIMARY, marginBottom: 8 },
  description: { fontSize: 16, color: GRAY_MEDIUM, lineHeight: 24 },
  footer: { flexDirection: 'row', padding: 16, paddingBottom: 24, backgroundColor: WHITE, borderTopWidth: 1, borderColor: BORDER_LIGHT },
  pillBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 8, gap: 8 },
  cartBtn: { backgroundColor: YELLOW_ACCENT, marginRight: 8 },
  rentBtn: { backgroundColor: NAVY, marginLeft: 8 },
  pillText: { fontWeight: 'bold', fontSize: 16 },
});