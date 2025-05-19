import { View, Text, StyleSheet } from 'react-native';
import { stylesGlobal } from '@/const/styles';
import React from 'react';
import ModoEncabezado from '../../components/ModoEncabezado'; 
import InfoIcon from '@/app/components/infoComponent';

export default function HistoryMode() {
    return(
        <View style={styles.encabezado}>
        <ModoEncabezado
          icono={require('../../img/HistoriaIcon.png')} // ← agrega tu imagen
          titulo="Historia"
          infoIcon={
            <InfoIcon
              titulo="Modo Historia"
              descripcion="En este modo, podrás acceder a una línea de tiempo interactiva que recorre los momentos clave de la historia cruceña.

Cada evento estará vinculado a un lugar real que podés visitar, con textos explicativos, fechas relevantes y contexto cultural. Esta función es perfecta para estudiantes, turistas curiosos o cualquier persona interesada en conocer el pasado que dio forma a nuestra ciudad."
            />
          }
        />
      </View>
    )
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
});
