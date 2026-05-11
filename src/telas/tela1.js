import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  AppShell,
  PrimaryButton,
  RequirementPill,
  SAMPLE_PHRASES,
  StepBadge,
  styles,
} from '../shared/appShared';

export default function Tela1({ navigation }) {
  return (
    <AppShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StepBadge step="1" label="Orientações do aplicativo" />

        <View style={styles.heroCard}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Texto Criativo</Text>
          <Text style={styles.subtitle}>
            Digite uma palavra ou frase e descubra quantas vogais, consoantes e palíndromos ela
            possui.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Como usar</Text>
          <View style={styles.requirementsWrap}>
            <RequirementPill>1. Leia as orientações</RequirementPill>
            <RequirementPill>2. Digite um texto</RequirementPill>
            <RequirementPill>3. Veja vogais e consoantes</RequirementPill>
            <RequirementPill>4. Confira os palíndromos</RequirementPill>
          </View>
        </View>

        <View style={styles.exampleBox}>
          <Text style={styles.exampleTitle}>Exemplos famosos</Text>
          {SAMPLE_PHRASES.map((phrase) => (
            <Text key={phrase} style={styles.exampleText}>
              “{phrase}”
            </Text>
          ))}
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Texto')}>Começar análise</PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
