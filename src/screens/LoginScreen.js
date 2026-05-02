import AsyncStorage from '@react-native-async-storage/async-storage'; // NEW: Required to save the token!
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../constants/colors';

export default function LoginScreen({ navigation }) {
  const [studentId, setStudentId] = useState(''); // FIXED: Changed to Student ID to match backend
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!studentId || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      // FIXED: Pointed to the exact same IP (.95)
      const response = await fetch("http://192.168.5.95:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: studentId, // Django expects 'username'
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // FIXED: Securely save the token to the device storage!
        await AsyncStorage.setItem('token', data.token);
        console.log("Token saved successfully!"); 
        
        setIsLoading(false);
        navigation.replace('HomeTabs');
      } else {
        setIsLoading(false);
        Alert.alert("Login Failed", data.error || "Invalid Student ID or password.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      Alert.alert("Network Error", "Cannot reach the server. Make sure your Mac and Phone are on the same Wi-Fi.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>Uni<Text style={{color: COLORS.primary}}>Rent</Text></Text>
        
        <CustomInput 
          label="Student ID" 
          value={studentId} 
          onChangeText={setStudentId} 
          placeholder="Enter Student ID (e.g., 202X-XXXXX)"
          autoCapitalize="none"
        />
        <CustomInput 
          label="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          placeholder="Enter password"
        />

        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 16 }} />
        ) : (
          <CustomButton title="Log in" onPress={handleLogin} style={{ marginTop: 16 }} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.footer}>
          <Text>Don't have an account? <Text style={{color: COLORS.primary, fontWeight:'bold'}}>Register</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24 },
  content: { flex: 1, justifyContent: 'center' },
  logoText: { fontSize: 48, fontWeight: '900', textAlign: 'center', marginBottom: 40 },
  footer: { marginTop: 20, alignItems: 'center' }
});