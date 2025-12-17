// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  RefreshControl,
  StatusBar,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ RECARGAR cuando la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await api.getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los eventos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const getEventColor = (index) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    return colors[index % colors.length];
  };

  const renderEvent = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { 
        event: item,
        onDelete: loadEvents // ← Callback para recargar
      })}
      activeOpacity={0.7}
    >
      <View style={[styles.eventColorBar, { backgroundColor: item.color || getEventColor(index) }]} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <View style={styles.eventIcon}>
            <Ionicons name="calendar" size={24} color={item.color || getEventColor(index)} />
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.eventDescription} numberOfLines={1}>
              {item.description || 'Sin descripción'}
            </Text>
          </View>
        </View>
        <View style={styles.eventFooter}>
          <View style={styles.dateTimeContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.eventTime}>{item.time}</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.eventDate}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.chevron} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="refresh" size={50} color="#007AFF" />
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mis Eventos</Text>
          <Text style={styles.headerSubtitle}>
            {events.length} {events.length === 1 ? 'evento programado' : 'eventos programados'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Agregar')}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={100} color="#E0E0E0" />
            <Text style={styles.emptyTitle}>No hay eventos</Text>
            <Text style={styles.emptySubtitle}>Toca el botón + para agregar uno</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#007AFF', marginTop: 10 },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#1A1A1A' },
  headerSubtitle: { fontSize: 15, color: '#666', marginTop: 5 },
  addButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  listContainer: { padding: 20, paddingBottom: 100 },
  eventCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, overflow: 'hidden' },
  eventColorBar: { width: 5 },
  eventContent: { flex: 1, padding: 16 },
  eventHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  eventIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 18, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
  eventDescription: { fontSize: 14, color: '#666' },
  eventFooter: { flexDirection: 'row', gap: 16 },
  dateTimeContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventTime: { fontSize: 13, color: '#666' },
  eventDate: { fontSize: 13, color: '#666' },
  chevron: { alignSelf: 'center', marginRight: 16 },
  emptyContainer: { alignItems: 'center', marginTop: 120, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 24, fontWeight: '600', color: '#999', marginTop: 20 },
  emptySubtitle: { fontSize: 16, color: '#999', marginTop: 8, textAlign: 'center' },
});