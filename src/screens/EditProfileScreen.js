import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
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
const GRAY_LIGHT_BG = '#F3F4F6'; // Light background from your prototypes
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';

// This is a helper component for the list items
const ProfileEditableItem = ({ label, value, onPress, isPassword = false }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Text style={styles.itemLabel}>{label}</Text>
    <View style={styles.itemValueContainer}>
      <Text style={isPassword ? styles.itemPassword : styles.itemValue}>
        {value}
      </Text>
      <Feather name="chevron-right" size={20} color={GRAY_MEDIUM} />
    </View>
  </TouchableOpacity>
);

export default function EditProfileScreen({ navigation }) {
  // Dummy data held in state, so it can be changed
  const [name, setName] = useState('Justin Nabunturan');
  const [year, setYear] = useState('3rd Year');
  const [major, setMajor] = useState('Information Technology');
  
  // A placeholder image
  const avatar = 'https://i.imgur.com/8Km9tcn.png';

  const handleSave = () => {
    // Logic to save data would go here
    console.log('Saving profile...');
    // Navigate back to the main profile screen after saving
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Main content card */}
        <View style={styles.card}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Change photo</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Form Items */}
          <ProfileEditableItem
            label="Name:"
            value={name}
            onPress={() => {}} // Add navigation to a 'Change Name' screen
          />
          <ProfileEditableItem
            label="Password:"
            value="•••••••••••••"
            isPassword={true}
            onPress={() => {}} // Add navigation to a 'Change Password' screen
          />
          <ProfileEditableItem
            label="Year:"
            value={year}
            onPress={() => {}} // Show a picker/modal
          />
          <ProfileEditableItem
            label="Major:"
            value={major}
            onPress={() => {}} // Show a picker/modal
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#E9EFFF', // Light blue bg from prototype
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  changePhotoText: {
    fontSize: 14,
    color: NAVY,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: BORDER_LIGHT,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  itemLabel: {
    fontSize: 16,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    marginRight: 8,
  },
  itemPassword: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    marginRight: 8,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});