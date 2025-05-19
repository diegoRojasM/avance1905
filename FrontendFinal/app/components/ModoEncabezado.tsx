import { colors } from '@/const/color';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ModoEncabezadoProps {
  icono: any;
  titulo: string;
  infoIcon?: React.ReactNode;
}

const ModoEncabezado: React.FC<ModoEncabezadoProps> = ({ icono, titulo, infoIcon }) => {
  return (
    <View style={styles.banner}>
      <Image source={icono} style={styles.icono} />
      <View style={styles.textos}>
        <Text style={styles.modo}>Modo</Text>

        <View style={styles.tituloRow}>
          <Text style={styles.titulo}>{titulo}</Text>
          {infoIcon && <View style={styles.info}>{infoIcon}</View>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 0,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    paddingRight: 10,
  },
  icono: {
    width: 55,
    height: 55,
    marginLeft: 11,
    resizeMode: 'contain',
  },
  textos: {
    flex: 1,
    marginLeft: 8,
  },
  modo: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 11,
    letterSpacing: -0.02 * 11,
    color: '#000000',
  },
  tituloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titulo: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: -0.02 * 18,
    color: '#367C28',
    flexShrink: 1,
  },
  info: {
    marginLeft: 8,
  },
});

export default ModoEncabezado;