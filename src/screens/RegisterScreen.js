import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import CustomInput from '../components/CustomInput';

export default function RegisterScreen({ navigation }) {
  // Requirement: State representing real system-related data
  const [form, setForm] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = () => {
    // Requirement: Meaningful UI update (Alert/Navigation)
    if (form.fullName && form.email) {
      Alert.alert("Success", "Account created for " + form.fullName, [
        { text: "OK", onPress: () => navigation.navigate('Login') }
      ]);
    } else {
      Alert.alert("Error", "Please fill out the required fields.");
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
          />

          <CustomInput
            label="Email Address"
            placeholder="student@university.edu"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />

          <CustomInput
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>Complete Registration</Text>
          </TouchableOpacity>
          
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