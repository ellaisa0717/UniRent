import { Feather } from '@expo/vector-icons';
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

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const GREEN_PRIMARY = '#10B981';
const YELLOW_PRIMARY = '#FDB022';

// --- Sample Data (Items *you* have rented) ---
const MY_RENTALS_DATA = [
  {
    id: 'rental_123',
    title: 'ARDUINO UNO R3',
    img: 'https.i.imgur.com/Zy2Qk8G.png',
    status: 'Pending Pickup',
    statusColor: YELLOW_PRIMARY,
    owner: 'Justin N.',
    returnDate: '09/04/2025',
  },
  {
    id: 'rental_456',
    title: 'PIR MOTION SENSOR',
    img: 'https.i.imgur.com/ba8K1rU.png',
    status: 'Active Rental',
    statusColor: GREEN_PRIMARY,
    owner: 'Maria C.',
    returnDate: '09/02/2025',
  },
  {
    id: 'rental_789',
    title: 'RASPBERRY PI 4 MODEL B',
    img: 'https.i.imgur.com/0quD8jC.png',
    status: 'Returned',
    statusColor: GRAY_MEDIUM,
    owner: 'Ellaisa F.',
    returnDate: '08/20/2025',
  },
];

export default function MyRentalsScreen({ navigation }) {

  const renderRentalItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => {
        if (item.status === 'Pending Pickup') {
          navigation.navigate('Chat', { userName: `Chat with ${item.owner}` });
        }
      }}
    >
      <Image source={{ uri: item.img }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemOwner}>from {item.owner}</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
          <Text style={[styles.statusText, { color: item.statusColor }]}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>
          {item.status === 'Returned' ? 'Returned:' : 'Due:'}
        </Text>
        <Text style={styles.dateText}>{item.returnDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <FlatList
        data={MY_RENTALS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderRentalItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="calendar" size={60} color={GRAY_MEDIUM} />
            <Text style={styles.emptyText}>You have no active rentals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.browseText}>Browse items</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- Styles (Unchanged) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  listContainer: {
    paddingTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER_LIGHT,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: WHITE,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: GRAY_LIGHT_BG,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  itemOwner: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 12,
    color: GRAY_MEDIUM,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  emptyText: {
    fontSize: 18,
    color: GRAY_MEDIUM,
    marginTop: 15,
  },
  browseText: {
    fontSize: 16,
    color: '#0029F3',
    fontWeight: 'bold',
    marginTop: 10,
    padding: 10,
  },
});