import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6'; 
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';

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
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Refresh profile every time the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Welcome');
        return;
      }

      const response = await fetch("http://192.168.5.95:8000/api/profile/", {
        headers: { "Authorization": `Token ${token}` }
      });
      
      const data = await response.json();
      if (response.ok) {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    // 1. Remove the token securely
    await AsyncStorage.removeItem('token');
    
    // 2. Reset the stack to kick them back to Welcome
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={NAVY} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={{fontSize: 40}}>👤</Text>
        </View>
        <Text style={styles.profileName}>{profileData?.full_name || "User"}</Text>
        <Text style={styles.profileDetail}>ID: {profileData?.username}</Text>
        <Text style={[styles.profileDetail, {fontSize: 12, marginTop: 10}]}>Member Since: {profileData?.member_since}</Text>
      </View>

      <View style={styles.menuGroup}>
        <MenuItem
          icon="edit-3"
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile', { currentProfile: profileData })}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color={'#EF4444'} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GRAY_LIGHT_BG },
  header: { paddingVertical: 16, alignItems: 'center', backgroundColor: GRAY_LIGHT_BG },
  headerTitle: { fontSize: 20, fontWeight: '800', color: TEXT_PRIMARY },
  profileCard: { backgroundColor: WHITE, borderRadius: 16, marginHorizontal: 16, paddingVertical: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, marginBottom: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: TEXT_PRIMARY },
  profileDetail: { fontSize: 14, color: GRAY_MEDIUM, marginTop: 4 },
  menuGroup: { backgroundColor: WHITE, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, marginBottom: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: BORDER_LIGHT },
  menuIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: GRAY_LIGHT_BG, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  menuItemText: { flex: 1, fontSize: 16, fontWeight: '600', color: TEXT_PRIMARY },
  logoutButton: { backgroundColor: WHITE, borderRadius: 16, marginHorizontal: 16, marginTop: 0, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  logoutButtonText: { fontSize: 16, color: '#EF4444', fontWeight: 'bold', marginLeft: 8 },
});