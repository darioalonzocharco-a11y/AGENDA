// src/screens/CalendarScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

// Configurar idioma español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({
    '2025-11-26': [
      { id: 1, title: 'Reunión con cliente', time: '10:00 AM', color: '#FF6B6B' }
    ],
    '2025-11-27': [
      { id: 2, title: 'Presentación proyecto', time: '3:00 PM', color: '#4ECDC4' }
    ],
    '2025-11-28': [
      { id: 3, title: 'Cita médica', time: '9:00 AM', color: '#45B7D1' },
      { id: 4, title: 'Llamada con equipo', time: '2:00 PM', color: '#FFA07A' }
    ],
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const markedDates = {};
  Object.keys(events).forEach(date => {
    markedDates[date] = { 
      marked: true, 
      dotColor: '#007AFF',
      dots: events[date].map(e => ({ color: e.color }))
    };
  });

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: '#007AFF',
      selectedTextColor: '#fff',
    };
  }

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetail', { 
        event: { ...item, date: selectedDate } 
      })}
      activeOpacity={0.7}
    >
      <View style={[styles.eventColorDot, { backgroundColor: item.color }]} />
      <View style={styles.eventItemContent}>
        <Text style={styles.eventItemTime}>{item.time}</Text>
        <Text style={styles.eventItemTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const selectedEvents = events[selectedDate] || [];
  const formattedDate = selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendario</Text>
        <TouchableOpacity 
          style={styles.todayButton}
          onPress={() => setSelectedDate(new Date().toISOString().split('T')[0])}
        >
          <Ionicons name="today-outline" size={20} color="#007AFF" />
          <Text style={styles.todayButtonText}>Hoy</Text>
        </TouchableOpacity>
      </View>

      <Calendar
        current={new Date().toISOString().split('T')[0]}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: '#666',
          selectedDayBackgroundColor: '#007AFF',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#007AFF',
          dayTextColor: '#1A1A1A',
          textDisabledColor: '#d9d9d9',
          dotColor: '#007AFF',
          selectedDotColor: '#ffffff',
          arrowColor: '#007AFF',
          monthTextColor: '#1A1A1A',
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
        enableSwipeMonths={true}
      />

      <View style={styles.eventsContainer}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsHeaderTitle}>
            {formattedDate}
          </Text>
          <View style={styles.eventsBadge}>
            <Text style={styles.eventsBadgeText}>
              {selectedEvents.length}
            </Text>
          </View>
        </View>

        {selectedEvents.length > 0 ? (
          <FlatList
            data={selectedEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noEventsContainer}>
            <Ionicons name="calendar-outline" size={80} color="#E0E0E0" />
            <Text style={styles.noEventsTitle}>Sin eventos</Text>
            <Text style={styles.noEventsSubtitle}>
              No hay eventos programados para esta fecha
            </Text>
            <TouchableOpacity 
              style={styles.addEventButton}
              onPress={() => navigation.navigate('Agregar')}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addEventButtonText}>Agregar evento</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  calendar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  eventsHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  eventsBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  eventsBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventsList: {
    padding: 20,
    paddingBottom: 100,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  eventColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  eventItemContent: {
    flex: 1,
  },
  eventItemTime: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  eventItemTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noEventsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#999',
    marginTop: 20,
  },
  noEventsSubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addEventButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});