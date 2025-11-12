import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // For date selection
import { format } from 'date-fns'; // For formatting dates
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
import { useCart } from '../context/CartContext'; // To get cart items and total

// Define colors
const PRIMARY_BLUE = '#0029F3'; // Your new main color
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

export default function CheckoutScreen({ navigation }) {
  // Get only the *checked* items and their total price
  const { cartItems, totalPrice } = useCart();
  const itemsToCheckout = cartItems.filter(item => item.checked);

  // State for Rental Period
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // Default to 2 days
    return tomorrow;
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // State for Payment Method
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // Default to Cash

  // Calculate rental days
  const rentalDays = useMemo(() => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; // At least 1 day
  }, [startDate, endDate]);

  // Calculate total price based on rental days
  const finalTotalPrice = useMemo(() => {
    return totalPrice * rentalDays;
  }, [totalPrice, rentalDays]);

  // Date picker handlers
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
    navigation.navigate('Receipt', {
      cartItems: itemsToCheckout,
      totalPrice: finalTotalPrice,
      rentalDates: {
        startDate: format(startDate, 'MM/dd/yyyy'),
        endDate: format(endDate, 'MM/dd/yyyy'),
      },
      paymentMethod: paymentMethod,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Rental Period Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
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
              minimumDate={new Date(startDate.getTime() + 86400000)} // Min end date is 1 day after start
            />
          )}
        </View>

        {/* Rented Items Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rental Items</Text>
          {itemsToCheckout.map((item, index) => (
            <View 
              key={item.id} 
              style={[
                styles.itemRow, 
                index === itemsToCheckout.length - 1 && styles.lastItemRow // Remove border on last item
              ]}
            >
              <Image source={{ uri: item.img }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>₱{item.price}/day</Text>
              </View>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ({rentalDays} {rentalDays === 1 ? 'day' : 'days'}):</Text>
            <Text style={styles.totalValue}>₱{finalTotalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity 
            style={styles.paymentOption} 
            onPress={() => setPaymentMethod('Cash')}
          >
            <Text style={styles.paymentText}>Cash</Text>
            <MaterialCommunityIcons
              name={paymentMethod === 'Cash' ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={PRIMARY_BLUE}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.paymentOption} 
            onPress={() => setPaymentMethod('GCash')}
          >
            <Text style={styles.paymentText}>GCash</Text>
            <MaterialCommunityIcons
              name={paymentMethod === 'GCash' ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={PRIMARY_BLUE}
            />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* --- Footer - Pay Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    borderBottomWidth: 0, // Remove border for the last item
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
    paddingBottom: 24, // Extra space for home bar
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