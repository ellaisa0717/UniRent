import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

// ✅ Logo section
const Logo = () => (
  <View style={styles.logoContainer}>
    {/* ✅ Make sure your logo.png is inside: src/assets/images/logo.png */}
    <Image
      source={require('../assets/images/logo.png')}
      style={styles.logoImage}
      resizeMode="contain"
    />
    <Text style={styles.tagline}>Browse and rent IoT devices for your projects</Text>
  </View>
);

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
            style={styles.smallButton}
            textStyle={styles.smallButtonText} // ✅ smaller font
          />
          <CustomButton
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ✅ Larger logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: width * 0.9,
    height: width * 0.55,
    marginBottom: 14,
  },

  tagline: {
    marginTop: 1,
    fontSize: 15,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },

  // ✅ Smaller buttons to match logo
  buttonsContainer: {
    width: '80%',
    marginTop: 40,
  },
  smallButton: {
    height: 42, // smaller height
    borderRadius: 22,
    marginVertical: 8,
  },
  smallButtonText: {
    fontSize: 14, // smaller text
    fontWeight: '600',
  },
});
