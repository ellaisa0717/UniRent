import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomInput from '../components/CustomInput';

const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6'; 
const TEXT_PRIMARY = '#111827';
const YELLOW_PRIMARY = '#FDB022';

export default function EditProfileScreen({ route, navigation }) {
  // Grab the data passed from the ProfileScreen
  const { currentProfile } = route.params || {};

  const [formData, setFormData] = useState({
    full_name: currentProfile?.full_name || '',
    username: currentProfile?.username || '',
    password: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.full_name || !formData.username) {
      Alert.alert("Error", "Name and Student ID cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch("http://192.168.5.95:8000/api/update-profile/", {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated securely!");
        navigation.goBack(); // Return to Profile screen to see the update
      } else {
        Alert.alert("Update Failed", data.error || "Failed to update profile.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Could not connect to the server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.card}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
               <Text style={{fontSize: 40}}>👤</Text>
            </View>
          </View>

          <View style={styles.formSection}>
            <CustomInput
              label="Full Name"
              value={formData.full_name}
              onChangeText={(text) => setFormData({...formData, full_name: text})}
            />
            
            <CustomInput
              label="Student ID (Username)"
              value={formData.username}
              onChangeText={(text) => setFormData({...formData, username: text})}
              autoCapitalize="none"
            />
            
            <CustomInput
              label="New Password"
              placeholder="Leave blank to keep current password"
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, isSaving && {opacity: 0.7}]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
             <ActivityIndicator color={TEXT_PRIMARY} />
          ) : (
             <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GRAY_LIGHT_BG },
  scrollContainer: { padding: 16 },
  card: { backgroundColor: WHITE, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  avatarSection: { alignItems: 'center', paddingVertical: 24, backgroundColor: '#E2E8F0' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: WHITE, justifyContent: 'center', alignItems: 'center' },
  formSection: { padding: 20 },
  saveButton: { backgroundColor: YELLOW_PRIMARY, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  saveButtonText: { color: TEXT_PRIMARY, fontSize: 16, fontWeight: 'bold' },
});