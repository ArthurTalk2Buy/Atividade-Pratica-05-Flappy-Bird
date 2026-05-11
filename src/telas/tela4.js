import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, StepBadge, styles } from '../shared/appShared';

const STUDENT_NAME = 'Arthur Lima';
const COURSE_NAME = 'Desenvolvimento de Software Multiplataforma';
const DISCLAIMER =
  'Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize as informações aqui para uso real.';

export default function Tela4({ navigation }) {
  return (
    <AppShell variant="night">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StepBadge step="4" label="Créditos do jogo" />

        <View style={styles.heroCard}>
          <Text style={styles.emoji}>🎓</Text>
          <Text style={styles.title}>Créditos</Text>
          <Text style={styles.subtitle}>Sky Hop — Atividade Prática 05 (clone de Flappy Bird)</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Autoria e instituição</Text>
          <Text style={styles.creditStrong}>{STUDENT_NAME}</Text>
          <Text style={styles.creditLine}>Faculdade de Tecnologia — FATEC</Text>
          <Text style={styles.creditLine}>{COURSE_NAME}</Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>{DISCLAIMER}</Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('BoasVindas')}>Voltar ao início</PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.navigate('Jogo')}>
          Jogar novamente
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
