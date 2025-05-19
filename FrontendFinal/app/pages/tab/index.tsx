import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal} from 'react-native';
import { stylesGlobal } from '@/const/styles';
import { useRouter } from 'expo-router';
import { colors } from '@/const/color';
import CardModeComponent from '../../components/cardModeComponent';
import { useState } from 'react';
import ButtonComponent from '@/app/components/buttonComponent';
import React from 'react';


interface Lugares{
    title : string,
    distance : number,
    img : any,
    tiempo : number,
    descripcion : string,
    tipo : string,
}

export default function TabIndex() {
    const router = useRouter();

    const lugar: Lugares = {
        title: 'Catedral',
        distance: 1.5,
        img: require('../../img/lugar.png'),
        tiempo : 10,
        descripcion: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. ut labore et.',
        tipo : 'Monumento Religioso'
    }

    const lugares : Lugares[] = Array.from({ length: 10 }, () => lugar);

    const [modalVisible, setModalVisible] = useState(false);
    const [lugarSeleccionado, setLugarSeleccionado] = useState<Lugares | null>(null);

    const abrirModal = (lugar: Lugares) => {
        setLugarSeleccionado(lugar);
        setModalVisible(true);
    }

    const cerrarModal = () => {
        setModalVisible(false);
        setLugarSeleccionado(null);
    }

    return(
        <View style={stylesGlobal.container}>
            <View style={stl.div}>
                <Text style={stylesGlobal.h2}>¡Hola Usuario!</Text>
                <Text style={stl.p}>¿Listo para descubrir Santa Cruz?</Text>
                <CardModeComponent
                    title='Turista libre'
                    subtitle='Explora monumentos cercanos'
                    route='/pages/tab/FreeTour'
                    img={require('../../img/TuristaLibre.png')}

                />
                <CardModeComponent 
                    title='Historia'
                    subtitle='Descubre eventos históricos'
                    route='/pages/tab/HistoryMode'
                    img={require('../../img/HistoriaIcon.png')}

                />
                <CardModeComponent 
                    title='Turismo Guiado'
                    subtitle='Obten rutas personalizadas'
                    route='/pages/tab/HistoryMode'
                    img={require('../../img/GuiadoIcon.png')}
                />

                {/* carrucel de lugares */}

                <View style={stl.divCard}>
                    <Text style={stylesGlobal.h2}>Lugares cerca de ti</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {lugares.map((lug, index) => (
                            <View key={index} style={stl.cardPlace}>
                                <TouchableOpacity onPress={()=> abrirModal(lug)}>
                                    <Image source={lug.img}/>
                                </TouchableOpacity>
                                <View>
                                    <Text style={stl.title}>{lug.title}</Text>
                                    <Text style={stl.distance}>{lug.distance} Km</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* modal */}                        

                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={cerrarModal}
                >
                    <View style={stl.modalOverlay}>
                        <View style={stl.divModal}>

                            {/* header */}
                            <View style={stl.headerModal}>
                                <View style={stl.navModal}>
                                    <Image 
                                        source={require('../../img/catedral.png')} 
                                        style={{ height: 36}}
                                    />

                                    <View style={stl.container}>
                                        <View style={stl.section}>
                                            <Text style={stl.titleModal}>{lugar.title}</Text>
                                            <TouchableOpacity onPress={cerrarModal}>
                                                <Image 
                                                    source={require('../../img/cancel.png')} 
                                                    style={{ height: 35}}
                                                />
                                            </TouchableOpacity>
                                            
                                        </View>
                                        <Text style={stl.dateModal}>{lugar.distance} km - {lugar.tiempo} min</Text>
                                    </View>
                                </View>

                                <Text style={stl.descripcionModal}>{lugar.descripcion}</Text>
                            </View>

                            <Image source={lugar.img} style={{width: '100%'}} />
                            <View style={stl.button}>
                                <ButtonComponent label='Visitar' route='/pages/tab/FreeTour' />
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    )
}

const stl = StyleSheet.create({
    div :{
        width : '100%',
    },
    p :{
        fontFamily :'Inter',
        fontSize : 16,
        color : colors.textoSecundario,
        marginBottom : 15,
    },
    divCard: {
        gap : 20,
    },
    cardPlace: {
        // borderWidth : 1,
        borderRadius : 5,
        marginRight : 15,
        gap : 15,
    },
    title: {
        fontSize : 16,
        fontFamily : 'InterBold',
        color : colors.textoPrincipal,
    },
    distance: {
        fontSize : 14,
        fontFamily : 'InterBold',
        color : colors.verdeOscuro,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    divModal: {
        width: '85%',
        backgroundColor: colors.blanco,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
        gap: 10,
    },
    headerModal: {
        gap: 5
    },
    navModal: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    container:{
        width: '87%',
    },
    titleModal: {
        fontSize: 18,
        fontFamily: 'InterBold',
        color: colors.textoPrincipal,
    },
    dateModal:{
        fontSize: 14,
        color: colors.verdeOscuro,
        fontFamily: 'InterBold',
    },
    descripcionModal: {
        fontSize: 16,
        color: colors.textoSecundario,
        fontFamily: 'Inter',
    },
    button:{
        width: '100%',
    }
})  