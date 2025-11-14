import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define colors
const PRIMARY_BLUE = '#0029F3';
const WHITE = '#FFFFFF';
const GRAY_LIGHT_BG = '#F3F4F6';
const GRAY_MEDIUM = '#6B7280';
const TEXT_PRIMARY = '#111827';
const BORDER_LIGHT = '#E5E7EB';

// --- Calendar Theme (to match your app) ---
const CALENDAR_THEME = {
  backgroundColor: WHITE,
  calendarBackground: WHITE,
  textSectionTitleColor: PRIMARY_BLUE,
  selectedDayBackgroundColor: PRIMARY_BLUE,
  selectedDayTextColor: WHITE,
  todayTextColor: PRIMARY_BLUE,
  dayTextColor: TEXT_PRIMARY,
  textDisabledColor: '#d9e1e8',
  dotColor: PRIMARY_BLUE,
  selectedDotColor: WHITE,
  arrowColor: PRIMARY_BLUE,
  monthTextColor: TEXT_PRIMARY,
  indicatorColor: PRIMARY_BLUE,
  textDayFontWeight: '500',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: 'bold',
  textDayFontSize: 16,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 14,
};

export default function CalendarScreen({ route, navigation }) {
  // Get today's date in 'YYYY-MM-DD' format
  const today = format(new Date(), 'yyyy-MM-dd');

  // --- THIS IS THE FIX ---
  // We move the BOOKED_DATES constant *inside* the component,
  // so it can safely access the 'styles' object.
  const BOOKED_DATES = {
    '2025-11-20': { disabled: true, disableTouchEvent: true, customStyles: styles.bookedDay },
    '2025-11-21': { disabled: true, disableTouchEvent: true, customStyles: styles.bookedDay },
    '2025-11-22': { disabled: true, disableTouchEvent: true, customStyles: styles.bookedDay },
    '2025-12-05': { disabled: true, disableTouchEvent: true, customStyles: styles.bookedDay },
  };
  // --- END OF FIX ---

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={GRAY_LIGHT_BG} />
      
      {/* --- Custom Modal Header --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Check Availability</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Feather name="x" size={24} color={TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={styles.legend}>
        <View style={[styles.legendBox, { backgroundColor: GRAY_LIGHT_BG }]} />
        <Text style={styles.legendText}>Booked</Text>
      </View>
      
      <Calendar
        style={styles.calendar}
        theme={CALENDAR_THEME}
        markedDates={BOOKED_DATES}
        minDate={today}
      />
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
  calendar: {
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    borderRadius: 12,
    margin: 16,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: GRAY_MEDIUM,
  },
  // This style is now correctly read
  bookedDay: {
    container: {
      backgroundColor: GRAY_LIGHT_BG,
      borderColor: BORDER_LIGHT,
      borderWidth: 1,
    },
    text: {
      color: GRAY_MEDIUM,
      textDecorationLine: 'line-through',
    },
  },
});