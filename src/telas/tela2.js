import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  analyzeText,
  AppShell,
  PrimaryButton,
  SAMPLE_PHRASES,
  StepBadge,
  styles,
} from '../shared/appShared';

export default function Tela2({ navigation }) {
  const [text, setText] = useState('');

  function handleAnalyze() {
    if (!text.trim()) {
      Alert.alert('Ops!', 'Digite uma palavra ou frase para continuar.');
      return;
    }

    navigation.navigate('Resultado', { analysis: analyzeText(text) });
  }

  return (
    <AppShell>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <StepBadge step="2" label="Leitura de palavra ou frase" />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Digite seu texto</Text>
            <Text style={styles.paragraph}>
              Pode usar letras maiúsculas, acentos, espaços e pontuação. O app trata tudo para fazer
              a análise corretamente.
            </Text>

            <TextInput
              multiline
              value={text}
              onChangeText={setText}
              placeholder="Ex.: A mala nada na lama."
              placeholderTextColor="#9B8FBC"
              style={styles.input}
              textAlignVertical="top"
            />

            <Text style={styles.suggestionTitle}>Toque em uma sugestão para testar:</Text>
            <View style={styles.suggestionGrid}>
              {SAMPLE_PHRASES.map((phrase, index) => (
                <TouchableOpacity
                  key={phrase}
                  activeOpacity={0.85}
                  onPress={() => setText(phrase)}
                  style={styles.suggestionButton}
                >
                  <Text style={styles.suggestionText}>Exemplo {index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <PrimaryButton onPress={handleAnalyze}>Analisar texto</PrimaryButton>
          <PrimaryButton variant="secondary" onPress={() => navigation.goBack()}>
            Voltar
          </PrimaryButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppShell>
  );
}
