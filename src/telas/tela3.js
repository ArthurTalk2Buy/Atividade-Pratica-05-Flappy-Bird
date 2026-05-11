import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FlappyGame from '../components/FlappyGame';

const styles = {
  wrap: { flex: 1, backgroundColor: '#0f172a' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148,163,184,0.35)',
  },
  back: { color: '#e2e8f0', fontWeight: '800', padding: 8 },
  toggles: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 },
  pill: {
    backgroundColor: 'rgba(30,41,59,0.95)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.45)',
  },
  pillOn: {
    backgroundColor: 'rgba(249,115,22,0.25)',
    borderColor: '#fb923c',
  },
  pillText: { color: '#f8fafc', fontSize: 12, fontWeight: '900' },
};

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
