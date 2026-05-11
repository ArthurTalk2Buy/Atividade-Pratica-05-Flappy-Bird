import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, StatCard, StepBadge, styles } from '../shared/appShared';

export default function Tela3({ navigation, route }) {
  const analysis = route.params.analysis;
  const vowelPercent = useMemo(() => {
    if (!analysis.totalLetters) {
      return 0;
    }

    return Math.round((analysis.vowels / analysis.totalLetters) * 100);
  }, [analysis.totalLetters, analysis.vowels]);

  return (
    <AppShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StepBadge step="3" label="Quantidade de vogais e consoantes" />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Texto analisado</Text>
          <Text style={styles.quote}>“{analysis.original}”</Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard value={analysis.vowels} label="Vogais" color="#FF7AB6" />
          <StatCard value={analysis.consonants} label="Consoantes" color="#6D5DFB" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo</Text>
          <Text style={styles.paragraph}>Total de letras: {analysis.totalLetters}</Text>
          <Text style={styles.paragraph}>
            Texto completo é palíndromo: {analysis.isPhrasePalindrome ? 'sim' : 'não'}
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${vowelPercent}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{vowelPercent}% das letras são vogais.</Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Palindromos', { analysis })}>
          Ver palíndromos
        </PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.navigate('Texto')}>
          Analisar outro texto
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
