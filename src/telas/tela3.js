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
        <View style={styles.topLeft}>
          <Pressable
            onPress={() => navigation.navigate('BoasVindas')}
            style={({ pressed }) => [styles.topPill, pressed && styles.topPillPressed]}
            hitSlop={6}
          >
            <Text style={styles.topPillIcon}>⌂</Text>
            <Text style={styles.topPillText}>Menu</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Instrucoes')}
            style={({ pressed }) => [styles.topPillGhost, pressed && styles.topPillPressed]}
            hitSlop={6}
          >
            <Text style={styles.topPillGhostText}>Ajuda</Text>
          </Pressable>
        </View>
        <View style={styles.toggles}>
          <Pressable
            onPress={() => setMode((m) => (m === '1p' ? '2p' : '1p'))}
            style={({ pressed }) => [styles.pill, mode === '2p' && styles.pillOn, pressed && styles.topPillPressed]}
          >
            <Text style={styles.pillText}>{mode === '2p' ? '2 jog.' : '1 jog.'}</Text>
          </Pressable>
          <Pressable
            onPress={() => setSoundOn((s) => !s)}
            style={({ pressed }) => [styles.pill, soundOn && styles.pillOn, pressed && styles.topPillPressed]}
          >
            <Text style={styles.pillText}>{soundOn ? 'Som' : 'Mudo'}</Text>
          </Pressable>
        </View>
      </View>
      <FlappyGame
        key={mode}
        mode={mode}
        soundEnabled={soundOn}
        onLeaveToMenu={() => navigation.navigate('BoasVindas')}
      />
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderBottomWidth: 3,
    borderBottomColor: '#546B2C',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E86A17',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#5c2f0a',
  },
  topPillGhost: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: 2,
    borderColor: '#546B2C',
  },
  topPillPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  topPillIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  topPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  topPillGhostText: {
    color: '#1a2e05',
    fontSize: 13,
    fontWeight: '900',
  },
  toggles: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flexShrink: 1,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 2,
    borderColor: '#546B2C',
  },
  pillOn: {
    backgroundColor: '#DED895',
    borderColor: '#5c2f0a',
  },
  pillText: {
    color: '#1a2e05',
    fontSize: 13,
    fontWeight: '900',
  },
});
