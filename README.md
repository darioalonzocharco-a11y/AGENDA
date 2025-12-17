# Agenda Explorer - guarda eventos importantes

## 1. Identificación del Proyecto

- **Nombre de la App:** Agenda Movil
- **Asignatura/Profesor:** Desarrollo de Aplicaciones Móviles / M.C. Leonel González Vidales
- **Periodo/Fecha:** Septiembre 2025
- **URL del Repositorio:** https://github.com/darioalonzocharco-a11y/AGENDA

## 2. Descripción del Proyecto

Agenda Móvil es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios gestionar sus eventos de manera eficiente. La aplicación cuenta con una interfaz moderna, sistema de calendario interactivo y conexión a API real para persistencia de datos.

### Características Principales:
-📅**Lista de Eventos: Visualiza todos tus eventos próximos organizados
-📝 **Agregar Eventos: Crea nuevos eventos con título, descripción, fecha y hora
-🔍 **Detalles Completos: Vista detallada de cada evento con opciones de edición y eliminación
-📆 **Vista de Calendario**: Calendario interactivo con eventos marcados por fecha
-🔄 **Sincronización API**: Conexión a API real con persistencia de datos en la nube
-🎨 **Interfaz Moderna**: Diseño limpio con esquema de colores azul
-🧭 **Navegación Intuitiva**: Tabs en la parte inferior para navegación rápida

### Funcionalidades Implementadas:
- Sistema completo CRUD (Crear, Leer, Actualizar, Eliminar) de eventos
-Integración con API REST real (JSONPlaceholder)
-Selector de fecha y hora nativo con DateTimePicker
-Calendario interactivo con react-native-calendars
-Sistema de navegación con tabs y stack
-Pull to refresh para actualizar datos
-Estados de carga y manejo de errores
-Confirmaciones para acciones destructivas
-Diseño responsivo y optimizado

## 3. Tecnologías y Versiones Utilizadas

### Stack Tecnológico:
-**React Native**: 0.81.4
-**React**: 19.1.0
-**Expo**: ~54.0.12
-**React Navigation Native**: v7.x
**React Navigation Native Stack**: ^7.1.17
**React Navigation Bottom Tabs**: ^7.x
**React Native Screens**: ~4.16.0
**React Native Safe Area Context**: ~5.6.0
**React Native Calendars**: Latest
**@react-native-community/datetimepicker**: Latest
### Herramientas de Desarrollo Requeridas:

- **Node.js:** v18.17.0 o superior
  ```bash
  node --version
  ```
- **NPM:** 9.0.0+ o Yarn v1.22.19+
  ```bash
  npm --version
  # o
  yarn --version
  ```
- **Expo CLI:** v6.3.0+
  ```bash
  npx expo --version
  ```
- **Android Studio:** v2022.3+ con Android SDK 33+ **o** Expo Go app en dispositivo físico
  ```bash
  # Verificar Android SDK
  adb --version
  ```

### Verificación de Entorno:
```bash
npx expo doctor
```

## 4. Estructura del Proyecto

### Organización de Archivos:
```
agenda/
├── App.js
├── app.json
├── package.json
├── babel.config.js
└── src/
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── AddEventScreen.js
    │   ├── EventDetailScreen.js
    │   └── CalendarScreen.js
    └── services/
        └── api.js
```

### Arquitectura de la Aplicación:
-**App.js**: Componente raíz
-**AppNavigator.js**: Stack y Tab Navigator
-**api.js**: Servicio de API REST
-**HomeScreen.js**: Lista de eventos
-**AddEventScreen.js**: Formulario de eventos
-**EventDetailScreen.js**: Detalles y acciones
-**CalendarScreen.js**: Calendario interactivo

## 5. Instalación y Configuración

### Instalación de Dependencias:
```bash
# Clonar el repositorio
git clone https://github.com/darioalonzocharco-a11y/AGENDA
cd movies-explorer-app

# Instalar dependencias
npm install
```

### Dependencias del Proyecto:

npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
yarn add react-native-calendars
npx expo install @react-native-community/datetimepickersarrollo móvil multiplataforma 

### Verificar instalación:
```bash
npm list --depth=0
```

## 6. Ejecución de la Aplicación

### Scripts Disponibles:
```bash
# Iniciar servidor de desarrollo
npm start
# o
npx expo start

# Ejecutar en Android (emulador/dispositivo)
npm run android
# o
npx expo start --android

# Ejecutar en iOS (solo macOS)
npm run ios
# o  
npx expo start --ios

# Ejecutar en web
npm run web
# o
npx expo start --web
```

### Primera Ejecución:
1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```

3. **Conectar dispositivo:**
   - **Android:** Usar Expo Go o emulador
   - **iOS:** Usar Expo Go o simulador
   - **Web:** Se abrirá automáticamente en el navegador

### Notas de Entorno:
- **Emulador Android:** Debe estar iniciado antes de ejecutar `npm run android`
- **Dispositivo físico:** Usar Expo Go y escanear QR code
- **Túnel para redes restrictivas:** `npx expo start --tunnel`

## 7. Funcionalidades de la Aplicación

### Pantalla Principal (AgendaScreen):
- **LOS EVENTOS AGENDADOS**: Muestra Algunos ejemplos , pero puedes agregar el evento que tengas.
- **Información Básica**: Eventos,la hora, la fecha y año.
- **Navegación**: Agregar o borrar  evento o modificar.
- **Diseño**: Interfaz con tema oscuro y tarjetas estilizadas

![Pantalla1](screenshots/pantalla1.jpg)

### Pantalla de Detalles (AgendaDetailScreen):
- **Calendario**: Año , mes y dia  
- **Hora local**: te muestra para seleccionar a que hora tienes ese pendiente
- **Botones de agregar y borrar**: son los las funciones que vienen por defecto.

![Pantalla2](screenshots/pantalla3.jpg)

### Características Técnicas:
- **Navegación Stack**: Transiciones suaves entre pantallas
- **Diseño Responsivo**: Optimizado para diferentes tamaños de pantalla
- **Tema Oscuro**: Interfaz moderna con colores oscuros
- **Componentes Modulares**: Código organizado y reutilizable

## 8. Desarrollo y Extensión

### Próximas Funcionalidades Sugeridas:
- **Integración con API**: Conectar con TMDB o similar para datos reales
- **visualmente mas decorada**: para que llame mas la atencion al publico 
- **editar un evento ya hecho**: Para mas facil el procedimiento

### Estructura para Nuevas Pantallas:
```
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Nueva Pantalla</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
```

## 9. Troubleshooting

### Problemas Comunes:
| Problema | Solución |
|----------|----------|
| **Error de instalación** | `npm install --legacy-peer-deps` |
| **Metro cache corrupto** | `npx expo start --clear` |
| **Puerto ocupado** | `npx expo start --port 8082` |
| **Dependencias desactualizadas** | `npx expo doctor` |

### Comandos Útiles:
```bash
# Verificar entorno
npx expo doctor

# Limpiar cache
npx expo start --clear

# Reinstalar dependencias
rm -rf node_modules package-lock.json && npm install
```

## 10. Instalacion de APK

npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview


## 11. Recursos y Documentación

-Documentación de Expo
-React Navigation
-React Native Docs
-React Native Calendars
-DateTimePicker

## 12. Aplicacion ya funcionando

---

**Desarrollado por:** Dario Alonzo Charco
**Última actualización:** 26 de noviembre 2025  
**Versión:** 1.1.0