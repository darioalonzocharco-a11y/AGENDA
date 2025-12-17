// src/screens/EventDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function EventDetailScreen({ route, navigation }) {
  const { event, onDelete } = route.params;
  const [loading, setLoading] = useState(false);

  const handleDeleteEvent = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await api.deleteEvent(event.id);
              
              // Llamar callback para recargar
              if (onDelete) onDelete();
              
              Alert.alert('✅ Éxito', 'Evento eliminado correctamente', [
                { text: 'OK', onPress: () => navigation.navigate('Inicio') }
              ]);
            } catch (error) {
              Alert.alert('❌ Error', error.message || 'No se pudo eliminar el evento');
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleEditEvent = () => {
    Alert.alert('Próximamente', 'Función de edición en desarrollo');
  };

  const handleShareEvent = () => {
    Alert.alert('Compartir', `${event.title}\n${event.date} - ${event.time}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerGradient}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={48} color="#fff" />
          </View>
          <Text style={styles.title}>{event.title}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="calendar-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Fecha</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="time-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Hora</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>
          </View>

          {event.description && (
            <>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="document-text-outline" size={24} color="#007AFF" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Descripción</Text>
                  <Text style={styles.detailValueMultiline}>{event.description}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShareEvent}
            disabled={loading}
          >
            <Ionicons name="share-outline" size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEditEvent}
            disabled={loading}
          >
            <Ionicons name="create-outline" size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteActionButton]}
            onPress={handleDeleteEvent}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FF3B30" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                <Text style={[styles.actionButtonText, styles.deleteActionButtonText]}>Eliminar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  headerGradient: { backgroundColor: '#007AFF', paddingTop: 50, paddingBottom: 40, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  headerContent: { alignItems: 'center' },
  iconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingHorizontal: 20 },
  content: { flex: 1, marginTop: -20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#F8F9FA' },
  card: { backgroundColor: '#fff', margin: 20, borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12 },
  detailIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  detailContent: { flex: 1, justifyContent: 'center' },
  detailLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  detailValue: { fontSize: 18, color: '#1A1A1A', fontWeight: '600' },
  detailValueMultiline: { fontSize: 16, color: '#1A1A1A', lineHeight: 24 },
  separator: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 8 },
  actionButtons: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 40 },
  actionButton: { flex: 1, backgroundColor: '#fff', paddingVertical: 16, borderRadius: 16, alignItems: 'center', gap: 8, borderWidth: 2, borderColor: '#007AFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  actionButtonText: { fontSize: 13, fontWeight: '600', color: '#007AFF' },
  deleteActionButton: { borderColor: '#FF3B30' },
  deleteActionButtonText: { color: '#FF3B30' },
});