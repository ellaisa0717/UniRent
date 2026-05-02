import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../constants/colors';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    if (!form.fullName || !form.studentId || !form.email || !form.password) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      // FIXED: Pointed to the exact same IP we used for the Web App (.95)
      const response = await fetch("http://192.168.5.95:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.studentId, // Django expects 'username'
          email: form.email,
          password: form.password,
          full_name: form.fullName, // Django expects 'full_name' for our custom logic
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created for " + form.fullName, [
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert("Registration Failed", data.error || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Cannot reach the server. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={{ color: '#F59E0B' }}>Uni</Text>
            <Text style={{ color: '#1E40AF' }}>Rent</Text>
          </Text>
          <Text style={{ fontWeight: '600' }}>Create Student Account</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomInput
            label="Full Name"
            placeholder="Juan Dela Cruz"
            value={form.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
          />
          <CustomInput
            label="Student ID"
            placeholder="202X-XXXXX"
            value={form.studentId}
            onChangeText={(text) => handleChange('studentId', text)}
            autoCapitalize="none"
          />
          <CustomInput
            label="Email Address"
            placeholder="student@university.edu"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            autoCapitalize="none"
          />
          <CustomInput
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#F59E0B" style={{ marginTop: 24 }} />
          ) : (
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerText}>Complete Registration</Text>
            </TouchableOpacity>
          )}
         
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: COLORS.textSecondary }}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40, backgroundColor: COLORS.white },
  container: { flexGrow: 1, alignItems: 'center', padding: 24 },
  logoContainer: { marginTop: 40, alignItems: 'center', marginBottom: 24 },
  logoText: { fontSize: 48, fontWeight: '900' },
  formContainer: { width: '100%' },
  registerButton: {
    backgroundColor: '#F59E0B',
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
  },
  registerText: { color: '#1E293B', fontWeight: '700', fontSize: 16 },
});