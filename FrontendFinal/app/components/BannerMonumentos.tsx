import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Monumento } from '../../types/Monumento';

interface BannerMonumentosProps {
  cercanos: Monumento[];
}

export default function BannerMonumentos({ cercanos }: BannerMonumentosProps) {
  const [expandido, setExpandido] = useState(false);

  const handleToggle = () => setExpandido(!expandido);

  return (
    <View style={styles.banner}>
      <View style={styles.headerRow}>
        <Text style={styles.titulo}>{cercanos.length} monumentos cerca</Text>
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.verMas}>{expandido ? 'Ver menos' : 'Ver más'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Explora monumentos cercanos</Text>

      {expandido && (
        <FlatList
          data={cercanos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagenes?.[0] ?? 'https://via.placeholder.com/60' }} style={styles.img} />
              <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.categoria}>{item.categoria}</Text>
                <Text style={styles.distancia}>A {Math.round(item.distancia ?? 0)} M</Text>
                <TouchableOpacity style={styles.btnVisitar}>
                  <Text style={styles.btnText}>visitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 4,
    zIndex: 999,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  verMas: {
    color: '#367C28',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#367C28',
    borderRadius: 9,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginRight: 10
    },
  subtitulo: {
    fontFamily: 'Inter',
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 30,
    marginBottom: 5,
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
  },
  categoria: {
    color: '#666',
    fontSize: 13,
  },
  distancia: {
    color: '#4CAF50',
    marginTop: 2,
    fontSize: 13,
  },
  btnVisitar: {
    marginTop: 6,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  separator: {
    height: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    marginVertical: 5,
    marginBottom: 25
  },
});
