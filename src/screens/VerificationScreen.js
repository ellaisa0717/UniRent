import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView, // Import ScrollView
  Platform,
  KeyboardAvoidingView, // Import KeyboardAvoidingView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext'; // Import the user hook

// Define colors
const PRIMARY_BLUE = '#0029F3';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

export default function VerificationScreen({ navigation }) {
  const { submitForVerification } = useUser();
  const [idImage, setIdImage] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    // Request permission (good practice)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Aspect ratio for an ID card
      quality: 0.5, // Compress image
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!idImage) {
      Alert.alert('Missing ID', 'Please upload a photo of your Student ID.');
      return;
    }
    // Call the function from our context
    submitForVerification();
    
    // Show success and go back
    Alert.alert(
      'Submission Received',
      'Your ID has been submitted for verification. An admin will review it within 24 hours.'
    );
    navigation.goBack();
  };

  return (
    // Use KeyboardAvoidingView for the whole screen
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Feather name="shield" size={60} color={PRIMARY_BLUE} style={styles.shieldIcon} />
          <Text style={styles.title}>Account Verification</Text>
          <Text style={styles.subtitle}>
            To ensure the safety of our community, please upload a valid USTP Student ID.
          </Text>

          {/* --- Upload Photo Section --- */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {idImage ? (
              <Image source={{ uri: idImage }} style={styles.image} />
            ) : (
              <>
                <Feather name="camera" size={32} color={GRAY_MEDIUM} />
                <Text style={styles.imagePickerText}>Upload Photo of ID</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            This information is for verification only and will be visible to administrators.
          </Text>
        </ScrollView>

        {/* --- Footer Button --- */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.submitButton, !idImage && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={!idImage}
          >
            <Text style={styles.submitButtonText}>Submit for Verification</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  shieldIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BORDER_LIGHT,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    marginBottom: 16,
  },
  imagePickerText: {
    color: GRAY_MEDIUM,
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  note: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    textAlign: 'center',
  },
  footer: {
    // We remove 'position: absolute' so it works with KeyboardAvoidingView
    backgroundColor: WHITE,
    padding: 16,
    paddingBottom: 24, // Home bar spacing
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  submitButton: {
    backgroundColor: YELLOW_PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#FDE68A', // Lighter yellow
  },
  submitButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});