// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AddEventScreen from '../screens/AddEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calendario') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Agregar') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Calendario" component={CalendarScreen} />
      <Tab.Screen name="Agregar" component={AddEventScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen}
          options={{ 
            headerShown: true,
            title: 'Detalle del Evento',
            headerBackTitle: 'Atrás'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}