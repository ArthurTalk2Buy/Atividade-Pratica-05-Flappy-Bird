import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FlappyGame from '../components/FlappyGame';

export default function Tela3({ navigation }) {
  const [mode, setMode] = useState('1p');
  const [soundOn, setSoundOn] = useState(true);

  return (
    <SafeAreaView style={styles.wrap} edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.navigate('Instrucoes')} hitSlop={12}>
          <Text style={styles.back}>‹ Voltar</Text>
        </Pressable>
        <View style={styles.toggles}>
          <Pressable
            onPress={() => setMode((m) => (m === '1p' ? '2p' : '1p'))}
            style={[styles.pill, mode === '2p' && styles.pillOn]}
          >
            <Text style={styles.pillText}>{mode === '2p' ? '2 jogadores' : '1 jogador'}</Text>
          </Pressable>
          <Pressable onPress={() => setSoundOn((s) => !s)} style={[styles.pill, soundOn && styles.pillOn]}>
            <Text style={styles.pillText}>{soundOn ? 'Som ligado' : 'Som mudo'}</Text>
          </Pressable>
        </View>
      </View>
      <FlappyGame key={mode} mode={mode} soundEnabled={soundOn} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#5fb0c4',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderBottomWidth: 3,
    borderBottomColor: '#546B2C',
  },
  back: {
    color: '#1a2e05',
    fontWeight: '900',
    padding: 8,
    fontSize: 16,
  },
  toggles: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 1,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#546B2C',
  },
  pillOn: {
    backgroundColor: '#DED895',
    borderColor: '#5c2f0a',
  },
  pillText: {
    color: '#1a2e05',
    fontSize: 12,
    fontWeight: '900',
  },
});
