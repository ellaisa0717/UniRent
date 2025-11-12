import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_W = (width - 16 * 2 - CARD_GAP) / 2; 

// --- Products with Prices (Full List) ---
const PRODUCTS = [
  // Microcontrollers
  {
    id: 'uno',
    title: 'ARDUINO UNO R3',
    category: 'microcontrollers',
    desc:
      'Popular microcontroller board based on the ATmega328P. Ideal for beginners in electronics and programming.',
    img: 'https://i.imgur.com/Zy2Qk8G.png',
    price: 25, 
  },
  {
    id: 'mega',
    title: 'ARDUINO MEGA 2560',
    category: 'microcontrollers',
    desc:
      'An advanced microcontroller with more memory and pins, great for complex projects.',
    img: 'https://i.imgur.com/2O6pY1y.png',
    price: 45, 
  },
  {
    id: 'esp32',
    title: 'ESP32 DEVELOPMENT BOARD',
    category: 'microcontrollers',
    desc:
      'Wi-Fi and Bluetooth-enabled MCU with dual-core processing, perfect for IoT projects.',
    img: 'https://i.imgur.com/Xx8Q1o7.png',
    price: 30, 
  },
  {
    id: 'esp8266',
    title: 'ESP8266 NODEMCU',
    category: 'microcontrollers',
    desc: 'Compact Wi-Fi-enabled controller suitable for small IoT prototypes.',
    img: 'https://i.imgur.com/5L7Bfwn.png',
    price: 20, 
  },

  // Single-board computers
  {
    id: 'pi-zero',
    title: 'RASPBERRY PI ZERO W',
    category: 'sbc',
    desc:
      'Compact, affordable Pi board for lightweight IoT and embedded projects.',
    img: 'https://i.imgur.com/2c5Y4Y6.png',
    price: 50, 
  },
  {
    id: 'jetson',
    title: 'NVIDIA JETSON NANO',
    category: 'sbc',
    desc: 'AI-powered SBC for ML, image processing and robotics.',
    img: 'https://i.imgur.com/1sJQ2sC.png',
    price: 150, 
  },
  {
    id: 'pi4',
    title: 'RASPBERRY PI 4 MODEL B',
    category: 'sbc',
    desc:
      'Powerful single-board computer for advanced IoT, AI, and server-based capture projects.',
    img: 'https://i.imgur.com/0quD8jC.png',
    price: 75, 
  },
  {
    id: 'dht22',
    title: 'DHT22 TEMPERATURE & HUMIDITY',
    category: 'sensors',
    desc: 'High-accuracy sensor for environmental monitoring projects.',
    img: 'https://i.imgur.com/9yJYz3U.png',
    price: 15, 
  },

  // Sensors
  {
    id: 'pir',
    title: 'PIR MOTION SENSOR',
    category: 'sensors',
    desc: 'Detects human movement; used in automation and security systems.',
    img: 'https://i.imgur.com/ba8K1rU.png',
    price: 20, 
  },
  {
    id: 'mq2',
    title: 'MQ-2 GAS SENSOR',
    category: 'sensors',
    desc: 'Detects flammable gases like LPG, methane, and smoke.',
    img: 'https://i.imgur.com/NwV0cJX.png',
    price: 18, 
  },
  {
    id: 'hc-sr04',
    title: 'HC-SR04 ULTRASONIC DISTANCE',
    category: 'sensors',
    desc: 'Affordable sensor for distance measurement and obstacle detection.',
    img: 'https://i.imgur.com/0eXH6Vq.png',
    price: 10, 
  },

  // Modules
  {
    id: 'servo-mg996r',
    title: 'MG996R SERVO MOTOR',
    category: 'modules',
    desc: 'High-torque servo for robotics and heavy-duty mechanisms.',
    img: 'https://i.imgur.com/b83r0Zg.png',
    price: 22, 
  },
  {
    id: 'l298n',
    title: 'L298N MOTOR DRIVER + DC',
    category: 'modules',
    desc: 'Control DC motors and robotic wheels easily.',
    img: 'https://i.imgur.com/1i9Q3Pz.png',
    price: 25, 
  },
  {
    id: 'sg90',
    title: 'SG90 SERVO MOTOR',
    category: 'modules',
    desc: 'Mini servo for robotics and automation projects.',
    img: 'https://i.imgur.com/qDA3C1T.png',
    price: 12, 
  },
  {
    id: 'relay4',
    title: 'RELAY MODULE (4-CHANNEL)',
    category: 'modules',
    desc: 'Control AC appliances with microcontrollers.',
    img: 'https://i.imgur.com/XoW9R9t.png',
    price: 30, 
  },
  {
    id: 'hc05',
    title: 'HC-05 BLUETOOTH MODULE',
    category: 'modules',
    desc: 'Wireless serial communication for embedded devices.',
    img: 'https://i.imgur.com/ya3iU0f.png',
    price: 28, 
  },
  {
    id: 'neo6m',
    title: 'NEO-6M GPS MODULE',
    category: 'modules',
    desc: 'Provides GPS location data for IoT and navigation projects.',
    img: 'https://i.imgur.com/6Jx2z0M.png',
    price: 35, 
  },

  // Power
  {
    id: 'breadboard-psu',
    title: 'BREADBOARD POWER SUPPLY',
    category: 'power',
    desc: 'Supplies regulated power for prototypes.',
    img: 'https://i.imgur.com/KYh1mTn.png',
    price: 15, 
  },
  {
    id: 'lipo-pack',
    title: 'LI-PO BATTERY PACK (2S 7.4V)',
    category: 'power',
    desc: 'Rechargeable battery for portable electronics.',
    img: 'https.i.imgur.com/k5cY6p1.png',
    price: 40, 
  },
];

// ----- UI -----
export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = useMemo(() => {
    const byCat = activeCat === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCat);
    const q = query.trim().toLowerCase();
    return q ? byCat.filter(p => p.title.toLowerCase().includes(q)) : byCat;
  }, [query, activeCat]);

  // This function now navigates to the detail screen
  const handleItemPress = (product) => {
    navigation.navigate('ProductDetail', { product: product });
  };

  // ----- Card Renderer -----
  const renderCard = ({ item }) => (
    // The entire card is now a button
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.img }} style={styles.cardImage} resizeMode="contain" />
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>AVAILABLE</Text>
        </View>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      
      {/* We only show the price here */}
      <Text style={styles.priceText}>₱{item.price}/day</Text>
      
    </TouchableOpacity>
  );

  // --- Stable functions for the header (Unchanged) ---
  const stableSetQuery = useCallback((text) => {
    setQuery(text);
  }, []);

  const stableSetActiveCat = useCallback((catId) => {
    setActiveCat(catId);
  }, []);

  return (
    <View style={styles.wrap}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <HomeHeader
        onQueryChange={stableSetQuery}
        onCategoryChange={stableSetActiveCat}
      />

      <FlatList
        data={filtered}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.listPad}
        numColumns={2}
        columnWrapperStyle={{ gap: CARD_GAP }}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 16 }} />}
      />
    </View>
  );
}

// ----- Styles -----
const NAVY = '#0B2B66';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listPad: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
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
  priceText: {
    color: '#FFE58A', // Yellow accent
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8, 
    alignSelf: 'flex-start',
  },
});