import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const VARIANTS = {
  sky: ['#38bdf8', '#6366f1', '#a855f7'],
  night: ['#0f172a', '#1e293b', '#312e81'],
  flappy: ['#71C5CF', '#8FD4E0', '#B8E8F0'],
};

export function AppShell({ children, variant = 'sky' }) {
  const colors = VARIANTS[variant] || VARIANTS.sky;
  return (
    <LinearGradient colors={colors} style={styles.gradient}>
      <StatusBar style={variant === 'night' ? 'light' : 'dark'} />
      <View pointerEvents="none" style={styles.decorLayer}>
        <View style={[styles.orb, styles.orbTop]} />
        <View style={[styles.orb, styles.orbBottom]} />
        {(variant === 'flappy' || variant === 'sky') && (
          <>
            <View style={[styles.cloudSoft, { top: '8%', left: '5%' }]} />
            <View style={[styles.cloudSoft, { top: '14%', right: '8%', opacity: 0.9 }]} />
          </>
        )}
      </View>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

export function PrimaryButton({ children, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.buttonShadow}>
      <LinearGradient
        colors={variant === 'primary' ? ['#E86A17', '#f97316'] : ['#FFFFFF', '#e8f8fa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={[styles.buttonText, variant !== 'primary' && styles.buttonTextDark]}>
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function ScreenTitle({ title, subtitle, light }) {
  return (
    <View style={styles.screenTitleBlock}>
      <Text style={[styles.screenTitle, light && styles.screenTitleOnDark]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.screenSubtitle, light && styles.screenSubtitleOnDark]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  decorLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 999,
  },
  orbTop: {
    height: 180,
    right: -60,
    top: -40,
    width: 180,
  },
  orbBottom: {
    bottom: 60,
    height: 240,
    left: -100,
    width: 240,
  },
  cloudSoft: {
    position: 'absolute',
    width: 80,
    height: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 22,
    paddingBottom: 34,
    gap: 18,
  },
  screenTitleBlock: {
    marginBottom: 6,
  },
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  screenTitleOnDark: {
    textShadowColor: 'rgba(0,0,0,0.4)',
  },
  screenSubtitle: {
    marginTop: 6,
    color: 'rgba(15, 60, 70, 0.85)',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  screenSubtitleOnDark: {
    color: 'rgba(226, 232, 240, 0.92)',
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 32,
    borderWidth: 1,
    padding: 26,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#f0f9ff',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
  paragraph: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  bullet: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
    marginLeft: 4,
  },
  buttonShadow: {
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 7,
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  buttonTextDark: {
    color: '#0f172a',
  },
  disclaimerBox: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 8,
    padding: 16,
  },
  disclaimerText: {
    color: '#78350f',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  },
  creditLine: {
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
    textAlign: 'center',
  },
  creditStrong: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});
