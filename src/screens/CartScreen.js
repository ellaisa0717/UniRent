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
import { useCart } from '../context/CartContext';

const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

const CartItem = ({ item, onRemove, onToggleCheck }) => {
  const imageUrl = item.image 
    ? (item.image.startsWith('http') ? item.image : `http://192.168.5.95:8000${item.image}`) 
    : null;

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
        
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.itemImage} />
        ) : (
          <View style={[styles.itemImage, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{fontSize: 10, color: GRAY_MEDIUM}}>No Image</Text>
          </View>
        )}
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSpecs}>{item.category}</Text>
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

export default function CartScreen({ navigation }) {
  const {
    cartItems,
    removeFromCart,
    toggleItemChecked,
    toggleSelectAll,
    totalPrice, 
    isAllChecked,
  } = useCart();

  const checkedItems = cartItems.filter(item => item.checked);
  
  // Aligning with Web MVP Logic
  const serviceFee = 50;
  const finalTotal = checkedItems.length > 0 ? totalPrice + serviceFee : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <FlatList
        data={cartItems} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeFromCart(item.id)}
            onToggleCheck={() => toggleItemChecked(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="shopping-cart" size={60} color={GRAY_MEDIUM} />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.browseText}>Continue Browsing</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* --- Footer --- */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryBox}>
            <TouchableOpacity style={styles.checkAllRow} onPress={toggleSelectAll}>
              <MaterialCommunityIcons
                name={isAllChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color={NAVY}
              />
              <Text style={styles.checkAllText}>Select All</Text>
            </TouchableOpacity>
            
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.serviceFeeText}>Service Fee: ₱{serviceFee.toFixed(2)}</Text>
              <Text style={styles.totalText}>Total: <Text style={styles.totalPrice}>₱{finalTotal.toFixed(2)}</Text></Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.checkoutButton, checkedItems.length === 0 && styles.checkoutButtonDisabled]}
            onPress={() => navigation.navigate('Checkout', {
              items: checkedItems,
              total: finalTotal, // Pass the final amount including service fee
            })}
            disabled={checkedItems.length === 0}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GRAY_LIGHT_BG },
  listContainer: { padding: 16, paddingBottom: 150 },
  card: { backgroundColor: WHITE, borderRadius: 12, padding: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { marginRight: 8, marginTop: 20 },
  itemImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: GRAY_LIGHT_BG, borderWidth: 1, borderColor: BORDER_LIGHT },
  itemDetails: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: TEXT_PRIMARY, marginBottom: 4 },
  itemSpecs: { fontSize: 13, color: GRAY_MEDIUM, textTransform: 'uppercase', fontWeight: 'bold' },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, marginTop: 12, borderTopWidth: 1, borderTopColor: BORDER_LIGHT },
  removeText: { fontSize: 14, color: '#EF4444', fontWeight: '600' },
  priceText: { fontSize: 16, fontWeight: 'bold', color: NAVY },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingVertical: 16, paddingHorizontal: 16, paddingBottom: 24, backgroundColor: WHITE, borderTopWidth: 1, borderTopColor: BORDER_LIGHT },
  summaryBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  checkAllRow: { flexDirection: 'row', alignItems: 'center' },
  checkAllText: { fontSize: 14, color: TEXT_PRIMARY, marginLeft: 8, fontWeight: '600' },
  serviceFeeText: { fontSize: 12, color: GRAY_MEDIUM, marginBottom: 2 },
  totalText: { fontSize: 16, color: TEXT_PRIMARY },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: NAVY },
  checkoutButton: { backgroundColor: YELLOW_PRIMARY, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  checkoutButtonDisabled: { backgroundColor: '#FDE68A' },
  checkoutText: { color: TEXT_PRIMARY, fontWeight: 'bold', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyText: { fontSize: 18, color: GRAY_MEDIUM, marginTop: 15 },
  browseText: { fontSize: 16, color: NAVY, fontWeight: 'bold', marginTop: 10, padding: 10 },
});