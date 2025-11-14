import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
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

export default function ProfileScreen({ navigation }) {
  const user = {
    name: 'Justin Nabunturan',
    major: 'Information Technology',
    avatar: 'https.i.imgur.com/8Km9tcn.png', 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileDetail}>{user.major}</Text>
      </View>

      {/* --- This is the menu for RENTERS --- */}
      <View style={styles.menuGroup}>
        {/* --- THIS IS THE FIX --- */}
        <MenuItem
          icon="calendar" // Icon for rentals
          title="My Rentals"
          onPress={() => navigation.navigate('MyRentals')} // <-- Corrected name
        />
        {/* --- END OF FIX --- */}
        <MenuItem
          icon="message-square"
          title="My Messages"
          onPress={() => navigation.navigate('ChatList')}
        />
      </View>

      {/* --- This is the menu for OWNERS/LISTERS --- */}
      <View style={styles.menuGroup}>
        <MenuItem
          icon="clipboard" 
          title="My Listings"
          onPress={() => navigation.navigate('MyListings')} 
        />
      </View>

      {/* --- This is the general app menu --- */}
      <View style={styles.menuGroup}>
        <MenuItem
          icon="user"
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <MenuItem
          icon="settings"
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem
          icon="help-circle"
          title="Help & Support"
          onPress={() => {}} 
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={20} color={NAVY} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// (Helper component and styles are unchanged)
const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Feather name={icon} size={20} color={NAVY} />
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
    <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: GRAY_LIGHT_BG,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_PRIMARY,
  },
  profileCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: NAVY,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  profileDetail: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    marginTop: 4,
  },
  menuGroup: {
    backgroundColor: WHITE,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16, 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: GRAY_LIGHT_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  logoutButton: {
    backgroundColor: WHITE,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8, 
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    color: NAVY,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});