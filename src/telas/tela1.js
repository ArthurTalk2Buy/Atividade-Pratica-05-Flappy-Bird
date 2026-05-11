import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import GameBird from '../components/GameBird';

export default function Tela1({ navigation }) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bob]);

  const birdTranslate = bob.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <LinearGradient colors={['#71C5CF', '#8FD4E0', '#B8E8F0']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.decor}>
        <View style={styles.sun} />
        <View style={[styles.cloud, { top: '12%', left: '6%' }]} />
        <View style={[styles.cloud, { top: '18%', left: '38%', transform: [{ scale: 0.85 }] }]} />
        <View style={[styles.cloud, { top: '10%', right: '8%' }]} />
        <View style={[styles.pipeDeco, { left: -8, bottom: 108, height: 120 }]} />
        <View style={[styles.pipeDeco, { right: -8, bottom: 108, height: 160 }]} />
      </View>

      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.logoBlock}>
            <Text style={styles.logoKicker}>Arcade casual</Text>
            <Text style={styles.logoTitle}>SKY</Text>
            <Text style={styles.logoTitle}>HOP</Text>
            <Text style={styles.tagline}>Desvie dos canos e bata seu recorde!</Text>
          </View>

          <Animated.View style={{ transform: [{ translateY: birdTranslate }] }}>
            <View style={styles.birdWrap}>
              <GameBird vy={-120} />
            </View>
          </Animated.View>

          <View style={styles.menu}>
            <Pressable
              style={({ pressed }) => [styles.btnPlay, pressed && styles.btnPressed]}
              onPress={() => navigation.navigate('Jogo')}
            >
              <Text style={styles.btnPlayText}>▶  Jogar</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.btnGhost, pressed && styles.btnPressed]}
              onPress={() => navigation.navigate('Instrucoes')}
            >
              <Text style={styles.btnGhostText}>Como jogar</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.btnGhost, pressed && styles.btnPressed]}
              onPress={() => navigation.navigate('Creditos')}
            >
              <Text style={styles.btnGhostText}>Créditos</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View pointerEvents="none" style={styles.groundStrip}>
        <View style={styles.groundTop} />
        <View style={styles.groundBody} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#71C5CF',
  },
  decor: {
    ...StyleSheet.absoluteFillObject,
  },
  sun: {
    position: 'absolute',
    top: 44,
    right: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF9C4',
    borderWidth: 3,
    borderColor: '#F5E6A8',
    shadowColor: '#fbbf24',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 4,
  },
  cloud: {
    position: 'absolute',
    width: 72,
    height: 26,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  pipeDeco: {
    position: 'absolute',
    width: 52,
    backgroundColor: '#73BF2E',
    borderWidth: 3,
    borderColor: '#546B2C',
    borderRadius: 4,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 120,
    paddingTop: 8,
    alignItems: 'center',
  },
  logoBlock: {
    alignItems: 'center',
    marginTop: 12,
  },
  logoKicker: {
    color: 'rgba(15, 60, 70, 0.75)',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  logoTitle: {
    color: '#FFFFFF',
    fontSize: 52,
    lineHeight: 52,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: '#3D6B4A',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0.1,
    includeFontPadding: false,
  },
  tagline: {
    marginTop: 14,
    color: 'rgba(15, 60, 70, 0.88)',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  birdWrap: {
    marginTop: 28,
    marginBottom: 8,
    transform: [{ scale: 2.2 }],
  },
  menu: {
    width: '100%',
    maxWidth: 320,
    marginTop: 36,
    gap: 14,
  },
  btnPlay: {
    backgroundColor: '#E86A17',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#5c2f0a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 6,
  },
  btnPlayText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  btnGhost: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#546B2C',
  },
  btnGhostText: {
    color: '#2d4a16',
    fontSize: 17,
    fontWeight: '800',
  },
  btnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  groundStrip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  groundTop: {
    height: 14,
    backgroundColor: '#DED895',
    borderTopWidth: 3,
    borderColor: '#C4B87A',
  },
  groundBody: {
    height: 32,
    backgroundColor: '#73BF2E',
    borderTopWidth: 3,
    borderColor: '#546B2C',
  },
});
