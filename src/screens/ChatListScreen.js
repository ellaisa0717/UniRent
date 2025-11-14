import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Define colors
const NAVY = '#0B2B66';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';

// --- Sample Chat Data ---
// In a real app, this would come from your backend/database
const CHAT_DATA = [
  {
    id: '1',
    userName: 'Ellaisa F.',
    avatar: 'https://i.imgur.com/L2aPU8N.png', // Placeholder avatar
    lastMessage: 'Sounds good, I can meet you at the library tomorrow at 2 PM.',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    userName: 'John D.',
    avatar: 'https://i.imgur.com/8Km9tcn.png', // Placeholder avatar
    lastMessage: 'Is the ESP32 still available?',
    time: '1d ago',
    unread: false,
  },
  {
    id: '3',
    userName: 'Alex M.',
    avatar: 'https://i.imgur.com/L2aPU8N.png', 
    lastMessage: 'Perfect, thank you!',
    time: '3d ago',
    unread: false,
  },
];

export default function ChatListScreen({ navigation }) {
  
  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      // This will navigate to the specific chat
      onPress={() => navigation.navigate('Chat', { userName: item.userName, userId: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text 
          style={[styles.lastMessage, item.unread && styles.unreadMessage]} 
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      <FlatList
        data={CHAT_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="message-square" size={60} color={GRAY_MEDIUM} />
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER_LIGHT,
    marginLeft: 80, // Indent the divider
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: WHITE,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  time: {
    fontSize: 12,
    color: GRAY_MEDIUM,
  },
  lastMessage: {
    fontSize: 14,
    color: GRAY_MEDIUM,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: NAVY,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: GRAY_MEDIUM,
    marginTop: 15,
  },
});