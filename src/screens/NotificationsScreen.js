import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Define colors
const NAVY = '#0B2B66';
const YELLOW_PRIMARY = '#FDB022';
const GREEN_PRIMARY = '#10B981';
const WHITE = '#FFFFFF';
const GRAY_LIGHT = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const PRIMARY_BLUE = '#0029F3'; // Your accent color

// --- THIS IS THE FIX (Part 1) ---
// Sample data for the new notification type
const DUMMY_RENTAL_DETAILS = {
  id: 'rental_123',
  renterName: 'John D.',
  renterAvatar: 'https://i.imgur.com/8Km9tcn.png', // Placeholder
  startDate: '09/02/2025',
  endDate: '09/04/2025',
  item: {
    id: 'uno',
    title: 'ARDUINO UNO R3',
    img: 'https://i.imgur.com/Zy2Qk8G.png',
    price: 25,
    quantity: 1,
  },
  totalPrice: 50.00, // 25/day * 2 days
  amountPaid: 25.00, // 50% downpayment
  paymentType: 'Downpayment',
  remainingBalance: 25.00,
};

// --- Updated Notification Data ---
const NOTIFICATIONS_DATA = [
  // --- THIS IS THE NEW NOTIFICATION ---
  {
    id: 'rental_notif',
    type: 'rental_request', // New type
    title: 'Your item has been rented!',
    message: 'John D. has rented your ARDUINO UNO R3.',
    time: '5 minutes ago',
    read: false,
    icon: 'check-decagram', // A "verified" or "success" icon
    data: DUMMY_RENTAL_DETAILS, // Attach the rental data
  },
  // --- End of new notification ---
  {
    id: '1',
    type: 'order_shipped',
    title: 'Your order #12345 has shipped!',
    message: 'It is expected to arrive within 3-5 business days.',
    time: '2 hours ago',
    read: false,
    icon: 'truck-delivery',
  },
  {
    id: '2',
    type: 'new_product',
    title: 'New Product Alert: ESP32-C3 Mini',
    message: 'Check out the latest addition to our microcontroller family.',
    time: 'yesterday',
    read: false,
    icon: 'new-box',
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Flash Sale: 20% off all Sensors!',
    message: 'Limited time offer! Grab your favorite sensors now.',
    time: '2 days ago',
    read: true,
    icon: 'tag-multiple',
  },
];
// --- END OF FIX (Part 1) ---

// --- Notification Icon Mapping ---
const NOTIFICATION_ICONS = {
  rental_request: { name: 'check-decagram', color: PRIMARY_BLUE }, // New icon
  order_shipped: { name: 'truck-delivery', color: GREEN_PRIMARY },
  new_product: { name: 'new-box', color: NAVY },
  promotion: { name: 'tag-multiple', color: YELLOW_PRIMARY },
  default: { name: 'bell-outline', color: GRAY_MEDIUM }, 
};

export default function NotificationsScreen({ navigation }) { // <-- Added navigation

  // --- THIS IS THE FIX (Part 2) ---
  // Handle notification press
  const handlePress = (item) => {
    // Mark as read, etc.
    console.log('Notification pressed:', item.id);

    // If it's a rental request, navigate to the details
    if (item.type === 'rental_request') {
      navigation.navigate('RentalDetails', { 
        rentalDetails: item.data 
      });
    }
  };
  // --- END OF FIX (Part 2) ---

  const renderNotificationItem = ({ item }) => {
    const iconData = NOTIFICATION_ICONS[item.type] || NOTIFICATION_ICONS.default;
    
    return (
      <TouchableOpacity 
        style={[styles.notificationItem, !item.read && styles.unreadItem]}
        activeOpacity={0.8}
        onPress={() => handlePress(item)} // <-- Use the new handler
      >
        <View style={[styles.iconContainer, { backgroundColor: iconData.color + '20' }]}> 
          <MaterialCommunityIcons 
            name={iconData.name} 
            size={24} 
            color={iconData.color} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      {/* This screen no longer has its own header, as it's provided 
        by the AppNavigator. The header <View> has been removed.
      */}

      <FlatList
        data={NOTIFICATIONS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bell-off-outline" size={60} color={GRAY_MEDIUM} />
            <Text style={styles.emptyText}>No new notifications</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  // The old 'header' styles have been removed
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    // Using a simpler shadow for consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadItem: {
    backgroundColor: GRAY_LIGHT,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  notificationMessage: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 11,
    color: GRAY_MEDIUM,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: YELLOW_PRIMARY,
    marginLeft: 10,
  },
  separator: {
    height: 0, // Set to 0, marginVertical on item creates space
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150, // Pushed it down a bit
  },
  emptyText: {
    fontSize: 18,
    color: GRAY_MEDIUM,
    marginTop: 15,
  },
});