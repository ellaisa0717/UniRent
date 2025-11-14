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
const PRIMARY_BLUE = '#0029F3'; 
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022'; 

export default function ReceiptScreen({ route, navigation }) {
  const {
    cartItems,
    totalPrice,
    amountPaid,
    paymentType,
    rentalDates,
    paymentMethod,
  } = route.params;

  const remainingBalance = totalPrice - amountPaid;

  const handleContactOwner = () => {
    const firstItemOwner = cartItems[0]?.owner || 'Owner'; 
    navigation.navigate('Chat', {
      userName: `Chat with ${firstItemOwner}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Feather name="check-circle" size={60} color={PRIMARY_BLUE} />
          <Text style={styles.headerText}>Order Confirmed!</Text>
          <Text style={styles.subHeaderText}>Thank you for your rental.</Text>
        </View>

        <TouchableOpacity 
          style={styles.contactButton} 
          onPress={handleContactOwner}
        >
          <Feather name="message-square" size={20} color={TEXT_PRIMARY} />
          <Text style={styles.contactButtonText}>Contact Owner to Arrange Pickup</Text>
        </TouchableOpacity>


        {/* (Rental Details... unchanged) */}
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

        {/* (Rented Items... unchanged) */}
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
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Price:</Text>
              <Text style={styles.totalValue}>₱{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount Paid:</Text>
              <Text style={styles.totalValue}>₱{amountPaid.toFixed(2)}</Text>
            </View>
            {paymentType === 'Downpayment' && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabelRemaining}>Remaining Balance:</Text>
                <Text style={styles.totalValueRemaining}>₱{remainingBalance.toFixed(2)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* (Payment Method... unchanged) */}
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
        {/* --- THIS IS THE FIX --- */}
        <TouchableOpacity 
          style={styles.doneButton} 
          // This navigates to the "HomeTabs" navigator, which will show the "Home" screen
          onPress={() => navigation.navigate('HomeTabs', { screen: 'Home' })} 
        >
          <Text style={styles.doneButtonText}>Back to Home</Text>
        </TouchableOpacity>
        {/* --- END OF FIX --- */}
      </View>
    </SafeAreaView>
  );
}

// (Styles are unchanged)
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
    marginBottom: 16, 
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
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: YELLOW_PRIMARY,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginLeft: 10,
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
  totalSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  totalLabelRemaining: {
    fontSize: 18,
    color: PRIMARY_BLUE,
    fontWeight: 'bold',
  },
  totalValueRemaining: {
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
    paddingBottom: 24, 
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