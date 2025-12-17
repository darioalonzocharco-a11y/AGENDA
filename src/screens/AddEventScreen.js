// src/screens/AddEventScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveEvent = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    const newEvent = {
      title: title.trim(),
      description: description.trim(),
      date: date.toISOString().split('T')[0],
      time: time.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      setLoading(true);
      await api.createEvent(newEvent);
      
      Alert.alert(
        '✅ Éxito', 
        'Evento guardado correctamente',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Limpiar formulario
              setTitle('');
              setDescription('');
              setDate(new Date());
              setTime(new Date());
              // Regresar a Inicio
              navigation.navigate('Inicio');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('❌ Error', error.message || 'No se pudo guardar el evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-sharp" size={32} color="#007AFF" />
          </View>
          <Text style={styles.headerTitle}>Nuevo Evento</Text>
          <Text style={styles.headerSubtitle}>Completa la información del evento</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Ionicons name="create-outline" size={18} color="#007AFF" /> Título *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Reunión con cliente"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Ionicons name="document-text-outline" size={18} color="#007AFF" /> Descripción
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Detalles del evento..."
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!loading}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>
                <Ionicons name="calendar-outline" size={18} color="#007AFF" /> Fecha
              </Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
                disabled={loading}
              >
                <Ionicons name="calendar" size={22} color="#007AFF" />
                <Text style={styles.dateText}>
                  {date.toLocaleDateString('es-MX', { 
                    day: '2-digit',
                    month: 'short'
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>
                <Ionicons name="time-outline" size={18} color="#007AFF" /> Hora
              </Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
                disabled={loading}
              >
                <Ionicons name="time" size={22} color="#007AFF" />
                <Text style={styles.dateText}>
                  {time.toLocaleTimeString('es-MX', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSaveEvent}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>Guardar</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollView: { flex: 1 },
  header: { backgroundColor: '#fff', padding: 30, paddingTop: 60, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  iconContainer: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  headerSubtitle: { fontSize: 15, color: '#666' },
  formContainer: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 10 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 16, fontSize: 16, color: '#1A1A1A' },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row' },
  dateButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 16, gap: 12 },
  dateText: { fontSize: 16, color: '#1A1A1A', fontWeight: '500' },
  buttonContainer: { flexDirection: 'row', padding: 20, paddingBottom: 40, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E0E0E0', gap: 12 },
  cancelButton: { flex: 1, padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  cancelButtonText: { fontSize: 16, fontWeight: '600', color: '#666' },
  saveButton: { flex: 2, flexDirection: 'row', backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  saveButtonDisabled: { backgroundColor: '#999' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});