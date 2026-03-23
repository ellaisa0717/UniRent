import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // NEW: Extra state for "Excellent" rating

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true); // Trigger visible UI update
    
    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('HomeTabs');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>Uni<Text style={{color: COLORS.primary}}>Rent</Text></Text>
        
        <CustomInput 
          label="Student Email" 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Enter email"
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