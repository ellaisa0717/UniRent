import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Define colors from your theme
const NAVY = '#0029F3';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const SWITCH_THUMB = WHITE;
const SWITCH_TRACK_TRUE = NAVY;
const SWITCH_TRACK_FALSE = '#B0B8C8'; // A medium gray for the 'off' track

// Helper for a single switch item
const ToggleItem = ({ label, value, onValueChange }) => (
  <View style={styles.toggleItem}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <Switch
      trackColor={{ false: SWITCH_TRACK_FALSE, true: SWITCH_TRACK_TRUE }}
      thumbColor={SWITCH_THUMB}
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

// Helper for a single navigation item
const LanguageItem = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.toggleItem} onPress={onPress}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <View style={styles.languageContainer}>
      <Text style={styles.languageText}>{value}</Text>
      <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
    </View>
  </TouchableOpacity>
);

export default function ConfigureSettingsScreen({ navigation }) {
  // --- States for all the toggles ---
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [payment, setPayment] = useState(true);
  const [profileVisible, setProfileVisible] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleUpdate = () => {
    // Logic to save all settings
    console.log('Updating settings...');
    navigation.goBack(); // Go back to the main 'Settings' screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Notifications Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="bell" size={20} color={NAVY} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Notifications</Text>
              <Text style={styles.cardSubtitle}>Choose how you want to be notified</Text>
            </View>
          </View>
          <ToggleItem label="Push Notifications" value={push} onValueChange={setPush} />
          <ToggleItem label="Email Notifications" value={email} onValueChange={setEmail} />
          <ToggleItem label="Payment Reminders" value={payment} onValueChange={setPayment} />
        </View>

        {/* Privacy Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="shield" size={20} color={NAVY} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Privacy</Text>
              <Text style={styles.cardSubtitle}>Control your privacy and data sharing</Text>
            </View>
          </View>
          <ToggleItem label="Profile Visible to Others" value={profileVisible} onValueChange={setProfileVisible} />
          <ToggleItem label="Analytics & Insights" value={analytics} onValueChange={setAnalytics} />
        </View>

        {/* Preferences Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="edit-3" size={20} color={NAVY} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Preferences</Text>
              <Text style={styles.cardSubtitle}>Customize your app experience</Text>
            </View>
          </View>
          <ToggleItem label="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
          <LanguageItem label="Language" value="English" onPress={() => {}} />
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Settings</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E9EFFF', // Light blue bg
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  cardHeaderText: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  cardSubtitle: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  toggleLabel: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    flex: 1, // Ensure it takes up space
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    marginRight: 8,
  },
  updateButton: {
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  updateButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});