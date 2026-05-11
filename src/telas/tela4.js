import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, StepBadge, styles } from '../shared/appShared';

export default function Tela4({ navigation, route }) {
  const analysis = route.params.analysis;
  const hasPalindromes = analysis.isPhrasePalindrome || analysis.palindromeWords.length > 0;

  return (
    <AppShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StepBadge step="4" label="Palíndromos encontrados" />

        <View style={styles.heroCard}>
          <Text style={styles.emoji}>{hasPalindromes ? '🏆' : '🔎'}</Text>
          <Text style={styles.title}>
            {hasPalindromes ? 'Encontramos palíndromo!' : 'Nenhum palíndromo encontrado'}
          </Text>
          <Text style={styles.subtitle}>
            Palíndromo é um texto que continua igual quando lido de trás para frente.
          </Text>
        </View>

        {analysis.isPhrasePalindrome && (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>A frase inteira é um palíndromo</Text>
            <Text style={styles.successText}>“{analysis.original}”</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Palavras palíndromas</Text>
          {analysis.palindromeWords.length > 0 ? (
            <View style={styles.chipContainer}>
              {analysis.palindromeWords.map((word) => (
                <View key={word} style={styles.chip}>
                  <Text style={styles.chipText}>{word}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.paragraph}>
              Não há palavras isoladas que sejam palíndromos neste texto.
            </Text>
          )}
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Texto')}>Fazer nova análise</PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.navigate('Inicio')}>
          Voltar ao início
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
