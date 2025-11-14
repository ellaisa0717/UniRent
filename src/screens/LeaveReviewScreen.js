import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
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

// Star Rating Component
const StarRating = ({ rating, setRating }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Feather
            name="star"
            size={32}
            color={star <= rating ? YELLOW_PRIMARY : GRAY_MEDIUM}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function LeaveReviewScreen({ route, navigation }) {
  const { item } = route.params; // Get the item being reviewed
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Missing Rating', 'Please select a star rating.');
      return;
    }
    // In a real app, you'd submit this data to your backend
    console.log('Submitting review:', {
      itemId: item.id,
      owner: item.owner,
      rating: rating,
      comment: comment,
    });
    // Go back to the My Rentals screen
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
        
        {/* --- Custom Modal Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Leave a Review</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Feather name="x" size={24} color={TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* --- Item Info --- */}
          <View style={styles.itemInfo}>
            <Image source={{ uri: item.img }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemOwner}>Rented from {item.owner}</Text>
            </View>
          </View>

          {/* --- Rating Section --- */}
          <View style={styles.card}>
            <Text style={styles.label}>Your Rating</Text>
            <StarRating rating={rating} setRating={setRating} />
          </View>

          {/* --- Comment Section --- */}
          <View style={styles.card}>
            <Text style={styles.label}>Your Review (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="How was your experience? What was the item's condition?"
              placeholderTextColor={GRAY_MEDIUM}
              value={comment}
              onChangeText={setComment}
              multiline
            />
          </View>
        </ScrollView>

        {/* --- Footer Button --- */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
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
    paddingBottom: 100,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  itemOwner: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    marginTop: 4,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    marginBottom: 12,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  star: {
    marginHorizontal: 5,
  },
  textInput: {
    height: 120,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: TEXT_PRIMARY,
    textAlignVertical: 'top', // for Android
  },
  footer: {
    backgroundColor: WHITE,
    padding: 16,
    paddingBottom: 24, // Home bar spacing
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
  },
  submitButton: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});