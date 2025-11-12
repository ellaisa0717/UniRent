import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// ----- Your Categories -----
const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'microcontrollers', label: 'Microcontrollers' },
  { id: 'sbc', label: 'Single-board' },
  { id: 'sensors', label: 'Sensors' },
  { id: 'modules', label: 'Modules' },
  { id: 'power', label: 'Power' },
];

function HomeHeader({ onQueryChange, onCategoryChange }) {
  // It holds its OWN state for the UI
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  // When the UI changes, it updates its own state...
  const handleSetQuery = (text) => {
    setQuery(text);
    onQueryChange(text); // ...and notifies the parent
  };

  const handleSetCategory = (catId) => {
    setActiveCat(catId);
    onCategoryChange(catId); // ...and notifies the parent
  };

  return (
    <View>
      {/* ----- Search ----- */}
      <View style={styles.searchWrap}>
        <Feather name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Search devices"
          placeholderTextColor="#9CA3AF"
          value={query} // Uses local state
          onChangeText={handleSetQuery} // Uses local handler
          style={styles.searchInput}
        />
      </View>

      {/* ----- Category chips ----- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {CATEGORIES.map(cat => {
          const active = activeCat === cat.id; // Uses local state
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => handleSetCategory(cat.id)} // Uses local handler
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// This stops the component from EVER re-rendering, which saves the scroll
export default React.memo(HomeHeader);


// --- Styles (They live in this file now) ---
const styles = StyleSheet.create({
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 14,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  chip: {
    backgroundColor: '#FFF6DB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDB022',
  },
  chipActive: {
    backgroundColor: '#FDB022',
    borderColor: '#F59E0B',
  },
  chipText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  chipTextActive: {
    color: '#000000',
  },
});