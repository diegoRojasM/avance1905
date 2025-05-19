
// // app/pages/tab/GuidedTour.tsx
// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import * as Location from 'expo-location';
// import api from '@/api/axios'; // tu instancia de axios
// import { Monumento } from '@/types/Monumento';
// import { obtenerIconoPorCategoria } from '@/utils/iconosPorCategoria';
// import ModoEncabezado from '@/app/components/ModoEncabezado';
// import InfoIcon from '@/app/components/infoComponent';

// export default function GuidedTour() {
//   const [location, setLocation] = useState<Location.LocationObject | null>(null);
//   const [monumentos, setMonumentos] = useState<Monumento[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       // 1. Pedir permiso de ubicación
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permiso denegado', 'La app necesita acceder a tu ubicación.');
//         setLoading(false);
//         return;
//       }

//       // 2. Obtener ubicación actual
//       const current = await Location.getCurrentPositionAsync({});
//       setLocation(current);

//       // 3. Cargar monumentos
//       try {
//         const resp = await api.get<Monumento[]>('/monumentos');
//         setMonumentos(resp.data);
//       } catch (err) {
//         console.error('Error cargando monumentos:', err);
//         Alert.alert('Error', 'No se pudieron cargar los monumentos.');
//       }

//       setLoading(false);
//     })();
//   }, []);

//   if (loading || !location) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text style={{ marginTop: 8 }}>Cargando mapa...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Cabecera fija */}
//       <View style={styles.encabezado}>
//         <ModoEncabezado
//           icono={require('../../img/GuiadoIcon.png')}
//           titulo="Turista guiado"
//           infoIcon={
//             <InfoIcon
//               titulo="Modo Turista Guiado"
//               descripcion="¿Tenés poco tiempo o querés una experiencia más estructurada? Este modo te permite elegir tus intereses principales (como cultura, gastronomía o historia) y cuánto tiempo tenés disponible para tu visita.

// Con base en tus elecciones, la app generará una ruta recomendada optimizada que te guiará paso a paso por los lugares que más se ajustan a tus gustos. Es como tener un guía turístico personalizado en tu bolsillo."
//             />
//           }
//         />
//       </View>

//       {/* Mapa */}
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={StyleSheet.absoluteFillObject}
//         initialRegion={{
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}
//         showsUserLocation
//         showsMyLocationButton
//       >
//         {monumentos.map((m) => (
//           <Marker
//             key={m._id}
//             coordinate={{
//               latitude: m.coordenadas.latitud,
//               longitude: m.coordenadas.longitud,
//             }}
//             title={m.nombre}
//             description={m.categoria}
//             image={obtenerIconoPorCategoria(m.categoria)}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   encabezado: {
//     position: 'absolute',
//     top: 50,
//     left: 10,
//     right: 10,
//     zIndex: 999,
//   },
// });


// app/pages/tab/GuidedTour.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import api from '@/api/axios';
import { generarRuta } from '@/api/rutas'; // tu servicio de rutas
import { Monumento } from '@/types/Monumento';
import { obtenerIconoPorCategoria } from '@/utils/iconosPorCategoria';
import ModoEncabezado from '@/app/components/ModoEncabezado';
import InfoIcon from '@/app/components/infoComponent';
import { colors } from '@/const/color';

const INTERESES = [
  'Monumentos históricos',
  'Religiosos',
  'gastronomicos',
  'Lugares emblemáticos',
  'Museos',
  'Miradores o parques',
];

