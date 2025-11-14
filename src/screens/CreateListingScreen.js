import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Define colors
const PRIMARY_BLUE = '#0029F3';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';
const YELLOW_PRIMARY = '#FDB022';

const CATEGORIES = [
  'Microcontrollers',
  'Sensors',
  'Modules',
  'Single-board',
  'Power',
  'Other',
];

export default function CreateListingScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!itemName || !price || !category || !image) {
      Alert.alert('Missing Fields', 'Please fill in all fields and add a photo.');
      return;
    }
    console.log('Posting item:', { itemName, description, price, category, image });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Rental Item</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Feather name="x" size={24} color={TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Upload Photo Section --- */}
        <Text style={styles.label}>Item Photo</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Feather name="upload-cloud" size={32} color={GRAY_MEDIUM} />
              <Text style={styles.imagePickerText}>Upload a photo</Text>
            </>
          )}
        </TouchableOpacity>

        {/* --- Details Card --- */}
        <Text style={styles.label}>Item Details</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            placeholderTextColor={GRAY_MEDIUM}
            value={itemName}
            onChangeText={setItemName}
          />
          <View style={styles.divider} />
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Description (e.g., condition, specs...)"
            placeholderTextColor={GRAY_MEDIUM}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>₱</Text>
            <TextInput
              style={styles.inputPrice}
              placeholder="Price (per day)"
              placeholderTextColor={GRAY_MEDIUM}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* --- Category Card (FIXED) --- */}
        <Text style={styles.label}>Category</Text>
        {/* Added padding directly to the card */}
        <View style={[styles.card, { padding: 16 }]}>
          {/* The dropdown TouchableOpacity is removed */}
          <View style={styles.pillsContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, category === cat && styles.pillActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.pillText, category === cat && styles.pillTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* --- END OF FIX --- */}

      </ScrollView>

      {/* --- Footer Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post Item for Rent</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_LIGHT_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
    backgroundColor: WHITE,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Space for footer
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    marginBottom: 8,
    marginLeft: 4,
  },
  imagePicker: {
    width: '100%',
    height: 150,
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
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top', // for Android
  },
  divider: {
    height: 1,
    backgroundColor: BORDER_LIGHT,
    marginHorizontal: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: GRAY_MEDIUM,
    marginRight: 8,
  },
  inputPrice: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
  // --- REMOVED categoryPicker and categoryText styles ---
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    // Removed border and extra padding
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: GRAY_LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
  },
  pillActive: {
    backgroundColor: PRIMARY_BLUE,
    borderColor: PRIMARY_BLUE,
  },
  pillText: {
    color: TEXT_PRIMARY,
    fontWeight: '600',
  },
  pillTextActive: {
    color: WHITE,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    padding: 16,
    paddingBottom: 24, // Home bar spacing
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  postButton: {
    backgroundColor: YELLOW_PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});