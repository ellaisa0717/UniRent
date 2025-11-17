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
import { useUser } from '../context/UserContext'; 

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6'; 
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const PRIMARY_BLUE = '#0029F3';
const GREEN_PRIMARY = '#10B981';
const YELLOW_PRIMARY = '#FDB022';

// --- Verification Button Component (Unchanged) ---
const VerificationMenuItem = ({ navigation }) => {
  const { isVerified, isPending } = useUser();

  let icon, title, titleColor, onPress;

  if (isVerified) {
    icon = "check-shield";
    title = "Account Verified";
    titleColor = GREEN_PRIMARY;
    onPress = () => {}; 
  } else if (isPending) {
    icon = "clock";
    title = "Pending Review";
    titleColor = YELLOW_PRIMARY;
    onPress = () => {}; 
  } else {
    icon = "shield";
    title = "Get Verified";
    titleColor = PRIMARY_BLUE;
    onPress = () => navigation.navigate('Verification');
  }

  return (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={onPress} 
      disabled={isVerified || isPending}
    >
      <View style={styles.menuIcon}> 
        <Feather name={icon} size={20} color={titleColor} />
      </View>
      <Text style={[styles.menuItemText, { color: titleColor, fontWeight: 'bold' }]}>
        {title}
      </Text>
      {!isVerified && !isPending && (
        <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
      )}
    </TouchableOpacity>
  );
};

// --- Standard Menu Item Component (Unchanged) ---
const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Feather name={icon} size={20} color={NAVY} />
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
    <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
  </TouchableOpacity>
);


export default function ProfileScreen({ navigation }) {
  const { user } = useUser(); 

  // --- THIS IS THE FIX (Part 1) ---
  const handleLogout = () => {
    // This command resets the entire navigation stack
    // and sends the user back to the 'Welcome' screen.
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };
  // --- END OF FIX ---

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://i.imgur.com/8Km9tcn.png' }} 
          style={styles.avatar}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileDetail}>{user.student_id}</Text>
      </View>

      <View style={styles.menuGroup}>
        <VerificationMenuItem navigation={navigation} />
      </View>

      <View style={styles.menuGroup}>
        <MenuItem
          icon="calendar"
          title="My Rentals"
          onPress={() => navigation.navigate('MyRentals')}
        />
        <MenuItem
          icon="clipboard" 
          title="My Listings"
          onPress={() => navigation.navigate('MyListings')} 
        />
        <MenuItem
          icon="message-square"
          title="My Messages"
          onPress={() => navigation.navigate('ChatList')}
        />
      </View>

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
      </View>

      {/* --- THIS IS THE FIX (Part 2) --- */}
      {/* Added the onPress prop */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color={NAVY} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
      {/* --- END OF FIX --- */}
    </SafeAreaView>
  );
}

// (Styles are unchanged)
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
    marginBottom: 16,
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
    marginTop: 0, 
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