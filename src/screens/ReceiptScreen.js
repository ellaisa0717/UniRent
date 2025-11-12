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

// Define colors
const PRIMARY_BLUE = '#0029F3'; // Your new main color
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';

export default function ReceiptScreen({ route, navigation }) {
  // Get data passed from the Checkout screen
  const { cartItems, totalPrice, rentalDates, paymentMethod } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Feather name="check-circle" size={60} color={PRIMARY_BLUE} />
          <Text style={styles.headerText}>Order Confirmed!</Text>
          <Text style={styles.subHeaderText}>Thank you for your rental.</Text>
        </View>

        {/* Rental Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Start Date:</Text>
            <Text style={styles.detailValue}>{rentalDates.startDate}</Text>
          </View>
          <View style={[styles.detailRow, { marginBottom: 0 }]}>
            <Text style={styles.detailLabel}>End Date:</Text>
            <Text style={styles.detailValue}>{rentalDates.endDate}</Text>
          </View>
        </View>

        {/* Rented Items */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rented Items</Text>
          {cartItems.map((item, index) => (
            <View 
              key={item.id} 
              style={[
                styles.itemRow,
                index === cartItems.length - 1 && styles.lastItemRow
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
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>₱{totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={[styles.detailRow, { marginBottom: 0 }]}>
            <MaterialCommunityIcons name="checkbox-marked" size={20} color={PRIMARY_BLUE} style={{ marginRight: 8 }} />
            <Text style={styles.detailValue}>{paymentMethod}</Text>
          </View>
        </View>
      </ScrollView>

      {/* --- Footer Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneButton} 
          // popToTop() goes all the way back to the first screen in the stack (HomeScreen)
          onPress={() => navigation.popToTop()} 
        >
          <Text style={styles.doneButtonText}>Back to Home</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
    backgroundColor: WHITE,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginTop: 15,
  },
  subHeaderText: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    marginTop: 5,
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: GRAY_MEDIUM,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
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
    paddingBottom: 0,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
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
    marginTop: 15,
    paddingTop: 15,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    paddingVertical: 15,
    paddingHorizontal: 16,
    paddingBottom: 24, // Extra space for home bar
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  doneButton: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});