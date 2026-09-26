// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types';
import PantallaLogin from './src/screens/PantallaLogin';
import PantallaRegistro from './src/screens/PantallaRegistro';
import ListarProductos from './src/screens/ListarProductos';
import PaginaDetalle from './src/screens/PaginaDetalle';
import PaginaAgregar from './src/screens/PaginaAgregar';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={PantallaLogin} />
        <Stack.Screen name="Registro" component={PantallaRegistro} />
        <Stack.Screen name="ListarProductos" component={ListarProductos} />
        <Stack.Screen
          name="PaginaDetalle"
          component={PaginaDetalle}
          options={{ headerShown: true, title: 'Detalle de Producto' }}
        />
        <Stack.Screen
          name="PaginaAgregar"
          component={PaginaAgregar}
          options={{ headerShown: true, title: 'Nuevo Producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
