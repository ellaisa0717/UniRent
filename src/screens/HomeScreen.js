import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
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
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_W = (width - 24 * 2 - CARD_GAP) / 2; // padding 24 on both sides

// ----- Demo data (swap with your own later) -----
const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'microcontrollers', label: 'Microcontrollers' },
  { id: 'sbc', label: 'Single-board' },
  { id: 'sensors', label: 'Sensors' },
  { id: 'modules', label: 'Modules' },
  { id: 'power', label: 'Power' },
];

const PRODUCTS = [
  // Microcontrollers
  {
    id: 'uno',
    title: 'ARDUINO UNO R3',
    category: 'microcontrollers',
    desc:
      'Popular microcontroller board based on the ATmega328P. Ideal for beginners in electronics and programming.',
    img: 'https://i.imgur.com/Zy2Qk8G.png',
  },
  {
    id: 'mega',
    title: 'ARDUINO MEGA 2560',
    category: 'microcontrollers',
    desc:
      'An advanced microcontroller with more memory and pins, great for complex projects.',
    img: 'https://i.imgur.com/2O6pY1y.png',
  },
  {
    id: 'esp32',
    title: 'ESP32 DEVELOPMENT BOARD',
    category: 'microcontrollers',
    desc:
      'Wi-Fi and Bluetooth-enabled MCU with dual-core processing, perfect for IoT projects.',
    img: 'https://i.imgur.com/Xx8Q1o7.png',
  },
  {
    id: 'esp8266',
    title: 'ESP8266 NODEMCU',
    category: 'microcontrollers',
    desc: 'Compact Wi-Fi-enabled controller suitable for small IoT prototypes.',
    img: 'https://i.imgur.com/5L7Bfwn.png',
  },

  // Single-board computers
  {
    id: 'pi-zero',
    title: 'RASPBERRY PI ZERO W',
    category: 'sbc',
    desc:
      'Compact, affordable Pi board for lightweight IoT and embedded projects.',
    img: 'https://i.imgur.com/2c5Y4Y6.png',
  },
  {
    id: 'jetson',
    title: 'NVIDIA JETSON NANO',
    category: 'sbc',
    desc: 'AI-powered SBC for ML, image processing and robotics.',
    img: 'https://i.imgur.com/1sJQ2sC.png',
  },
  {
    id: 'pi4',
    title: 'RASPBERRY PI 4 MODEL B',
    category: 'sbc',
    desc:
      'Powerful single-board computer for advanced IoT, AI, and server-based capture projects.',
    img: 'https://i.imgur.com/0quD8jC.png',
  },
  {
    id: 'dht22',
    title: 'DHT22 TEMPERATURE & HUMIDITY',
    category: 'sensors',
    desc: 'High-accuracy sensor for environmental monitoring projects.',
    img: 'https://i.imgur.com/9yJYz3U.png',
  },

  // Sensors
  {
    id: 'pir',
    title: 'PIR MOTION SENSOR',
    category: 'sensors',
    desc: 'Detects human movement; used in automation and security systems.',
    img: 'https://i.imgur.com/ba8K1rU.png',
  },
  {
    id: 'mq2',
    title: 'MQ-2 GAS SENSOR',
    category: 'sensors',
    desc: 'Detects flammable gases like LPG, methane, and smoke.',
    img: 'https://i.imgur.com/NwV0cJX.png',
  },
  {
    id: 'hc-sr04',
    title: 'HC-SR04 ULTRASONIC DISTANCE',
    category: 'sensors',
    desc: 'Affordable sensor for distance measurement and obstacle detection.',
    img: 'https://i.imgur.com/0eXH6Vq.png',
  },

  // Modules
  {
    id: 'servo-mg996r',
    title: 'MG996R SERVO MOTOR',
    category: 'modules',
    desc: 'High-torque servo for robotics and heavy-duty mechanisms.',
    img: 'https://i.imgur.com/b83r0Zg.png',
  },
  {
    id: 'l298n',
    title: 'L298N MOTOR DRIVER + DC',
    category: 'modules',
    desc: 'Control DC motors and robotic wheels easily.',
    img: 'https://i.imgur.com/1i9Q3Pz.png',
  },
  {
    id: 'sg90',
    title: 'SG90 SERVO MOTOR',
    category: 'modules',
    desc: 'Mini servo for robotics and automation projects.',
    img: 'https://i.imgur.com/qDA3C1T.png',
  },
  {
    id: 'relay4',
    title: 'RELAY MODULE (4-CHANNEL)',
    category: 'modules',
    desc: 'Control AC appliances with microcontrollers.',
    img: 'https://i.imgur.com/XoW9R9t.png',
  },
  {
    id: 'hc05',
    title: 'HC-05 BLUETOOTH MODULE',
    category: 'modules',
    desc: 'Wireless serial communication for embedded devices.',
    img: 'https://i.imgur.com/ya3iU0f.png',
  },
  {
    id: 'neo6m',
    title: 'NEO-6M GPS MODULE',
    category: 'modules',
    desc: 'Provides GPS location data for IoT and navigation projects.',
    img: 'https://i.imgur.com/6Jx2z0M.png',
  },

  // Power
  {
    id: 'breadboard-psu',
    title: 'BREADBOARD POWER SUPPLY',
    category: 'power',
    desc: 'Supplies regulated power for prototypes.',
    img: 'https://i.imgur.com/KYh1mTn.png',
  },
  {
    id: 'lipo-pack',
    title: 'LI-PO BATTERY PACK (2S 7.4V)',
    category: 'power',
    desc: 'Rechargeable battery for portable electronics.',
    img: 'https://i.imgur.com/k5cY6p1.png',
  },
];

