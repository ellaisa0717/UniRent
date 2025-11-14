import { Feather } from '@expo/vector-icons';
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

export default function RentalDetailsScreen({ route, navigation }) {
  // We'll pass the rental details via route params
  const { rentalDetails } = route.params;

  const handleContactRenter = () => {
    // Navigate to the chat screen with the renter
    navigation.navigate('Chat', { 
      userName: `Chat with ${rentalDetails.renterName}`,
      // userId: rentalDetails.renterId // (for a real app)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Renter Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rented By</Text>
          <View style={styles.renterRow}>
            <Image 
              source={{ uri: rentalDetails.renterAvatar }} 
              style={styles.avatar} 
            />
            <View style={{flex: 1}}>
              <Text style={styles.renterName}>{rentalDetails.renterName}</Text>
              <Text style={styles.renterDetail}>Information Technology</Text>
            </View>
            <TouchableOpacity 
              style={styles.chatButton} 
              onPress={handleContactRenter}
            >
              <Feather name="message-square" size={20} color={PRIMARY_BLUE} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Rental Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Start Date:</Text>
            <Text style={styles.detailValue}>{rentalDetails.startDate}</Text>
          </View>
          <View style={[styles.detailRow, { marginBottom: 0 }]}>
            <Text style={styles.detailLabel}>End Date:</Text>
            <Text style={styles.detailValue}>{rentalDetails.endDate}</Text>
          </View>
        </View>

        {/* Rented Item */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Item Rented</Text>
          <View style={[styles.itemRow, styles.lastItemRow]}>
            <Image source={{ uri: rentalDetails.item.img }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{rentalDetails.item.title}</Text>
              <Text style={styles.itemPrice}>₱{rentalDetails.item.price}/day</Text>
            </View>
            <Text style={styles.itemQuantity}>x{rentalDetails.item.quantity}</Text>
          </View>
          
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Price:</Text>
              <Text style={styles.totalValue}>₱{rentalDetails.totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount Paid:</Text>
              <Text style={styles.totalValue}>₱{rentalDetails.amountPaid.toFixed(2)}</Text>
            </View>
            {rentalDetails.paymentType === 'Downpayment' && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabelRemaining}>Remaining Balance:</Text>
                <Text style={styles.totalValueRemaining}>₱{rentalDetails.remainingBalance.toFixed(2)}</Text>
              </View>
            )}
          </View>
        </View>

      </ScrollView>
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
  renterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  renterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  renterDetail: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },
  chatButton: {
    padding: 10,
    backgroundColor: PRIMARY_BLUE + '1A',
    borderRadius: 20,
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
});