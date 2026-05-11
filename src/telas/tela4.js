import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, ScreenTitle, styles } from '../shared/appShared';

const STUDENT_NAME = 'Arthur Lima';
const COURSE_NAME = 'Desenvolvimento de Software Multiplataforma';
const DISCLAIMER =
  'Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize as informações aqui para uso real.';

export default function Tela4({ navigation }) {
  return (
    <AppShell variant="night">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle light title="Créditos" subtitle="Sky Hop — projeto acadêmico Flappy Bird" />

        <View style={styles.heroCard}>
          <Text style={styles.emoji}>🎮</Text>
          <Text style={styles.title}>Obrigado por jogar!</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Equipe</Text>
          <Text style={styles.creditStrong}>{STUDENT_NAME}</Text>
          <Text style={styles.creditLine}>Faculdade de Tecnologia — FATEC</Text>
          <Text style={styles.creditLine}>{COURSE_NAME}</Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>{DISCLAIMER}</Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('BoasVindas')}>Início</PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.navigate('Jogo')}>
          Jogar de novo
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
