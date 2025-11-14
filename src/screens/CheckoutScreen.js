import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Define colors
const PRIMARY_BLUE = '#0029F3'; 
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

export default function CheckoutScreen({ route, navigation }) {
  const { items, total } = route.params;

  // Check if we are in the "Rent Now" (single item) flow
  const isSingleItemRent = items.length === 1;
  const singleItem = isSingleItemRent ? items[0] : null;
  const [quantity, setQuantity] = useState(isSingleItemRent ? singleItem.quantity : 1);

  // State for Rental Period
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow;
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  // --- THIS IS THE FIX (Part 1) ---
  // State for Payment Method (GCash is now default)
  const paymentMethod = 'GCash';
  // State for Payment Option
  const [paymentType, setPaymentType] = useState('Full'); // 'Full' or 'Downpayment'
  // --- END OF FIX ---

  // Calculate rental days
  const rentalDays = useMemo(() => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; 
  }, [startDate, endDate]);

  // Calculate the FULL total price
  const finalTotalPrice = useMemo(() => {
    if (isSingleItemRent) {
      return singleItem.price * quantity * rentalDays;
    }
    return total * rentalDays; 
  }, [isSingleItemRent, singleItem, quantity, total, rentalDays]);

  // --- THIS IS THE FIX (Part 2) ---
  // Calculate the amount to be paid NOW
  const amountToPay = useMemo(() => {
    if (paymentType === 'Downpayment') {
      return finalTotalPrice / 2;
    }
    return finalTotalPrice;
  }, [paymentType, finalTotalPrice]);
  // --- END OF FIX ---

  // (Date picker handlers are unchanged)
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
    if (currentDate.getTime() >= endDate.getTime()) {
      const newEndDate = new Date(currentDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      setEndDate(newEndDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  // Handle Pay button press
  const handlePay = () => {
    let itemsToPay = items;
    if (isSingleItemRent) {
      itemsToPay = [{ ...singleItem, quantity: quantity }];
    }
    
    // --- THIS IS THE FIX (Part 3) ---
    // Pass the new payment details to the receipt
    navigation.navigate('Receipt', {
      cartItems: itemsToPay,
      totalPrice: finalTotalPrice,      // The full price
      amountPaid: amountToPay,          // The amount just paid
      paymentType: paymentType,         // "Full" or "Downpayment"
      rentalDates: {
        startDate: format(startDate, 'MM/dd/yyyy'),
        endDate: format(endDate, 'MM/dd/yyyy'),
      },
      paymentMethod: paymentMethod,
    });
    // --- END OF FIX ---
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* (Rental Period Section... unchanged) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          {/* ... (Date picker inputs) ... */}
           <TouchableOpacity style={styles.datePickerRow} onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.dateLabel}>Start Date:</Text>
            <Text style={styles.dateValue}>{format(startDate, 'MM/dd/yyyy')}</Text>
            <Feather name="chevron-down" size={20} color={GRAY_MEDIUM} />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
              minimumDate={new Date()}
            />
          )}
          <View style={styles.divider} />
          <TouchableOpacity style={styles.datePickerRow} onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.dateLabel}>End Date:</Text>
            <Text style={styles.dateValue}>{format(endDate, 'MM/dd/yyyy')}</Text>
            <Feather name="chevron-down" size={20} color={GRAY_MEDIUM} />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onEndDateChange}
              minimumDate={new Date(startDate.getTime() + 86400000)}
            />
          )}
        </View>

        {/* (Rented Items Section... unchanged) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rental Items</Text>
          {/* ... (Logic for single or multi-item display) ... */}
          {isSingleItemRent ? (
            <View style={[styles.itemRow, styles.lastItemRow]}>
              <Image source={{ uri: singleItem.img }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{singleItem.title}</Text>
                <Text style={styles.itemPrice}>₱{singleItem.price}/day</Text>
              </View>
              <View style={styles.quantityStepper}>
                <TouchableOpacity onPress={() => handleUpdateQuantity(1)}>
                  <Feather name="plus-circle" size={20} color={GRAY_MEDIUM} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => handleUpdateQuantity(-1)}>
                  <Feather name="minus-circle" size={20} color={GRAY_MEDIUM} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            items.map((item, index) => (
              <View 
                key={item.id} 
                style={[
                  styles.itemRow, 
                  index === items.length - 1 && styles.lastItemRow
                ]}
              >
                <Image source={{ uri: item.img }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>₱{item.price}/day</Text>
                </View>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
            ))
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ({rentalDays} {rentalDays === 1 ? 'day' : 'days'}):</Text>
            <Text style={styles.totalValue}>₱{finalTotalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* --- THIS IS THE FIX (Part 4) --- */}
        {/* --- New Payment Option Section --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Option</Text>
          <TouchableOpacity 
            style={styles.paymentOption} 
            onPress={() => setPaymentType('Full')}
          >
            <Text style={styles.paymentText}>Full Payment</Text>
            <MaterialCommunityIcons
              name={paymentType === 'Full' ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={PRIMARY_BLUE}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.paymentOption} 
            onPress={() => setPaymentType('Downpayment')}
          >
            <Text style={styles.paymentText}>Downpayment (50%)</Text>
            <MaterialCommunityIcons
              name={paymentType === 'Downpayment' ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={PRIMARY_BLUE}
            />
          </TouchableOpacity>
        </View>
        
        {/* --- Updated Payment Method Section --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentOption}>
            <Text style={styles.paymentText}>GCash</Text>
            <MaterialCommunityIcons
              name={'checkbox-marked'} // Always checked
              size={24}
              color={PRIMARY_BLUE}
            />
          </View>
        </View>
        {/* --- END OF FIX --- */}

      </ScrollView>

      {/* --- Footer - Pay Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          {/* --- THIS IS THE FIX (Part 5) --- */}
          <Text style={styles.payButtonText}>
            Pay ₱{amountToPay.toFixed(2)}
          </Text>
          {/* --- END OF FIX --- */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// (All styles are unchanged from the previous version)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 100, 
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
    paddingBottom: 10,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateLabel: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    marginRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER_LIGHT,
    marginVertical: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  lastItemRow: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: GRAY_LIGHT_BG,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  itemPrice: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },
  itemQuantity: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_PRIMARY,
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
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  totalLabel: {
    fontSize: 18,
    color: TEXT_PRIMARY,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  paymentText: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    paddingTop: 16,
    paddingBottom: 24, 
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  payButton: {
    backgroundColor: YELLOW_PRIMARY,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});