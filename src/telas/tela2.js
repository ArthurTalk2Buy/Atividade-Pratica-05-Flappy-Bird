import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, StepBadge, styles } from '../shared/appShared';

export default function Tela2({ navigation }) {
  return (
    <AppShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StepBadge step="2" label="Instruções do jogo" />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Como jogar</Text>
          <Text style={styles.bullet}>• Toque em Iniciar e, durante a partida, toque na área do jogo para dar impulso (flap).</Text>
          <Text style={styles.bullet}>• Desvie dos canos verdes. Bater no cano, no chão ou no teto encerra a sua fase.</Text>
          <Text style={styles.bullet}>• Cada cano que você passa soma um ponto na pontuação.</Text>
          <Text style={styles.bullet}>• O tempo de jogo aparece no topo (em segundos) desde o início até o fim da rodada.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dois jogadores</Text>
          <Text style={styles.paragraph}>
            Ative o modo 2 jogadores na tela do jogo. A tela divide em duas faixas: a metade de cima controla o
            jogador 1 e a metade de baixo controla o jogador 2. Cada um tem obstáculos e pontuação próprios. Vence
            quem fizer mais pontos quando ambos terminarem a rodada (ou em caso de empate).
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Som</Text>
          <Text style={styles.paragraph}>
            Use o botão de som na tela do jogo para ligar ou desligar efeitos (batida de asas, ponto e colisão). Os
            arquivos são carregados pela internet; mantenha a conexão ativa para o áudio funcionar no primeiro uso.
          </Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Jogo')}>Começar a jogar</PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.goBack()}>
          Voltar
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