// ----- UI -----
export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = useMemo(() => {
    const byCat = activeCat === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCat);
    const q = query.trim().toLowerCase();
    return q ? byCat.filter(p => p.title.toLowerCase().includes(q)) : byCat;
  }, [query, activeCat]);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.img }} style={styles.cardImage} resizeMode="contain" />
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>AVAILABLE</Text>
        </View>
      </View>

      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>

      <View style={styles.descBubble}>
        <Text style={styles.descText} numberOfLines={3}>
          {item.desc}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.pillBtn, styles.cartBtn]}>
          <MaterialCommunityIcons name="cart-plus" size={14} color="#1F2937" />
          <Text style={styles.pillText}>Add to cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pillBtn, styles.rentBtn]}>
          <MaterialCommunityIcons name="wallet" size={14} color="#1F2937" />
          <Text style={styles.pillText}>Rent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {/* ----- Top bar ----- */}
      <View style={styles.topBar}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.cartIcon}>
          <Feather name="shopping-cart" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* ----- Search ----- */}
      <View style={styles.searchWrap}>
        <Feather name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Search devices"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      {/* ----- Category chips ----- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
        style={styles.chipsContainer}
      >
        {CATEGORIES.map(cat => {
          const active = activeCat === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setActiveCat(cat.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ----- Product grid ----- */}
      <FlatList
        data={filtered}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.listPad}
        numColumns={2}
        columnWrapperStyle={{ gap: CARD_GAP }}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
      />

      {/* ----- Bottom padding for tab bar ----- */}
      <View style={{ height: 16 }} />
    </SafeAreaView>
  );
}

// ----- Styles -----
const NAVY = '#0B2B66';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 60,
    height: 22,
  },
  cartIcon: {
    marginLeft: 'auto',
  },

  // Search
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 14,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
  },

  // Chips
  chipsContainer: {
    flexGrow: 0,
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  chip: {
    backgroundColor: '#FFF6DB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDB022',
  },
  chipActive: {
    backgroundColor: '#FDB022',
    borderColor: '#F59E0B',
  },
  chipText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  chipTextActive: {
    color: '#000000',
  },

  // List
  listPad: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Card
  card: {
    width: CARD_W,
    borderRadius: 14,
    backgroundColor: NAVY,
    padding: 12,
    marginBottom: CARD_GAP,
  },
  cardImageWrap: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '92%',
    height: 80,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  badgeText: {
    color: '#065F46',
    fontWeight: '700',
    fontSize: 10,
  },
  cardTitle: {
    color: '#E5EDFF',
    marginTop: 10,
    fontWeight: '800',
    fontSize: 12,
  },
  descBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  descText: {
    color: '#111827',
    fontSize: 11,
    lineHeight: 14,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: '#FFE58A',
    gap: 6,
  },
  cartBtn: { backgroundColor: '#FFE58A' },
  rentBtn: { backgroundColor: '#FFE58A' },
  pillText: {
    color: '#1F2937',
    fontWeight: '800',
    fontSize: 10,
  },
});