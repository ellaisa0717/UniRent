import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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

// Define the colors from your home screen for consistency
const NAVY = '#0029F3';
const YELLOW_PRIMARY = '#FDB022';
const YELLOW_ACCENT = '#FFE58A';
const GREEN_PRIMARY = '#10B981';
const GREEN_ACCENT = '#D1FAE5';
const WHITE = '#FFFFFF';
const GRAY_LIGHT = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827'; // Dark text for readability

// --- Sample Notification Data ---
const NOTIFICATIONS_DATA = [
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
  {
    id: '4',
    type: 'stock_update',
    title: 'Arduino Uno R3 back in stock!',
    message: 'Good news! Your favorite board is available again.',
    time: '3 days ago',
    read: true,
    icon: 'check-circle-outline',
  },
  {
    id: '5',
    type: 'system_alert',
    title: 'Maintenance Notice',
    message: 'Our services will be briefly interrupted tonight for updates.',
    time: '1 week ago',
    read: true,
    icon: 'cog-outline',
  },
];

// --- Notification Icon Mapping ---
const NOTIFICATION_ICONS = {
  order_shipped: { name: 'truck-delivery', color: GREEN_PRIMARY },
  new_product: { name: 'new-box', color: NAVY },
  promotion: { name: 'tag-multiple', color: YELLOW_PRIMARY },
  stock_update: { name: 'check-circle-outline', color: GREEN_PRIMARY },
  system_alert: { name: 'cog-outline', color: GRAY_MEDIUM },
  default: { name: 'bell-outline', color: GRAY_MEDIUM }, // Fallback
};

export default function NotificationsScreen() {
  const renderNotificationItem = ({ item }) => {
    const iconData = NOTIFICATION_ICONS[item.type] || NOTIFICATION_ICONS.default;
    
    return (
      <TouchableOpacity 
        style={[styles.notificationItem, !item.read && styles.unreadItem]}
        activeOpacity={0.8}
        // You would typically navigate or mark as read here
        onPress={() => console.log('Notification pressed:', item.id)}
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={24} color={NAVY} />
        </TouchableOpacity>
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_LIGHT,
    backgroundColor: WHITE,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: NAVY,
    letterSpacing: 0.5,
  },
  settingsButton: {
    padding: 5,
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadItem: {
    backgroundColor: GRAY_LIGHT, // Slightly different background for unread
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
    height: 10, // Space between items
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: GRAY_MEDIUM,
    marginTop: 15,
  },
});