import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// This component accepts props as required by Task 3 [cite: 191]
const MobileDashboardCard = ({ id, status, onOpen }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.idText}>{id}</Text>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onOpen}>
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  idText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  statusText: { color: '#6B7280', fontSize: 14 },
  button: { backgroundColor: '#FDB022', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 6 },
  buttonText: { fontWeight: 'bold', color: '#FFF' },
});

export default MobileDashboardCard;