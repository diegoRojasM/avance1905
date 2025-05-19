import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../../api/axios';
import ModoEncabezado from '../../components/ModoEncabezado';
import BannerMonumentos from '../../components/BannerMonumentos';
import { Monumento } from '../../../types/Monumento';
import { obtenerIconoPorCategoria } from '../../../utils/iconosPorCategoria';
import InfoIcon from '../../components/infoComponent';
import * as Network from 'expo-network';
import ConexionModalComponent from '../../components/conexionModalComponent';


export default function FreeTour() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [monumentos, setMonumentos] = useState<Monumento[]>([]);
  const [cercanos, setCercanos] = useState<Monumento[]>([]);
  const [loading, setLoading] = useState(true);
  const [sinConexion, setSinConexion] = useState(false);
  //verfica la conexion a internet
  useEffect(() => {
    (async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      if (!isConnected) {
        setSinConexion(true);
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  const reintentarConexion = () => {
    setSinConexion(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const fetchMonumentos = async () => {
      try {
        const response = await api.get('/monumentos');
        setMonumentos(response.data);
      } catch (error) {
        console.error('Error al cargar monumentos:', error);
      }
    };

    fetchMonumentos();
  }, []);

  useEffect(() => {
    if (!location) return;

    const nuevosCercanos = monumentos
      .map((monumento) => {
        const distancia = calcularDistancia(
          location.coords.latitude,
          location.coords.longitude,
          monumento.coordenadas.latitud,
          monumento.coordenadas.longitud
        );
        return { ...monumento, distancia };
      })
      .filter((m) => m.distancia <= m.radioGeofence);

    setCercanos(nuevosCercanos);
  }, [location, monumentos]);

  const calcularDistancia = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3;
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
          <ModoEncabezado
            icono={require('../../img/TuristaLibre.png')}
            titulo="Turista Libre"
            infoIcon={
              <InfoIcon
                titulo="Modo Turista Libre"
                descripcion="Este modo está pensado para los exploradores espontáneos. Podés moverte libremente por la ciudad y la aplicación te mostrará un mapa con tu ubicación actual y los monumentos más cercanos a tu alrededor. Al ingresar dentro del área de alguno de estos lugares, recibirás una notificación con su nombre y detalles importantes. No necesitás seguir un orden específico ni una ruta predefinida: vos decidís a dónde ir y cuándo detenerte. Ideal para quienes quieren descubrir Santa Cruz a su propio ritmo."
              />
            }
          />

      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {monumentos.map((monumento) => (
          <React.Fragment key={monumento._id}>
            <Marker
              coordinate={{
                latitude: monumento.coordenadas.latitud,
                longitude: monumento.coordenadas.longitud,
              }}
              title={monumento.nombre}
              description={monumento.categoria}
              image={obtenerIconoPorCategoria(monumento.categoria)} // ✅ NUEVO
            />
            <Circle
              center={{
                latitude: monumento.coordenadas.latitud,
                longitude: monumento.coordenadas.longitud,
              }}
              radius={monumento.radioGeofence}
              strokeColor="rgba(46, 125, 50, 0.8)"
              fillColor="rgba(46, 125, 50, 0.2)"
            />
          </React.Fragment>
        ))}
      </MapView>

      {cercanos.length > 0 && <BannerMonumentos cercanos={cercanos} />}
      <ConexionModalComponent
        visible={sinConexion}
        modo="Turista Libre"
        onRetry={reintentarConexion}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  encabezado: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 999,
  },
  // row: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // }
});
