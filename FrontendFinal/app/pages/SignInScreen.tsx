// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { colors } from '@/const/color';
// import { stylesGlobal } from '@/const/styles';
// import LogoComponent from '../components/logoComponent';
// import BackComponent from '../components/backComponent';
// import ButtonComponent from '../components/buttonComponent';
// import { MaterialIcons } from '@expo/vector-icons';
// import React from "react";

// export default function LoginScreen() {
//   return (
//     <View style={stylesGlobal.container}>
//       <BackComponent />
//       <LogoComponent />
//       <View style={stylesGlobal.form}>
//         <Text style={stl.titleForm}>Iniciar sesión</Text>

//         {/* Input de correo */}
//         <View style={stl.inputGroup}>
//           <TextInput
//             placeholder="Correo electrónico"
//             style={stl.input}
//             placeholderTextColor={colors.textoSecundario}
//             keyboardType="email-address"
//           />
//           <MaterialIcons name="email" size={22} color={colors.textoSecundario} style={{marginRight : 10}} />
//         </View>

//         {/* Input de contraseña */}
//         <View style={stl.inputGroup}>
//           <TextInput
//             placeholder="Contraseña"
//             secureTextEntry
//             style={stl.input}
//             placeholderTextColor={colors.textoSecundario}
//           />
//           <MaterialIcons name="lock" size={22} color={colors.textoSecundario} style={{marginRight : 10}} />
//         </View>

//         <ButtonComponent label="Ingresar" route="/pages/tab/" />
//       </View>
//     </View>
//   );
// }

// const stl = StyleSheet.create({
//   titleForm: {
//     fontSize: 24,
//     fontFamily: 'InterBold',
//   },
//   inputGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 10,    
//     justifyContent: 'space-between',
//   },
//   input: {
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     fontFamily: 'Inter',
//     color: colors.textoSecundario,
//     fontSize: 18,
//   },
// });


import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { colors } from '@/const/color';
import { stylesGlobal } from '@/const/styles';
import LogoComponent from '../components/logoComponent';
import BackComponent from '../components/backComponent';
import ButtonComponent from '../components/buttonComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { iniciarSesion } from '../../api/auth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 nuevo import
import * as Network from 'expo-network';
import ConexionModalComponent from '../components/conexionModalComponent';
import { Feather } from '@expo/vector-icons';


export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [verContrasena, setVerContrasena] = useState(false);
  const [sinConexion, setSinConexion] = useState(false);

  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    let esValido = true;

    if (!correo.trim()) {
      setErrorCorreo('Ingrese su correo');
      esValido = false;
    }

    if (!contrasena) {
      setErrorContrasena('Ingrese su contraseña');
      esValido = false;
    }

    if (!esValido) return;

    try {
      const res = await iniciarSesion({ correo, contrasena });

      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('nombreUsuario', res.nombre);

      const token = await AsyncStorage.getItem('token');
      console.log("TOKEN GUARDADO:", token);

      router.push('/pages/tab');
    } catch (error:any) {
      // const errorMessage = (error as any)?.response?.data?.mensaje || "No se pudo iniciar sesión";
      // Alert.alert("Error", errorMessage);
      console.error("Error en el login:", error);
      if (!error.response) {
        setSinConexion(true); // muestra el modal personalizado
        return;
      }
      Alert.alert("Error", error.response?.data?.mensaje || "No se pudo iniciar sesión");
    }
  };

  return (
    <View style={stylesGlobal.container}>
      <BackComponent />
      <LogoComponent />
      <View style={stylesGlobal.form}>
        <Text style={stl.titleForm}>Iniciar sesión</Text>

        {/* Input de correo */}
        <View style={stl.inputGroup}>
          <TextInput
            placeholder="Correo electrónico"
            style={stl.input}
            placeholderTextColor={colors.textoSecundario}
            keyboardType="email-address"
            onChangeText={setCorreo}
          />
          <MaterialIcons name="email" size={22} color={colors.textoSecundario} style={{ marginRight: 10 }} />
        </View>

        {/* Input de contraseña */}
        <View style={stl.inputGroup}>
        <TextInput
            placeholder="Contraseña"
            secureTextEntry={!verContrasena}
            style={stl.input}
            placeholderTextColor={colors.textoSecundario}
            onChangeText={setContrasena}
            value={contrasena}
          />
          <TouchableOpacity onPress={() => setVerContrasena(!verContrasena)}>
            <Feather
              name={verContrasena ? 'eye-off' : 'eye'}
              size={22}
              color={colors.textoSecundario}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        {errorContrasena ? <Text style={stl.error}>{errorContrasena}</Text> : null}
        {errorGeneral ? <Text style={stl.error}>{errorGeneral}</Text> : null}

        <ButtonComponent label="Ingresar" onPress={handleLogin} />
        <ConexionModalComponent
          visible={sinConexion}
          modo="Inicio sesion"
          onRetry={() => setSinConexion(false)}
        />
      </View>
    </View>
  );
}

const stl = StyleSheet.create({
  titleForm: {
    fontSize: 24,
    fontFamily: 'InterBold',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontFamily: 'Inter',
    color: colors.textoSecundario,
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  div: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: colors.textoSecundario,
  },
  link: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: colors.verdeClaro,
  },
});
