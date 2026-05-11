import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AppShell({ children, variant = 'sky' }) {
  const colors = variant === 'night' ? ['#0f172a', '#1e293b', '#312e81'] : ['#38bdf8', '#6366f1', '#a855f7'];
  return (
    <LinearGradient colors={colors} style={styles.gradient}>
      <StatusBar style="light" />
      <View pointerEvents="none" style={styles.decorLayer}>
        <View style={[styles.orb, styles.orbTop]} />
        <View style={[styles.orb, styles.orbBottom]} />
      </View>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

export function StepBadge({ step, label }) {
  return (
    <View style={styles.stepBadge}>
      <Text style={styles.stepNumber}>Tela {step}</Text>
      <Text style={styles.stepLabel}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({ children, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.buttonShadow}>
      <LinearGradient
        colors={variant === 'primary' ? ['#fbbf24', '#f97316'] : ['#FFFFFF', '#e0f2fe']}
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
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  stepNumber: {
    color: '#fef08a',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  stepLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
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
    color: '#422006',
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
