import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
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

// Helper component for the setting items
const SettingsItem = ({ icon, title, subtitle, value, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Feather name={icon} size={20} color={NAVY} style={styles.itemIcon} />
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.itemValueContainer}>
      <Text style={styles.itemValue}>{value}</Text>
      <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
    </View>
  </TouchableOpacity>
);

// Helper for the simple link items
const LinkItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.linkItemContainer} onPress={onPress}>
    <Feather name={icon} size={20} color={TEXT_PRIMARY} />
    <Text style={styles.linkItemText}>{title}</Text>
    <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Top Card */}
        <View style={styles.appSettingsCard}>
          <Feather name="settings" size={24} color={NAVY} />
          <Text style={styles.appSettingsTitle}>App Settings</Text>
          <Text style={styles.appSettingsSubtitle}>Manage your preferences</Text>
        </View>

        {/* Settings Group */}
        <View style={styles.menuGroup}>
          <SettingsItem
            icon="bell"
            title="Notifications"
            subtitle="3 disabled"
            value="On"
            onPress={() => navigation.navigate('ConfigureSettings')}
          />
          <SettingsItem
            icon="shield"
            title="Privacy"
            subtitle="Profile visible"
            value="Private"
            onPress={() => navigation.navigate('ConfigureSettings')}
          />
          <SettingsItem
            icon="moon"
            title="Appearance"
            subtitle="Light mode"
            value="Light"
            onPress={() => navigation.navigate('ConfigureSettings')}
          />
        </View>

        {/* Configure Button */}
        <TouchableOpacity 
          style={styles.configureButton} 
          onPress={() => navigation.navigate('ConfigureSettings')}
        >
          <Text style={styles.configureButtonText}>Configure Settings</Text>
        </TouchableOpacity>

        {/* Links Group */}
        <View style={styles.linksGroup}>
          <LinkItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => {}}
          />
          <LinkItem
            icon="file-text"
            title="Terms & Privacy Policy"
            onPress={() => {}}
          />
        </View>

        {/* Cancel Button */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()} // Goes back to ProfileScreen
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  appSettingsCard: {
    backgroundColor: '#E9EFFF', // Light blue bg from prototype
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  appSettingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginTop: 12,
  },
  appSettingsSubtitle: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    marginTop: 4,
  },
  menuGroup: {
    backgroundColor: WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  itemIcon: {
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  itemSubtitle: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 15,
    color: GRAY_MEDIUM,
    marginRight: 8,
  },
  configureButton: {
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  configureButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksGroup: {
    backgroundColor: WHITE,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  linkItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  linkItemText: {
    flex: 1,
    fontSize: 16,
    color: TEXT_PRIMARY,
    marginLeft: 16,
  },
  cancelButton: {
    backgroundColor: WHITE,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
  },
  cancelButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
});