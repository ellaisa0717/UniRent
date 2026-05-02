import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function HomeScreen({ navigation }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true); // For the initial screen load
  const [refreshing, setRefreshing] = useState(false); // NEW: For the pull-to-refresh spinner
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { addToCart } = useCart(); 

  const categories = [
    "All", "Microcontrollers", "Sensors", "Actuators", 
    "Communication Modules", "Development Boards", "Power Modules", "Display Modules"
  ];

  // 1. Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    await fetchInventory();
    setLoading(false);
  };

  // 2. Pull-to-Refresh logic
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchInventory();
    setRefreshing(false);
  }, []);

  // Core fetch function used by both
  const fetchInventory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Welcome');
        return;
      }

      const response = await fetch("http://192.168.5.95:8000/api/items/", {
        headers: { "Authorization": `Token ${token}` }
      });
      
      const data = await response.json();
      if (response.ok) {
        setInventory(data);
      } else {
        Alert.alert("Error", "Failed to load marketplace.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Could not reach the database.");
    }
  };

  const filteredInventory = inventory.filter(item => {
    const itemName = item.title || "";
    const itemCategory = item.category || "General";
    
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || itemCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }) => {
    const isOccupied = item.status === "Occupied";
    const imageUrl = item.image 
      ? (item.image.startsWith('http') ? item.image : `http://192.168.5.95:8000${item.image}`) 
      : null;

    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('ProductDetail', { item })}
      >
        <View style={styles.imageContainer}>
          <View style={[styles.statusBadge, { backgroundColor: isOccupied ? '#64748B' : '#10B981' }]}>
            <Text style={styles.statusText}>{item.status || "AVAILABLE"}</Text>
          </View>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.placeholderImage]}>
              <Text style={{color: '#94A3B8'}}>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemPrice}>₱{item.price} <Text style={styles.perDay}>/day</Text></Text>
          
          <TouchableOpacity 
            style={[styles.addButton, isOccupied && styles.disabledButton]}
            disabled={isOccupied}
            onPress={() => {
              addToCart(item);
              Alert.alert("Added to Cart", `${item.title} has been added to your cart.`);
            }}
          >
            <Text style={[styles.addButtonText, isOccupied && { color: '#94A3B8' }]}>
              {isOccupied ? "Occupied" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#1E40AF" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#64748B" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search IoT devices..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryTab, activeCategory === cat && styles.activeCategoryTab]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredInventory}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found.</Text>}
        // --- NEW: Pull-to-refresh props added here ---
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', margin: 16, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 45, fontSize: 15 },
  categoryContainer: { paddingLeft: 16, marginBottom: 10 },
  categoryTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'white', marginRight: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  activeCategoryTab: { backgroundColor: '#1E40AF', borderColor: '#1E40AF' },
  categoryText: { color: '#64748B', fontWeight: '600' },
  activeCategoryText: { color: 'white' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  imageContainer: { width: '100%', height: 120, position: 'relative' },
  image: { width: '100%', height: '100%' },
  placeholderImage: { backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  statusBadge: { position: 'absolute', top: 8, right: 8, zIndex: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  cardInfo: { padding: 12 },
  itemTitle: { fontWeight: '700', fontSize: 14, color: '#1E293B', marginBottom: 2 },
  itemCategory: { fontSize: 12, color: '#64748B', marginBottom: 6 },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: '#1E40AF', marginBottom: 10 },
  perDay: { fontSize: 10, color: '#64748B', fontWeight: 'normal' },
  addButton: { backgroundColor: '#F59E0B', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  disabledButton: { backgroundColor: '#F1F5F9' },
  addButtonText: { color: '#1E293B', fontWeight: 'bold', fontSize: 12 }
});


//s