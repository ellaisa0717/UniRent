import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/colors';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    birthday: '',
    studentId: '',
    year: '',
    major: '',
    phone: '',
    email: '',
    university: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          {/* Replace with your logo image if available */}
          <Text style={styles.logoText}>
            <Text style={styles.uni}>Uni</Text>
            <Text style={styles.rent}>Rent</Text>
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={form.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your age"
                keyboardType="numeric"
                value={form.age}
                onChangeText={(text) => handleChange('age', text)}
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your birthday"
                value={form.birthday}
                onChangeText={(text) => handleChange('birthday', text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your student ID"
            value={form.studentId}
            onChangeText={(text) => handleChange('studentId', text)}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your year"
                value={form.year}
                onChangeText={(text) => handleChange('year', text)}
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Major</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Major"
                value={form.major}
                onChangeText={(text) => handleChange('major', text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Phone no.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone no."
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />

          <Text style={styles.label}>University</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your university"
            value={form.university}
            onChangeText={(text) => handleChange('university', text)}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
    backgroundColor: COLORS.white,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 24,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 56,
    fontWeight: '900',
  },
  uni: { color: '#F59E0B' },
  rent: { color: '#1E40AF' },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#E8EEFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    flex: 1,
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: '#F59E0B',
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  registerText: {
    color: '#1E293B',
    fontWeight: '700',
    fontSize: 16,
  },
});
