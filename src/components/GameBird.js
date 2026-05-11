import React from 'react';
import { StyleSheet, View } from 'react-native';

export const BIRD_VISUAL_W = 40;
export const BIRD_VISUAL_H = 34;

export default function GameBird({ vy = 0, dimmed }) {
  const tilt = Math.min(Math.max(vy * 0.055, -32), 62);
  return (
    <View
      style={[
        styles.root,
        { transform: [{ rotate: `${tilt}deg` }] },
        dimmed && styles.dimmed,
      ]}
      pointerEvents="none"
    >
      <View style={styles.body} />
      <View style={styles.bodyShade} />
      <View style={styles.eyeWhite} />
      <View style={styles.pupil} />
      <View style={styles.beak} />
      <View style={styles.wing} />
      <View style={styles.outlineLeft} />
      <View style={styles.outlineTop} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: BIRD_VISUAL_W,
    height: BIRD_VISUAL_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimmed: {
    opacity: 0.4,
  },
  body: {
    position: 'absolute',
    left: 4,
    top: 6,
    width: 30,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#F7D648',
    borderWidth: 2,
    borderColor: '#4a3728',
  },
  bodyShade: {
    position: 'absolute',
    left: 10,
    top: 18,
    width: 18,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#E8B520',
    opacity: 0.85,
  },
  eyeWhite: {
    position: 'absolute',
    left: 20,
    top: 9,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4a3728',
  },
  pupil: {
    position: 'absolute',
    left: 26,
    top: 13,
    width: 5,
    height: 6,
    borderRadius: 2,
    backgroundColor: '#2d1f0f',
  },
  beak: {
    position: 'absolute',
    left: 0,
    top: 13,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#E86A17',
  },
  wing: {
    position: 'absolute',
    left: 12,
    top: 16,
    width: 14,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#F0C030',
    borderWidth: 2,
    borderColor: '#4a3728',
    transform: [{ rotate: '-12deg' }],
  },
  outlineLeft: {
    position: 'absolute',
    left: 4,
    top: 20,
    width: 2,
    height: 8,
    backgroundColor: '#4a3728',
    opacity: 0.35,
  },
  outlineTop: {
    position: 'absolute',
    left: 14,
    top: 6,
    width: 12,
    height: 2,
    backgroundColor: '#4a3728',
    opacity: 0.2,
  },
});
