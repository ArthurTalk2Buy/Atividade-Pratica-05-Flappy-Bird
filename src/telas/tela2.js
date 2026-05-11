import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppShell, PrimaryButton, ScreenTitle, styles } from '../shared/appShared';

export default function Tela2({ navigation }) {
  return (
    <AppShell variant="flappy">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle title="Como jogar" subtitle="Tudo o que você precisa para começar." />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Controles</Text>
          <Text style={styles.bullet}>• Toque em Iniciar e, na partida, toque na área do jogo para subir.</Text>
          <Text style={styles.bullet}>• Evite os canos e as bordas da área.</Text>
          <Text style={styles.bullet}>• Cada cano que você passa vale um ponto.</Text>
          <Text style={styles.bullet}>• O tempo da rodada aparece no topo, em segundos.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dois no mesmo aparelho</Text>
          <Text style={styles.paragraph}>
            Na tela do jogo, ative o modo com dois jogadores: a metade de cima é o jogador 1 e a de baixo é o jogador 2.
            Cada faixa tem obstáculos e pontuação próprios. Ao final, quem tiver mais pontos vence (ou empate).
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Som</Text>
          <Text style={styles.paragraph}>
            Use o botão de som no jogo para ligar ou desligar os efeitos. Na primeira vez, os sons são baixados pela
            internet.
          </Text>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Jogo')}>Jogar agora</PrimaryButton>
        <PrimaryButton variant="secondary" onPress={() => navigation.goBack()}>
          Voltar
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
