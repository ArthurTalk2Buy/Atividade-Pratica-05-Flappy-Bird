import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';

import GameBird, { BIRD_VISUAL_H, BIRD_VISUAL_W } from './GameBird';

const { width: SCREEN_W } = Dimensions.get('window');

const BIRD_W = BIRD_VISUAL_W;
const BIRD_H = BIRD_VISUAL_H;

const SOUND_FLAP = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
const SOUND_POINT = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
const SOUND_HIT = 'https://assets.mixkit.co/active_storage/sfx/2652/2652-preview.mp3';

const G = 650;
const FLAP_V = -340;
const PIPE_SPEED = 138;
const PIPE_W = 54;
const HIT_INSET = 7;
const PIPE_SPAWN_AT = 0.44;

const HUD_MONO = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

function randomGapTop(laneH, gap) {
  const margin = 44;
  const max = laneH - gap - margin;
  return margin + Math.random() * Math.max(1, max - margin);
}

function createPipe(laneW, laneH) {
  const gap = 158 + Math.random() * 42;
  return {
    x: laneW + 24,
    gapTop: randomGapTop(laneH, gap),
    gapSize: gap,
    passed: false,
  };
}

function createPlayer(laneW, laneH) {
  return {
    y: laneH * 0.42,
    vy: 0,
    alive: true,
    score: 0,
    pipes: [createPipe(laneW, laneH)],
  };
}

