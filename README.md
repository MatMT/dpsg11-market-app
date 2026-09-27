# Market App — Aplicación Móvil con Expo, React Native y TypeScript

**Diseño y Programación de Software Multiplataforma (DPS104)**  
**Guía 11 — App Móvil con API REST: Login, Registro y CRUD**  
Universidad Don Bosco · Ciclo II-2026

---

## 📱 Descripción

Aplicación móvil desarrollada con **Expo SDK 57**, **React Native** y **TypeScript**, que consume una **API REST en Node.js/Express** desplegada en **Render.com** conectada a **TiDB Cloud MySQL**.

### ✨ Características Implementadas
- **Navegación Tipada:** Stack navigation estricto con `NativeStackScreenProps` y `RootStackParamList`.
- **Autenticación Completa:**
  - Login con validación y manejo de estados de carga (`ActivityIndicator`).
  - Registro con validación local (Regex para correo, longitud mínima de clave y confirmación idéntica).
- **CRUD de Productos:**
  - **Listado:** Tarjetas en `FlatList<Producto>` con badges de stock dinámicos y Pull-to-Refresh.
  - **Crear Producto:** Formulario con validación regex para precios decimales y cantidades enteras.
  - **Detalle y Edición:** Carga por ID, modificación de todos los campos (incluyendo **URL de fotografía**) mediante `PUT`.
  - **Eliminación:** Borrado con diálogo nativo de confirmación destructiva (`Alert.alert`).
- **Cierre de Sesión:** Botón de salir con `navigation.reset()` para limpiar el stack de rutas.

---

## 🌐 Conexión Backend

La app se conecta automáticamente a la API en producción:
- **URL Base:** `https://apimarket-gunw.onrender.com`
- **Repositorio Backend:** [https://github.com/MatMT/apimarket](https://github.com/MatMT/apimarket)
- **Documentación de la Arquitectura Alternativa:** [Ver en el repositorio del backend](https://github.com/MatMT/apimarket/blob/main/DESPLIEGUE_ALTERNATIVA_RENDER_TIDB.md)

---

## 🚀 Cómo Ejecutar la App

1. Clonar e instalar dependencias:
   ```bash
   git clone https://github.com/MatMT/dpsg11-market-app.git
   cd dpsg11-market-app
   npm install
   ```

2. Iniciar el servidor de desarrollo Expo:
   ```bash
   npx expo start
   ```

3. Abrir en tu dispositivo:
   - Escanear el código QR con la app **Expo Go** (iOS / Android).
   - Presionar `i` para simulador de iOS o `a` para emulador de Android.
