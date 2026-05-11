import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

export const SAMPLE_PHRASES = [
  'Socorram-me, subi no ônibus em Marrocos!',
  'A mala nada na lama.',
  'Anotaram a data da maratona.',
  'A grama é amarga.',
  'Ana comprou ovo no mercado.',
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function cleanForPalindrome(text) {
  return normalizeText(text).replace(/[^a-z0-9]/g, '');
}

function isPalindrome(text) {
  const cleaned = cleanForPalindrome(text);
  return cleaned.length > 2 && cleaned === cleaned.split('').reverse().join('');
}

export function analyzeText(text) {
  const normalized = normalizeText(text);
  const letters = normalized.match(/[a-z]/g) || [];
  const vowels = letters.filter((letter) => VOWELS.includes(letter)).length;
  const consonants = letters.length - vowels;
  const words = text.match(/[A-Za-zÀ-ÖØ-öø-ÿ]+/g) || [];
  const palindromeWords = [
    ...new Set(words.filter((word) => isPalindrome(word)).map((word) => word.trim())),
  ];

  return {
    original: text.trim(),
    totalLetters: letters.length,
    vowels,
    consonants,
    isPhrasePalindrome: isPalindrome(text),
    palindromeWords,
  };
}

export function AppShell({ children }) {
  return (
    <LinearGradient colors={['#6D5DFB', '#8F5CFF', '#FF7AB6']} style={styles.gradient}>
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
        colors={variant === 'primary' ? ['#FFE66D', '#FFB703'] : ['#FFFFFF', '#F2ECFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={[styles.buttonText, variant !== 'primary' && styles.buttonTextPurple]}>
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function StatCard({ value, label, color }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function RequirementPill({ children }) {
  return (
    <View style={styles.requirementPill}>
      <Text style={styles.requirementText}>{children}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
  },
  orbTop: {
    height: 190,
    right: -70,
    top: -54,
    width: 190,
  },
  orbBottom: {
    bottom: 80,
    height: 260,
    left: -120,
    width: 260,
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
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderColor: 'rgba(255, 255, 255, 0.38)',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  stepNumber: {
    color: '#FFE66D',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.38)',
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
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#F9F5FF',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    shadowColor: '#3E267D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },
  cardTitle: {
    color: '#32215F',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  paragraph: {
    color: '#655582',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 7,
  },
  requirementsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  requirementPill: {
    backgroundColor: '#F7F3FF',
    borderColor: '#E4D9FF',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  requirementText: {
    color: '#5E45BD',
    fontSize: 14,
    fontWeight: '800',
  },
  exampleBox: {
    backgroundColor: '#FFF7D6',
    borderColor: '#FFE66D',
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  exampleTitle: {
    color: '#5D4500',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  exampleText: {
    color: '#6E5400',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 5,
  },
  buttonShadow: {
    shadowColor: '#3E267D',
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
    color: '#4C3700',
    fontSize: 16,
    fontWeight: '900',
  },
  buttonTextPurple: {
    color: '#5E45BD',
  },
  input: {
    backgroundColor: '#F7F3FF',
    borderColor: '#DFD4FF',
    borderRadius: 22,
    borderWidth: 1,
    color: '#32215F',
    fontSize: 18,
    lineHeight: 26,
    minHeight: 170,
    padding: 18,
  },
  suggestionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFE8FF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suggestionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  suggestionTitle: {
    color: '#655582',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 14,
  },
  suggestionText: {
    color: '#6D5DFB',
    fontSize: 14,
    fontWeight: '800',
  },
  quote: {
    color: '#5E45BD',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 29,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    flex: 1,
    padding: 20,
    shadowColor: '#3E267D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 7,
  },
  statIcon: {
    borderRadius: 999,
    height: 14,
    marginBottom: 10,
    width: 48,
  },
  statValue: {
    color: '#32215F',
    fontSize: 42,
    fontWeight: '900',
  },
  statLabel: {
    color: '#655582',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  progressTrack: {
    backgroundColor: '#EFE8FF',
    borderRadius: 999,
    height: 16,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#FF7AB6',
    borderRadius: 999,
    height: '100%',
  },
  progressLabel: {
    color: '#655582',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  successCard: {
    backgroundColor: '#E9FFF5',
    borderColor: '#66E3AE',
    borderRadius: 26,
    borderWidth: 1,
    padding: 20,
  },
  successTitle: {
    color: '#067047',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  successText: {
    color: '#0B7A50',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#EFE8FF',
    borderColor: '#D8CAFF',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipText: {
    color: '#5E45BD',
    fontSize: 15,
    fontWeight: '900',
  },
});
