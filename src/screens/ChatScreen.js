import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
// --- THIS IS THE FIX (Part 1) ---
// Import the hook that gets the header's height
import { useHeaderHeight } from '@react-navigation/elements';
// --- END OF FIX ---

// Define colors
const PRIMARY_BLUE = '#0029F3';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';

// --- Sample Message Data ---
const SAMPLE_MESSAGES = [
  {
    _id: 1,
    text: 'Is the ESP32 still available?',
    createdAt: new Date(Date.now() - 60000 * 2), 
    user: { _id: 2, name: 'John D.' }, 
  },
  {
    _id: 2,
    text: 'Yes, it is! When are you available to pick it up?',
    createdAt: new Date(Date.now() - 60000 * 1), 
    user: { _id: 1, name: 'Ellaisa F.' }, 
  },
];

const MY_USER_ID = 1;

export default function ChatScreen({ route, navigation }) {
  const { userName } = route.params;
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState('');

  // --- THIS IS THE FIX (Part 2) ---
  // Get the exact height of the navigator header
  const headerHeight = useHeaderHeight();
  // --- END OF FIX ---

  const onSend = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      _id: Math.random().toString(),
      text: inputText,
      createdAt: new Date(),
      user: { _id: MY_USER_ID, name: 'You' },
    };
    setMessages(previousMessages => [newMessage, ...previousMessages]);
    setInputText('');
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.user._id === MY_USER_ID;
    return (
      <View 
        style={[
          styles.bubbleContainer, 
          isMyMessage ? styles.myBubble : styles.otherBubble
        ]}
      >
        <Text style={isMyMessage ? styles.myText : styles.otherText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    // --- THIS IS THE FIX (Part 3) ---
    // KeyboardAvoidingView is the root, using the *exact* headerHeight
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: WHITE }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight} 
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
        
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item._id.toString()}
          style={styles.chatList}
          inverted 
          contentContainerStyle={{ paddingVertical: 10 }}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={GRAY_MEDIUM}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={onSend}>
            <Feather name="send" size={22} color={WHITE} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
    // --- END OF FIX ---
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bubbleContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
  },
  myBubble: {
    backgroundColor: PRIMARY_BLUE,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: GRAY_LIGHT_BG,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  myText: {
    color: WHITE,
    fontSize: 15,
  },
  otherText: {
    color: TEXT_PRIMARY,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
    backgroundColor: WHITE,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120, 
    paddingHorizontal: 16,
    backgroundColor: GRAY_LIGHT_BG,
    borderRadius: 20,
    fontSize: 15,
    marginRight: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 8,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});