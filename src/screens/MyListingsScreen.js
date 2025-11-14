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

// --- Sample Data (These are the items "Justin N." owns) ---
// In a real app, you would fetch this from your database
const MY_LISTINGS_DATA = [
  {
    id: 'uno',
    title: 'ARDUINO UNO R3',
    img: 'https://i.imgur.com/Zy2Qk8G.png',
    price: 25,
    status: 'Rented Out', // Example status
    statusColor: '#F59E0B', // Orange
  },
  {
    id: 'pi-zero',
    title: 'RASPBERRY PI ZERO W',
    img: 'https://i.imgur.com/2c5Y4Y6.png',
    price: 50,
    status: 'Available',
    statusColor: GREEN_PRIMARY,
  },
  {
    id: 'dht22',
    title: 'DHT22 TEMPERATURE & HUMIDITY',
    img: 'https://i.imgur.com/9yJYz3U.png',
    price: 15,
    status: 'Available',
    statusColor: GREEN_PRIMARY,
  },
  {
    id: 'servo-mg996r',
    title: 'MG996R SERVO MOTOR',
    img: 'https://i.imgur.com/b83r0Zg.png',
    price: 22,
    status: 'Available',
    statusColor: GREEN_PRIMARY,
  },
  {
    id: 'hc05',
    title: 'HC-05 BLUETOOTH MODULE',
    img: 'https://i.imgur.com/ya3iU0f.png',
    price: 28,
    status: 'Under Review',
    statusColor: GRAY_MEDIUM,
  },
];

export default function MyListingsScreen({ navigation }) {

  const renderListingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      // You could navigate to an "Edit Listing" screen
      onPress={() => {}}
    >
      <Image source={{ uri: item.img }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemPrice}>₱{item.price}/day</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
          <Text style={[styles.statusText, { color: item.statusColor }]}>
            {item.status}
          </Text>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <FlatList
        data={MY_LISTINGS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderListingItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="clipboard" size={60} color={GRAY_MEDIUM} />
            <Text style={styles.emptyText}>You haven't listed any items</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateListing')}>
              <Text style={styles.browseText}>Post your first item</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
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
  itemPrice: {
    fontSize: 14,
    color: NAVY,
    fontWeight: '600',
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
    color: '#0029F3', // Your accent blue
    fontWeight: 'bold',
    marginTop: 10,
    padding: 10,
  },
});