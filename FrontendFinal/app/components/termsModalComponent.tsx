import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { colors } from '@/const/color';

interface Props {
  visible: boolean;
  onClose?: () => void;
  onAccept?: () => void;
  aceptaTerminos: boolean;
  setAceptaTerminos: (val: boolean) => void;
}

export default function TermsModalComponent({
  visible,
  onClose,
  onAccept,
  aceptaTerminos,
  setAceptaTerminos,
  
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Términos y Condiciones</Text>

          <ScrollView style={styles.scroll}>
            <Text style={styles.sectionTitle}>Términos y Condiciones de Uso</Text>
            <Text style={styles.paragraph}>
              Su acceso y uso de nuestra aplicación están sujetos a las siguientes condiciones. Al registrarse, usted acepta cumplir con estos términos.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>1. Uso de la Aplicación: </Text>
              SCZ-GO proporciona información sobre atracciones turísticas e información local. No garantizamos la exactitud o la disponibilidad continua de este contenido.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>2. Responsabilidades del Usuario: </Text>
              Usted se compromete a usar la aplicación de acuerdo con las leyes locales y no realizará actividades que interfieran con su funcionamiento.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>3. Privacidad: </Text>
              Podemos recopilar y usar su información de acuerdo con nuestra Política de Privacidad.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>4. Modificaciones: </Text>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Su uso continuado constituye su aceptación de dichos cambios.
            </Text>
          </ScrollView>

          <View style={styles.switchRow}>
            <Switch
              value={aceptaTerminos}
              onValueChange={setAceptaTerminos}
              thumbColor={aceptaTerminos ? "#fff" : "#ccc"}
              trackColor={{ false: '#ccc', true: '#2E7D32' }}
            />
            <Text style={styles.switchLabel}>Acepto los Términos y Condiciones</Text>
          </View>

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonesCancel} onPress={onClose}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonesAccept} onPress={onAccept}>
                <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  scroll: {
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 16,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  botonesCancel: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botonesAccept: {
    flex: 1,
    backgroundColor: colors.verdeOscuro,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
