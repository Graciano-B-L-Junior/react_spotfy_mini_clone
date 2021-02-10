import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Player(props) {

    async function pausaMusica() {
        let audioPausa = props.audio;
        let pausa = false;
        try {
            if (props.musicaPause == false) {
                await audioPausa.pauseAsync();
                pausa = true;
            } else {
                await audioPausa.playAsync();
                pausa = false;
            }
        } catch (erro) {

        }

        props.setMusicaPause(pausa);
        props.setAudio(audioPausa);

    }
    async function musicaAnterior(){
        let index = props.audioIndex-1;
        let novaMusica = props.musicas;
        if(index < 0){
            index =novaMusica.length-1;
        }
        let arquivoMusica;
        novaMusica = props.musicas.map(function(val,indice){
            if(indice==index){
                val.playing=true
                arquivoMusica = val.file
            }else{
                val.playing=false;
            }
            return val;
        })

        let novoSom = props.audio;
        try{
            await novoSom.unloadAsync()
            await novoSom.loadAsync(arquivoMusica)
            await novoSom.playAsync()
        }catch(erro){

        }
        props.setAudioIndex(index)
        props.setAudio(novoSom)
        props.setarMusicas(novaMusica)
    }

    async function proximaMusica() {
        let index = props.audioIndex+1;
        let novaMusica = props.musicas;
        if(index > novaMusica.length-1){
            index =0;
        }
        let arquivoMusica;
        novaMusica = props.musicas.map(function(val,indice){
            if(indice==index){
                val.playing=true
                arquivoMusica = val.file
            }else{
                val.playing=false;
            }
            return val;
        })

        let novoSom = props.audio;
        try{
            await novoSom.unloadAsync()
            await novoSom.loadAsync(arquivoMusica)
            await novoSom.playAsync()
        }catch(erro){

        }
        props.setAudioIndex(index)
        props.setAudio(novoSom)
        props.setarMusicas(novaMusica)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TouchableOpacity onPress={()=>musicaAnterior()} style={{ marginRight: 15, marginLeft: 15 }}>
                <AntDesign name='banckward' size={50} color='white' />
            </TouchableOpacity>
            {
                (props.musicaPause) ?
                    <TouchableOpacity onPress={() => pausaMusica()} style={{ marginRight: 15, marginLeft: 15 }}>
                        <AntDesign name='playcircleo' size={50} color='#1DB954' />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => pausaMusica()} style={{ marginRight: 15, marginLeft: 15 }}>
                        <AntDesign name='pausecircleo' size={50} color='#1DB954' />
                    </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => proximaMusica()} style={{ marginRight: 15, marginLeft: 15 }}>
                <AntDesign name='forward' size={50} color='white' />
            </TouchableOpacity>
        </View>
    )
}