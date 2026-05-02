import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from '../context/CartContext'; // To clear the cart on success

const NAVY = '#0B2B66'; 
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

export default function CheckoutScreen({ route, navigation }) {
  const { items, total } = route.params;
  const { clearCart } = useCart(); // Assuming you have this in your context!

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState("");
  const [occupiedLockers, setOccupiedLockers] = useState([]);
  const [isLoadingLockers, setIsLoadingLockers] = useState(true);

  const lockerOptions = ["A1", "B2", "C3", "D4", "E5"];

  // 1. Fetch items to see which lockers are currently in use
  useEffect(() => {
    const fetchLockers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch("http://192.168.5.95:8000/api/items/", {
          headers: { "Authorization": `Token ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
          const inUse = data
            .filter(item => item.status === "Occupied" && item.locker_label)
            .map(item => item.locker_label);
          setOccupiedLockers(inUse);
        }
      } catch (error) {
        console.error("Error fetching lockers:", error);
      } finally {
        setIsLoadingLockers(false);
      }
    };

    fetchLockers();
  }, []);

  // 2. Handle the secure checkout process
  const handleConfirmOrder = async () => {
    if (!selectedLocker) {
      Alert.alert("Action Required", "Please select an available IoT locker to proceed.");
      return;
    }

    setIsProcessing(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const itemIds = items.map(item => item.id);

      const response = await fetch("http://192.168.5.95:8000/api/checkout/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          item_ids: itemIds, 
          locker_id: selectedLocker 
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Order Confirmed!", `Your items will be assigned to Locker ${selectedLocker}.`);
        if (clearCart) clearCart(); // Empty the cart state
        
        // Navigate back to the main tabs, specifically to the Dashboard
        navigation.replace('HomeTabs', { screen: 'Dashboard' });
      } else {
        Alert.alert("Checkout Failed", data.error || "An error occurred.");
      }
    } catch (err) {
      Alert.alert("Network Error", "Could not reach the server.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

        {/* --- Locker Selection Section --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Pickup Details</Text>
          <Text style={{color: GRAY_MEDIUM, marginBottom: 15}}>Choose an available IoT Locker for pickup:</Text>
          
          {isLoadingLockers ? (
            <ActivityIndicator size="small" color={NAVY} />
          ) : (
            <View style={styles.lockerGrid}>
              {lockerOptions.map(locker => {
                const isOccupied = occupiedLockers.includes(locker);
                const isSelected = selectedLocker === locker;
                
                return (
                  <TouchableOpacity
                    key={locker}
                    disabled={isOccupied}
                    onPress={() => setSelectedLocker(locker)}
                    style={[
                      styles.lockerBtn,
                      isSelected && styles.lockerBtnSelected,
                      isOccupied && styles.lockerBtnOccupied
                    ]}
                  >
                    <Text style={[
                      styles.lockerText,
                      isSelected && styles.lockerTextSelected,
                      isOccupied && styles.lockerTextOccupied
                    ]}>
                      {locker} {isOccupied && "🔒"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={styles.paymentMethodBox}>
            <Text style={{fontWeight: 'bold', color: TEXT_PRIMARY, marginBottom: 5}}>Payment Method</Text>
            <Text style={{color: GRAY_MEDIUM}}>Cash on Pickup (Locker Kiosk)</Text>
          </View>
        </View>

        {/* --- Order Summary Section --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          {items.map((item, index) => {
             const imageUrl = item.image 
             ? (item.image.startsWith('http') ? item.image : `http://192.168.5.95:8000${item.image}`) 
             : null;

            return (
              <View key={item.id} style={[styles.itemRow, index === items.length - 1 && styles.lastItemRow]}>
                {imageUrl ? (
                  <Image source={{ uri: imageUrl }} style={styles.itemImage} />
                ) : (
                  <View style={[styles.itemImage, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={{fontSize: 10, color: GRAY_MEDIUM}}>No Image</Text>
                  </View>
                )}
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>₱{item.price}</Text>
                </View>
              </View>
            );
          })}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            {/* The total passed from CartScreen already includes the ₱50 service fee */}
            <Text style={styles.totalValue}>₱{total.toFixed(2)}</Text>
          </View>
        </View>

      </ScrollView>

      {/* --- Footer - Pay Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.payButton, (!selectedLocker || isProcessing) && {opacity: 0.6}]} 
          onPress={handleConfirmOrder}
          disabled={!selectedLocker || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color={TEXT_PRIMARY} />
          ) : (
            <Text style={styles.payButtonText}>
              Confirm Rental (₱{total.toFixed(2)})
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GRAY_LIGHT_BG },
  scrollViewContent: { padding: 16, paddingBottom: 100 },
  sectionCard: { backgroundColor: WHITE, borderRadius: 12, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: TEXT_PRIMARY, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: BORDER_LIGHT, paddingBottom: 10 },
  
  // Locker Grid Styles
  lockerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', marginBottom: 20 },
  lockerBtn: { width: '30%', paddingVertical: 15, borderRadius: 8, borderWidth: 1, borderColor: BORDER_LIGHT, alignItems: 'center', backgroundColor: WHITE },
  lockerBtnSelected: { borderColor: YELLOW_PRIMARY, backgroundColor: '#FEF3C7', borderWidth: 2 },
  lockerBtnOccupied: { backgroundColor: '#F1F5F9', borderColor: BORDER_LIGHT, opacity: 0.6 },
  lockerText: { fontWeight: 'bold', color: TEXT_PRIMARY, fontSize: 16 },
  lockerTextSelected: { color: '#B45309' },
  lockerTextOccupied: { color: GRAY_MEDIUM },
  
  paymentMethodBox: { backgroundColor: GRAY_LIGHT_BG, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: BORDER_LIGHT },
  
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER_LIGHT },
  lastItemRow: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 8 },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 12, backgroundColor: GRAY_LIGHT_BG, borderWidth: 1, borderColor: BORDER_LIGHT },
  itemDetails: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: TEXT_PRIMARY },
  itemPrice: { fontSize: 14, color: GRAY_MEDIUM, marginTop: 2 },
  
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 16, borderTopWidth: 1, borderTopColor: BORDER_LIGHT },
  totalLabel: { fontSize: 16, color: TEXT_PRIMARY, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: NAVY },
  
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: WHITE, paddingTop: 16, paddingBottom: 24, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: BORDER_LIGHT },
  payButton: { backgroundColor: YELLOW_PRIMARY, paddingVertical: 16, borderRadius: 10, alignItems: 'center' },
  payButtonText: { color: TEXT_PRIMARY, fontSize: 18, fontWeight: 'bold' },
});