export default function GuidedTour() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [monumentos, setMonumentos] = useState<Monumento[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para la "ruta"
  const [formVisible, setFormVisible] = useState(true);
  const [tiempo, setTiempo] = useState('60');        // en minutos, como string para TextInput
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [ruta, setRuta] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'La app necesita acceso a tu ubicación.');
        setLoading(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      setLocation(pos);

      try {
        const resp = await api.get<Monumento[]>('/monumentos');
        setMonumentos(resp.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.verdeOscuro} />
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  const toggleInteres = (i: string) =>
    setSeleccionados((prev) =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );

  const handleGenerarRuta = async () => {
    if (!tiempo || seleccionados.length === 0) {
      Alert.alert('Datos incompletos', 'Define tiempo e intereses.');
      return;
    }
    try {
      const nueva = await generarRuta(
        parseInt(tiempo, 10),
        seleccionados,
        {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }
      );
      setRuta(nueva);
      console.log('Ruta generada:', nueva);
      Alert.alert('Ruta generada', 'Tu ruta ha sido generada con éxito.');
      setFormVisible(false);
      // luego vendrán Summary → Map → etc.
    } catch (err) {
      Alert.alert('Error', 'No se pudo generar la ruta.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.encabezado}>
        <ModoEncabezado
          icono={require('../../img/GuiadoIcon.png')}
          titulo="Turista guiado"
          infoIcon={
            <InfoIcon
              titulo="Modo Turista Guiado"
              descripcion="¿Tenés poco tiempo o querés una experiencia más estructurada? ..."
            />
          }
        />
      </View>

      {/* Mapa */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
      >
        {monumentos.map(m => (
          <Marker
            key={m._id}
            coordinate={{
              latitude: m.coordenadas.latitud,
              longitude: m.coordenadas.longitud,
            }}
            title={m.nombre}
            description={m.categoria}
            image={obtenerIconoPorCategoria(m.categoria)}
          />
        ))}
      </MapView>

      {/* Modal de formulario */}
      <Modal visible={formVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Generar Ruta</Text>
            <Text style={styles.label}>Tiempo disponible (min):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tiempo}
              onChangeText={setTiempo}
            />

            <Text style={styles.label}>Tus intereses:</Text>
            <ScrollView style={{ maxHeight: 120 }}>
              {INTERESES.map(i => {
                const marcado = seleccionados.includes(i);
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.checkboxRow}
                    onPress={() => toggleInteres(i)}
                  >
                    <View style={[styles.checkbox, marcado && styles.checkboxChecked]}>
                      {marcado && <Feather name="check" size={16} color="#fff" />}
                    </View>
                    <Text style={styles.checkboxLabel}>{i}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity style={styles.btn} onPress={handleGenerarRuta}>
              <Text style={styles.btnText}>Generar ruta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex:1, justifyContent:'center', alignItems:'center' },
  encabezado: {
    position:'absolute', top:50, left:10, right:10, zIndex:999
  },

  modalOverlay: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    padding:20,
  },
  modalBox: {
    backgroundColor:'#fff',
    borderRadius:12,
    padding:20,
    elevation:5,
  },
  modalTitle: {
    fontSize:20,
    fontFamily:'InterBold',
    marginBottom:10,
    textAlign:'center'
  },
  label: {
    fontSize:14,
    fontFamily:'Inter',
    marginTop:10
  },
  input: {
    borderWidth:1,
    borderColor:colors.grisClaro,
    borderRadius:6,
    padding:8,
    marginTop:4,
    fontSize:16
  },
  checkboxRow: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical:6
  },
  checkbox: {
    width:24, height:24,
    borderWidth:2,
    borderColor:colors.verdeOscuro,
    borderRadius:4,
    marginRight:10,
    justifyContent:'center',
    alignItems:'center'
  },
  checkboxChecked: {
    backgroundColor:colors.verdeOscuro,
    borderColor:colors.verdeOscuro
  },
  checkboxLabel: {
    fontSize:16,
    fontFamily:'Inter'
  },
  btn: {
    marginTop:20,
    backgroundColor:colors.verdeOscuro,
    paddingVertical:12,
    borderRadius:8
  },
  btnText: {
    color:'#fff',
    textAlign:'center',
    fontSize:16,
    fontFamily:'InterBold'
  }
});
