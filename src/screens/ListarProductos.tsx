// src/screens/ListarProductos.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Producto } from '../types';
import { apiFetch } from '../services/api';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ListarProductos'>;

const ListarProductos = ({ navigation }: Props): React.JSX.Element => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [refrescando, setRefrescando] = useState<boolean>(false);

  const cargarProductos = useCallback(async (): Promise<void> => {
    try {
      const data = await apiFetch<Producto[]>('/productos');
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }, []);

  // Recarga cada vez que la pantalla recibe foco (ej. al volver de "Agregar" o "Detalle")
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarProductos);
    return unsubscribe;
  }, [navigation, cargarProductos]);

  const cerrarSesion = (): void => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Producto }): React.JSX.Element => {
    const precio = Number(item.precio_venta) || 0;
    const stock = Number(item.cantidad) || 0;

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PaginaDetalle', { id: item.id })}>
        <Image style={styles.imagen} source={{ uri: item.fotografia }} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.precio}>${precio.toFixed(2)}</Text>
          <View style={[styles.badge, { backgroundColor: stock > 0 ? '#edfaf3' : '#fdf0ee' }]}>
            <Text style={{ color: stock > 0 ? colors.success : colors.danger, fontSize: 11, fontWeight: '700' }}>
              {stock > 0 ? `${stock} en stock` : 'Agotado'}
            </Text>
          </View>
        </View>
        <FontAwesome name="chevron-right" size={16} color={colors.textMuted} />
      </TouchableOpacity>
    );
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Catálogo de Productos</Text>
          <Text style={styles.total}>{productos.length} producto(s)</Text>
        </View>
        <TouchableOpacity style={styles.btnLogout} onPress={cerrarSesion}>
          <FontAwesome name="sign-out" size={18} color={colors.danger} />
          <Text style={styles.btnLogoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <FlatList<Producto>
        data={productos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={() => {
              setRefrescando(true);
              cargarProductos();
            }}
          />
        }
        contentContainerStyle={{ paddingBottom: 90 }}
        ListEmptyComponent={
          <View style={styles.centrado}>
            <Text style={{ color: colors.textMuted, marginTop: 40 }}>No hay productos registrados</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('PaginaAgregar')}>
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 14, paddingTop: 52 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.primaryDark },
  total: { fontSize: 13, color: colors.textMuted, marginTop: 2, fontWeight: '600' },
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fdeeed',
  },
  btnLogoutText: { color: colors.danger, fontWeight: '700', fontSize: 14 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    gap: 12,
    shadowColor: '#003f7f',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  imagen: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f0f0f0' },
  info: { flex: 1, gap: 3 },
  nombre: { fontSize: 15, fontWeight: '700', color: colors.text },
  precio: { fontSize: 15, fontWeight: '800', color: colors.primary },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default ListarProductos;