export default function FlappyGame({ mode, soundEnabled, onLeaveToMenu }) {
  const twoPlayers = mode === '2p';
  const layoutRef = useRef({ w: SCREEN_W, h: 520, laneH: 520 });
  const [, setRenderTick] = useState(0);
  const stateRef = useRef({
    running: false,
    over: false,
    startedAt: 0,
    players: [createPlayer(SCREEN_W, 520)],
  });
  const rafRef = useRef(null);
  const lastTRef = useRef(null);
  const soundsRef = useRef({ flap: null, point: null, hit: null });
  const playedHitRef = useRef(false);

  const forceUpdate = useCallback(() => setRenderTick((n) => n + 1), []);

  const loadSounds = useCallback(async () => {
    if (!soundEnabled) return;
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      const [flap, point, hit] = await Promise.all([
        Audio.Sound.createAsync({ uri: SOUND_FLAP }, { volume: 0.35 }),
        Audio.Sound.createAsync({ uri: SOUND_POINT }, { volume: 0.45 }),
        Audio.Sound.createAsync({ uri: SOUND_HIT }, { volume: 0.5 }),
      ]);
      soundsRef.current = { flap: flap.sound, point: point.sound, hit: hit.sound };
    } catch {
      soundsRef.current = { flap: null, point: null, hit: null };
    }
  }, [soundEnabled]);

  useEffect(() => {
    loadSounds();
    return () => {
      const { flap, point, hit } = soundsRef.current;
      [flap, point, hit].forEach((s) => {
        if (s) {
          s.unloadAsync().catch(() => {});
        }
      });
      soundsRef.current = { flap: null, point: null, hit: null };
    };
  }, [loadSounds]);

  const play = useCallback(
    async (key) => {
      if (!soundEnabled) return;
      const s = soundsRef.current[key];
      if (!s) return;
      try {
        await s.setPositionAsync(0);
        await s.playAsync();
      } catch {
        /* ignore */
      }
    },
    [soundEnabled]
  );

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTRef.current = null;
  }, []);

  const handleMenu = useCallback(() => {
    stopLoop();
    stateRef.current.running = false;
    stateRef.current.over = false;
    forceUpdate();
    onLeaveToMenu?.();
  }, [stopLoop, forceUpdate, onLeaveToMenu]);

  const tick = useCallback(
    (time) => {
      const s = stateRef.current;
      if (!s.running || s.over) return;

      if (lastTRef.current == null) lastTRef.current = time;
      let dt = (time - lastTRef.current) / 1000;
      lastTRef.current = time;
      if (dt > 0.055) dt = 0.055;

      const { w, laneH } = layoutRef.current;
      const lh = laneH;
      const birdX = w * 0.28;

      for (let i = 0; i < s.players.length; i++) {
        const p = s.players[i];
        if (!p.alive) continue;

        p.vy += G * dt;
        p.y += p.vy * dt;

        for (const pipe of p.pipes) {
          pipe.x -= PIPE_SPEED * dt;
        }

        const last = p.pipes[p.pipes.length - 1];
        if (last.x < w * PIPE_SPAWN_AT) {
          p.pipes.push(createPipe(w, lh));
        }
        if (p.pipes[0].x + PIPE_W < -20) {
          p.pipes.shift();
        }

        for (const pipe of p.pipes) {
          if (!pipe.passed && pipe.x + PIPE_W < birdX - BIRD_W / 2) {
            pipe.passed = true;
            p.score += 1;
            play('point');
          }
        }

        if (checkCollisions(p, lh, birdX)) {
          p.alive = false;
          p.vy = 0;
        }
      }

      const stillAlive = s.players.some((p) => p.alive);
      if (!stillAlive) {
        s.over = true;
        s.running = false;
        if (!playedHitRef.current) {
          playedHitRef.current = true;
          play('hit');
        }
        stopLoop();
      }

      forceUpdate();

      if (s.running && !s.over) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [forceUpdate, play, stopLoop]
  );

  const startGame = useCallback(() => {
    stopLoop();
    const { w, laneH } = layoutRef.current;
    const lh = laneH;
    stateRef.current = {
      running: true,
      over: false,
      startedAt: Date.now(),
      players: twoPlayers
        ? [createPlayer(w, lh), createPlayer(w, lh)]
        : [createPlayer(w, lh)],
    };
    playedHitRef.current = false;
    lastTRef.current = null;
    forceUpdate();
    rafRef.current = requestAnimationFrame(tick);
  }, [twoPlayers, tick, forceUpdate, stopLoop]);

  useEffect(() => {
    stopLoop();
    stateRef.current.running = false;
    stateRef.current.over = false;
    stateRef.current.startedAt = 0;
    const { w, h } = layoutRef.current;
    const lh = twoPlayers ? (h - 3) / 2 : h;
    layoutRef.current.laneH = lh;
    stateRef.current.players = twoPlayers
      ? [createPlayer(w, lh), createPlayer(w, lh)]
      : [createPlayer(w, lh)];
    playedHitRef.current = false;
    forceUpdate();
    return () => stopLoop();
  }, [mode, twoPlayers, stopLoop, forceUpdate]);

  const flap = useCallback(
    (playerIndex) => {
      const s = stateRef.current;
      if (!s.running || s.over) return;
      const p = s.players[playerIndex];
      if (!p || !p.alive) return;
      p.vy = FLAP_V;
      play('flap');
      forceUpdate();
    },
    [play, forceUpdate]
  );

  const onPressField = useCallback(
    (localY) => {
      const s = stateRef.current;
      if (!s.running || s.over) return;
      if (twoPlayers) {
        const split = layoutRef.current.laneH;
        if (localY < split) flap(0);
        else flap(1);
      } else {
        flap(0);
      }
    },
    [twoPlayers, flap]
  );

  const onLayoutField = useCallback(
    (e) => {
      const { width, height } = e.nativeEvent.layout;
      if (width < 1 || height < 1) return;
      const fieldH = height;
      const laneH = twoPlayers ? (fieldH - 3) / 2 : fieldH;
      layoutRef.current = {
        w: width,
        h: fieldH,
        laneH,
      };
      if (!stateRef.current.running) {
        stateRef.current.players = twoPlayers
          ? [createPlayer(width, laneH), createPlayer(width, laneH)]
          : [createPlayer(width, laneH)];
        forceUpdate();
      }
    },
    [twoPlayers, forceUpdate]
  );

  const s = stateRef.current;
  const elapsedSec =
    s.startedAt && (s.running || s.over) ? Math.max(0, (Date.now() - s.startedAt) / 1000) : 0;
  const timeLabel = `${elapsedSec.toFixed(1)} s`;

  const { w, laneH } = layoutRef.current;
  const birdX = w * 0.28;

  const renderLane = (playerIndex, lanePixelH) => {
    const p = s.players[playerIndex];
    if (!p) return null;
    const pipes = p.pipes;

    return (
      <View style={[styles.lane, { height: lanePixelH }]} pointerEvents="box-none">
        <LinearLaneBackground variant={playerIndex === 0 ? 'a' : 'b'} />
        {pipes.map((pipe, idx) => (
          <View key={`${playerIndex}-${idx}-${Math.round(pipe.x)}-${pipe.gapTop}`}>
            <View
              style={[
                styles.pipe,
                styles.pipeFill,
                { left: pipe.x, top: 0, width: PIPE_W, height: pipe.gapTop },
              ]}
            />
            <View
              style={[
                styles.pipe,
                styles.pipeFill,
                {
                  left: pipe.x,
                  top: pipe.gapTop + pipe.gapSize,
                  width: PIPE_W,
                  height: Math.max(0, lanePixelH - pipe.gapTop - pipe.gapSize),
                },
              ]}
            />
            <View style={[styles.pipeLip, { left: pipe.x - 2, top: pipe.gapTop - 18, width: PIPE_W + 4 }]} />
            <View
              style={[
                styles.pipeLip,
                {
                  left: pipe.x - 2,
                  top: pipe.gapTop + pipe.gapSize,
                  width: PIPE_W + 4,
                },
              ]}
            />
          </View>
        ))}
        <View
          style={[
            styles.birdWrap,
            {
              left: birdX - BIRD_W / 2,
              top: p.y - BIRD_H / 2,
            },
          ]}
        >
          <GameBird vy={p.vy} dimmed={!p.alive} />
        </View>
        {twoPlayers && (
          <View style={styles.laneTag}>
            <Text style={styles.laneTagKicker}>Pista</Text>
            <Text style={styles.laneTagText}>Jog. {playerIndex + 1}</Text>
          </View>
        )}
      </View>
    );
  };

  const scoresText = s.players.map((p) => p.score).join(' × ');
  const winner =
    twoPlayers && s.over
      ? s.players[0].score === s.players[1].score
        ? 'Empate!'
        : s.players[0].score > s.players[1].score
          ? 'Jogador 1 venceu!'
          : 'Jogador 2 venceu!'
      : null;

  return (
    <View style={styles.root}>
      <View style={styles.hudRow} pointerEvents="box-none">
        <View style={styles.hudCluster} pointerEvents="none">
          <View style={styles.hudCard}>
            <Text style={styles.hudLabel}>Pontos</Text>
            <Text style={styles.hudValue} numberOfLines={1}>
              {scoresText}
            </Text>
          </View>
          <View style={styles.hudCard}>
            <Text style={styles.hudLabel}>Tempo</Text>
            <Text style={styles.hudValue}>{timeLabel}</Text>
          </View>
        </View>
        {typeof onLeaveToMenu === 'function' ? (
          <Pressable
            onPress={handleMenu}
            style={({ pressed }) => [styles.hudMenuBtn, pressed && styles.hudMenuBtnPressed]}
            hitSlop={8}
          >
            <Text style={styles.hudMenuIcon}>⌂</Text>
            <Text style={styles.hudMenuLabel}>Início</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable
        style={styles.field}
        onLayout={onLayoutField}
        onPressIn={(e) => onPressField(e.nativeEvent.locationY)}
      >
        {twoPlayers ? (
          <>
            {renderLane(0, laneH)}
            <View style={styles.divider} />
            {renderLane(1, laneH)}
          </>
        ) : (
          renderLane(0, laneH)
        )}
      </Pressable>

      {!s.running && !s.over && (
        <View style={styles.overlay} pointerEvents="box-none">
          <Text style={styles.overlayTitle}>Sky Hop</Text>
          <Text style={styles.overlayHint}>
            {twoPlayers
              ? 'Metade de cima = jogador 1. Metade de baixo = jogador 2.'
              : 'Toque na área do jogo para bater as asas.'}
          </Text>
          <Pressable style={styles.startBtn} onPress={startGame}>
            <Text style={styles.startBtnText}>Iniciar</Text>
          </Pressable>
          {typeof onLeaveToMenu === 'function' ? (
            <Pressable style={styles.secondaryBtn} onPress={handleMenu}>
              <Text style={styles.secondaryBtnText}>Voltar ao menu</Text>
            </Pressable>
          ) : null}
        </View>
      )}

      {s.over && (
        <View style={styles.overlay} pointerEvents="box-none">
          <Text style={styles.overlayTitle}>Fim de jogo</Text>
          <View style={styles.overlayScoreCard}>
            <Text style={styles.overlayStatLabel}>Pontuação</Text>
            <Text style={styles.overlayStatBig}>{scoresText}</Text>
            <Text style={styles.overlayStatLabel}>Tempo</Text>
            <Text style={styles.overlayStatBig}>{timeLabel}</Text>
          </View>
          {winner && <Text style={styles.overlayWinner}>{winner}</Text>}
          <Pressable style={styles.startBtn} onPress={startGame}>
            <Text style={styles.startBtnText}>Jogar de novo</Text>
          </Pressable>
          {typeof onLeaveToMenu === 'function' ? (
            <Pressable style={styles.secondaryBtn} onPress={handleMenu}>
              <Text style={styles.secondaryBtnText}>Menu inicial</Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}

function checkCollisions(p, laneH, birdX) {
  const bx = birdX;
  const by = p.y;
  const top = by - BIRD_H / 2 + HIT_INSET;
  const bottom = by + BIRD_H / 2 - HIT_INSET;
  const left = bx - BIRD_W / 2 + HIT_INSET;
  const right = bx + BIRD_W / 2 - HIT_INSET;

  if (top <= 0 || bottom >= laneH) return true;

  for (const pipe of p.pipes) {
    const px1 = pipe.x;
    const px2 = pipe.x + PIPE_W;
    if (right > px1 && left < px2) {
      if (top < pipe.gapTop || bottom > pipe.gapTop + pipe.gapSize) {
        return true;
      }
    }
  }
  return false;
}

function LinearLaneBackground({ variant }) {
  const sky = variant === 'a' ? '#71C5CF' : '#63ADC0';
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: sky }]}>
      <View style={styles.cloudRow}>
        <View style={[styles.cloud, { left: '6%', top: '14%' }]} />
        <View style={[styles.cloud, { left: '38%', top: '22%', opacity: 0.92 }]} />
        <View style={[styles.cloud, { left: '70%', top: '12%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#4a9bab',
  },
  hudRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 8,
    gap: 10,
  },
  hudCluster: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  hudCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#546B2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  hudLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#546B2C',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  hudValue: {
    marginTop: 2,
    fontSize: 22,
    fontWeight: '900',
    color: '#1a2e05',
    fontFamily: HUD_MONO,
    letterSpacing: Platform.OS === 'ios' ? -1 : 0,
  },
  hudMenuBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#E86A17',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#5c2f0a',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  hudMenuBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  hudMenuIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 2,
  },
  hudMenuLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  field: {
    flex: 1,
  },
  lane: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  divider: {
    height: 4,
    backgroundColor: '#DED895',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4B87A',
  },
  pipe: {
    position: 'absolute',
    borderRadius: 6,
  },
  pipeFill: {
    backgroundColor: '#73BF2E',
    borderWidth: 3,
    borderColor: '#546B2C',
  },
  pipeLip: {
    position: 'absolute',
    height: 18,
    backgroundColor: '#6CAD2A',
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#546B2C',
  },
  birdWrap: {
    position: 'absolute',
    width: BIRD_W,
    height: BIRD_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
  laneTag: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#546B2C',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  laneTagKicker: {
    fontSize: 9,
    fontWeight: '800',
    color: '#546B2C',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  laneTagText: {
    color: '#1a2e05',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: HUD_MONO,
    marginTop: 1,
  },
  cloudRow: {
    ...StyleSheet.absoluteFillObject,
  },
  cloud: {
    position: 'absolute',
    width: 76,
    height: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25, 70, 78, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  overlayTitle: {
    color: '#FFF9C4',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  overlayHint: {
    color: '#e8f4f6',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    fontWeight: '600',
  },
  overlayScoreCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 22,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
  },
  overlayStatLabel: {
    color: 'rgba(232,244,246,0.85)',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 6,
  },
  overlayStatBig: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    fontFamily: HUD_MONO,
    marginTop: 2,
  },
  overlayWinner: {
    color: '#86efac',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  startBtn: {
    marginTop: 16,
    backgroundColor: '#E86A17',
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#5c2f0a',
    minWidth: 220,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryBtnText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 16,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
