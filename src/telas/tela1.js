import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, StepBadge, styles } from '../shared/appShared';

export default function Tela1({ navigation }) {
  return (
    <AppShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StepBadge step="1" label="Boas-vindas" />

        <View style={styles.heroCard}>
          <Text style={styles.emoji}>🐦</Text>
          <Text style={styles.title}>Sky Hop</Text>
          <Text style={styles.subtitle}>
            Um Flappy Bird em React Native com modo para dois jogadores, sons, pontuação e tempo.
            Divirta-se e boa entrega na FATEC!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que você vai encontrar</Text>
          <Text style={styles.paragraph}>• Navegação em quatro telas com React Navigation.</Text>
          <Text style={styles.paragraph}>• Jogo completo com obstáculos e colisão.</Text>
          <Text style={styles.paragraph}>• Modo 1 jogador ou 2 jogadores no mesmo aparelho.</Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Instrucoes')}>Ver instruções</PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.navigate('Jogo')}>
          Ir direto ao jogo
        </PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.navigate('Creditos')}>
          Créditos
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
