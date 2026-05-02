import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Refreshes data when you switch back to this tab

  useEffect(() => {
    if (isFocused) {
      fetchMyRentals();
    }
  }, [isFocused]);

  const fetchMyRentals = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
        return;
      }

      const response = await fetch("http://192.168.5.95:8000/api/my-rentals/", {
        headers: { "Authorization": `Token ${token}` }
      });
      
      const data = await response.json();
      if (response.ok) {
        setRentals(data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (rentalId) => {
    Alert.alert(
      "Return Item",
      "Are you sure you want to return this item? Make sure it is securely placed in the locker!",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            try {
              const response = await fetch("http://192.168.5.95:8000/api/return-item/", {
                method: "POST",
                headers: {
                  "Authorization": `Token ${token}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ rental_id: rentalId })
              });

              if (response.ok) {
                Alert.alert("Success", "Item successfully returned! The locker is now available.");
                fetchMyRentals(); // Refresh list automatically
              } else {
                Alert.alert("Error", "Failed to return item.");
              }
            } catch (err) {
              Alert.alert("Error", "Network error.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#1E40AF" /></View>;
  }

  const activeRentals = rentals.filter(r => r.status === "Active").length;
  const overdueRentals = rentals.filter(r => r.status === "Overdue").length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      
      <Text style={styles.headerTitle}>Overview</Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={[styles.statValue, { color: '#1E40AF' }]}>{rentals.length}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
          <Text style={styles.statLabel}>Active</Text>
          <Text style={[styles.statValue, { color: '#047857' }]}>{activeRentals}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
          <Text style={styles.statLabel}>Overdue</Text>
          <Text style={[styles.statValue, { color: '#B91C1C' }]}>{overdueRentals}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Active Rentals</Text>
      
      {rentals.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>You have no active rentals.</Text>
          <Text style={styles.emptySubText}>Head to the Marketplace to rent a device!</Text>
        </View>
      ) : (
        rentals.map((rental) => {
          const isReturned = rental.status === "Returned";
          return (
            <View key={rental.id} style={[styles.rentalCard, isReturned && styles.returnedCard]}>
              <View style={styles.rentalHeader}>
                <View>
                  <Text style={styles.rentalTitle}>{rental.item_title} {isReturned && "(Returned)"}</Text>
                  <Text style={styles.rentalDate}>Rented: {rental.rental_date}</Text>
                </View>
                {!isReturned && (
                  <View style={styles.lockerBadge}>
                    <Feather name="lock" size={12} color="#F59E0B" />
                    <Text style={styles.lockerText}>{rental.locker_label}</Text>
                  </View>
                )}
              </View>

              {!isReturned && (
                <View style={styles.rentalActions}>
                  <Text style={[styles.dueDate, rental.status === "Overdue" && {color: '#EF4444'}]}>
                    {rental.status === "Active" ? `Due: ${rental.return_date}` : "OVERDUE"}
                  </Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.returnButton} 
                      onPress={() => handleReturn(rental.id)}
                    >
                      <Text style={styles.returnText}>Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.openLockerButton}
                      onPress={() => Alert.alert("Connecting...", `Attempting to open Locker ${rental.locker_label} via IoT.`)}
                    >
                      <Feather name="unlock" size={14} color="white" />
                      <Text style={styles.openLockerText}> Open</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginBottom: 16, marginTop: 40 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 16, marginHorizontal: 4, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#64748B', fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: '900' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  emptyBox: { backgroundColor: 'white', padding: 30, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  emptyText: { fontSize: 16, color: '#1E293B', fontWeight: '600', marginBottom: 8 },
  emptySubText: { fontSize: 14, color: '#64748B' },
  rentalCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 4, borderLeftColor: '#10B981' },
  returnedCard: { borderLeftColor: '#94A3B8', opacity: 0.6 },
  rentalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  rentalTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  rentalDate: { fontSize: 12, color: '#64748B' },
  lockerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  lockerText: { fontSize: 12, fontWeight: 'bold', color: '#B45309', marginLeft: 4 },
  rentalActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  dueDate: { fontSize: 12, fontWeight: '600', color: '#10B981' },
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  returnButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1' },
  returnText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  openLockerButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E40AF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  openLockerText: { fontSize: 12, fontWeight: 'bold', color: 'white' }
});