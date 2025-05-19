import { View, Text, StyleSheet } from 'react-native';
import { stylesGlobal } from '@/const/styles';
import React from 'react';
import ModoEncabezado from '../../components/ModoEncabezado'; 
import InfoIcon from '@/app/components/infoComponent';

export default function GuiadedTour() {
    return(
        <View style={styles.encabezado}>
        <ModoEncabezado
          icono={require('../../img/GuiadoIcon.png')} // ← agrega tu imagen
          titulo="Turista guiado"
          infoIcon={
            <InfoIcon
              titulo="Modo Turista Guiado"
              descripcion="¿Tenés poco tiempo o querés una experiencia más estructurada? Este modo te permite elegir tus intereses principales (como cultura, gastronomía o historia) y cuánto tiempo tenés disponible para tu visita.

Con base en tus elecciones, la app generará una ruta recomendada optimizada que te guiará paso a paso por los lugares que más se ajustan a tus gustos. Es como tener un guía turístico personalizado en tu bolsillo."
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
