import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MobileDashboardCard from '../components/MobileDashboardCard';

const DashboardScreen = ({ navigation }) => {
  const stats = [
    { label: 'TOTAL', count: 11, color: '#101828' },
    { label: 'AVAILABLE', count: 7, color: '#1D4ED8' },
    { label: 'OCCUPIED', count: 4, color: '#B45309' },
    { label: 'MAINTENANCE', count: 2, color: '#991B1B' },
  ];

  const lockers = [
    { id: 'A1', status: 'Available' },
    { id: 'A2', status: 'Occupied' },
    { id: 'B3', status: 'Maintenance' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>UniRent Dashboard</Text>
          <TouchableOpacity 
            style={styles.rentButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Feather name="shopping-bag" size={18} color="#FFF" />
            <Text style={styles.rentButtonText}>Rent Components</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((item, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: item.color }]}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statCount}>{item.count}</Text>
            </View>
          ))}
        </View>

       {/* Locker Status Section using the reusable component */}
<View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Locker Status</Text>
  {lockers.map((locker) => (
    <MobileDashboardCard 
      key={locker.id} 
      id={locker.id} 
      status={locker.status} 
      onOpen={() => console.log(`Opening ${locker.id}`)} 
    />
  ))}
</View>

        {/* Recent Activity */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityTime}>10:30 AM</Text>
            <Text style={styles.activityText}>Arduino Uno rented by Francis B.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#0B2B66' },
  rentButton: { backgroundColor: '#FDB022', flexDirection: 'row', padding: 10, borderRadius: 8, alignItems: 'center' },
  rentButtonText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', padding: 15, borderRadius: 12, marginBottom: 12, justifyContent: 'center' },
  statLabel: { color: '#E5E7EB', fontSize: 10, fontWeight: 'bold' },
  statCount: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  sectionContainer: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#111827' },
  lockerCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, elevation: 2 },
  lockerId: { fontSize: 16, fontWeight: 'bold' },
  lockerStatus: { color: '#6B7280' },
  openButton: { backgroundColor: '#FDB022', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 6 },
  openButtonText: { fontWeight: 'bold', color: '#FFF' },
  activityCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#0B2B66' },
  activityTime: { fontWeight: 'bold', color: '#0B2B66' },
  activityText: { color: '#4B5563', marginTop: 4 },
});

export default DashboardScreen;