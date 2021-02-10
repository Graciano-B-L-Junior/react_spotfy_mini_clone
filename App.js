import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Player from './Player';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [musicas, setarMusicas] = useState([
    {
      name: 'Myself',
      artista: 'Post Malone',
      file: require('./assets/musicas/myslef.mp3'),
      playing: true
    },
    {
      name: 'Staring At The Sun (Audio) ft. SZA',
      artista: 'Post Malone',
      file: require('./assets/musicas/StaringAtTheSun.mp3'),
      playing: false
    },
    {
      name: 'Congratulations ft. Quavo',
      artista: 'Post Malone',
      file: require('./assets/musicas/Congratulations.mp3'),
      playing: false
    },
  ])

  const [audio, setAudio] = useState(null)
  const [musicaPause, setMusicaPause] = useState(false)
  const [audioIndex, setAudioIndex] = useState(0)

  async function pausaMusica() {

    if (audio != null) {
      let audioPausa = audio;
      let pausa = false;
      try {
        if (musicaPause == false) {
          await audioPausa.pauseAsync();
          pausa = true;
        } else {
          await audioPausa.playAsync();
          pausa = false;
        }
      } catch (erro) {

      }
      setMusicaPause(pausa);
      setAudio(audioPausa);
    } else {
      let audioPausa = new Audio.Sound();
      let pausa = false;
      try {
        await audioPausa.loadAsync(require('./assets/musicas/myslef.mp3'))
        await audioPausa.playAsync();
        setMusicaPause(pausa);
        setAudio(audioPausa);
      } catch (erro) {

      }
    }
  }

  async function trocarMusica(indice) {
    let indexNovaMusica = audioIndex;
    let novasMusicas = musicas.map(function (val, index) {
      if (indice == index) {
        val.playing = true;
        indexNovaMusica = indice;
      } else {
        val.playing = false;
      }
      return val;
    })
    setarMusicas(novasMusicas);
    setMusicaPause(false);
    setAudioIndex(indexNovaMusica);

    if (audio != null) {
      let playAudio = audio;
      let arquivoMusica = novasMusicas[indice].file;

      try {
        await playAudio.unloadAsync();
        await playAudio.loadAsync(arquivoMusica);
        await playAudio.playAsync();
        setAudio(playAudio);
      } catch (erro) {

      }
    } else {
      let playAudio = new Audio.Sound();
      let arquivoMusica = novasMusicas[indice].file;

      try {
        await playAudio.loadAsync(arquivoMusica);
        await playAudio.playAsync();
        setAudio(playAudio);
      } catch (erro) {

      }
    }
  }



  return (
    <View style={styles.container}>
      {/* cabeçalho do aplicativo*/}
      <View style={styles.header}>

        <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}>Spotfy Mini Clone</Text>
      </View>
      {/* Lista de musicas*/}
      <View>
        <ScrollView>
          <View style={styles.tabelaMusica}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, width: '50%' }}>Musica</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, width: '50%' }}>Artista</Text>
          </View>
          {
            //adicionado musicas dinâmicamente
            musicas.map(function (val, index) {
              if (val.playing == true && musicaPause == false) {
                return (
                  <View style={styles.tabelaMusica}>
                    <TouchableOpacity onPress={() => pausaMusica()} style={styles.btnMusica}>
                      <AntDesign name='pausecircleo' size={25} style={{ paddingRight: 20, color: '#1DB954' }} />
                      <Text style={{ color: '#1DB954', fontSize: 16 }}>{val.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#1DB954', textAlign: 'center', fontSize: 16, width: '50%' }}>{val.artista}</Text>
                  </View>
                )
              } else if (val.playing == true && musicaPause == true) {
                return (
                  <View style={styles.tabelaMusica}>
                    <TouchableOpacity onPress={() => pausaMusica()} style={styles.btnMusica}>
                      <AntDesign name='playcircleo' size={25} style={{ paddingRight: 20, color: '#1DB954' }} />
                      <Text style={{ color: '#1DB954', fontSize: 16 }}>{val.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#1DB954', textAlign: 'center', fontSize: 16, width: '50%' }}>{val.artista}</Text>
                  </View>
                )
              } else {
                return (
                  <View style={styles.tabelaMusica}>
                    <TouchableOpacity onPress={() => trocarMusica(index)} style={styles.btnMusica}>
                      <AntDesign name='playcircleo' size={25} color="white" style={{ paddingRight: 20 }} />
                      <Text style={{ color: 'white', fontSize: 16 }}>{val.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, width: '50%' }}>{val.artista}</Text>
                  </View>
                )
              }
            })
          }

          <View style={{ padding: 100 }}></View>
        </ScrollView>

      </View>
      <View style={styles.player}>
        <Player audioIndex={audioIndex} setAudioIndex={setAudioIndex} musicas={musicas} setarMusicas={setarMusicas} audio={audio} setAudio={setAudio} musicaPause={musicaPause} setMusicaPause={setMusicaPause}></Player>
      </View>
      <StatusBar hidden />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
  },
  header: {
    padding: 25,
    backgroundColor: '#1DB954'
  },
  tabelaMusica: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 15,
    borderBottomColor: '#ccc'
  },
  btnMusica: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%'
  },
  player: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'black'
  }

});
