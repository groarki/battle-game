import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useAppActive } from '../hooks/useAppActive';
import { useBattleSounds } from '../hooks/useBattleSounds';
import { useMoveGestures } from '../hooks/useMoveGestures';
import { ENEMIES, HERO, applyDamage } from '../logic/characters';
import { GameState, createNewGame } from '../logic/gameState';
import { MOVE_INFO, Move, resolveExchange } from '../logic/moves';
import { randomEnemyMove, rollDamage } from '../logic/random';
import { saveGame } from '../storage/gameStorage';
import BattleLog from './BattleLog';
import Enemy from './Enemy';
import GestureHints from './GestureHints';
import Player from './Player';
import ResultBanner from './ResultBanner';

type Props = {
  initial: GameState;
};

export default function Battle({ initial }: Props) {
  const [game, setGame] = useState(initial);
  const { enemyType, enemyStamina, enemyPose, heroStamina, phase, round, playerMove, log, outcome } = game;
  const appActive = useAppActive();
  const { playEnemyAppear, playSword, playMonsterHurt, playHeroHurt } = useBattleSounds();

  const enemy = ENEMIES[enemyType];

  const update = (changes: Partial<GameState>) => setGame((g) => ({ ...g, ...changes }));

  useEffect(() => {
    saveGame(game);
  }, [game]);

  function startRound() {
    if (round === 0) playEnemyAppear(enemyType);
    update({ round: round + 1, playerMove: null, enemyPose: 'idle', phase: 'playerTurn' });
  }

  function handlePlayerMove(move: Move) {
    if (phase !== 'playerTurn') return;
    if (move !== 'block') playSword();
    update({ playerMove: move, enemyPose: 'idle', phase: 'enemyTurn' });
  }

  useEffect(() => {
    if (phase !== 'enemyTurn' || !playerMove || !appActive) return;

    const timer = setTimeout(() => {
      const enemyMove = randomEnemyMove();
      const result = resolveExchange(playerMove, enemyMove);
      const prefix = `Runda ${round}: ${MOVE_INFO[playerMove].name} vs ${MOVE_INFO[enemyMove].name}`;

      if (result === 'draw') {
        update({
          enemyPose: enemyMove,
          log: [`${prefix} — remis, wykonaj kolejny ruch`, ...log],
          phase: 'playerTurn',
        });
        return;
      }

      const playerWon = result === 'player';
      const attacker = playerWon ? HERO : enemy;
      const hitPoints = rollDamage(attacker.strength);
      const hit = applyDamage(playerWon ? enemyStamina : heroStamina, hitPoints);
      const ending = hit.dead ? 'koniec walki!' : 'zaczyna się nowa runda';

      if (playerWon) playMonsterHurt();
      else playHeroHurt();

      update({
        ...(playerWon
          ? { enemyStamina: hit.stamina, enemyPose: 'hurt' }
          : { heroStamina: hit.stamina, enemyPose: enemyMove }),
        log: [`${prefix} — ${attacker.name} zadał ${hitPoints} obrażeń, ${ending}`, ...log],
        phase: hit.dead ? 'gameOver' : 'waiting',
        outcome: hit.dead ? (playerWon ? 'victory' : 'defeat') : null,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [phase, playerMove, round, heroStamina, enemyStamina, enemy, log, appActive, playMonsterHurt, playHeroHurt]);

  function restart() {
    setGame(createNewGame(game.gameId + 1));
  }

  const gesture = useMoveGestures(handlePlayerMove, phase === 'playerTurn');

  return (
    <View style={styles.container}>
      <Enemy
        type={enemyType}
        stamina={enemyStamina}
        pose={enemyPose}
        hidden={round === 0}
      />

      <BattleLog latest={log[0]} />

      {outcome ? (
        <ResultBanner outcome={outcome} onRestart={restart} />
      ) : (
        <GestureDetector gesture={gesture}>
          <View style={[styles.area, phase === 'playerTurn' && styles.areaActive]}>
            {phase === 'waiting' ? (
              <View style={styles.roundButton}>
                <Button
                  title={round === 0 ? 'Rozpocznij walkę' : 'Nowa runda'}
                  color={Platform.OS === 'ios' ? '#ffffff' : '#1a2f6b'}
                  onPress={startRound}
                />
              </View>
            ) : (
              <Text style={styles.areaText}>
                {phase === 'playerTurn'
                  ? `Runda ${round} — wykonaj ruch`
                  : `${enemy.name} się zastanawia…`}
              </Text>
            )}
          </View>
        </GestureDetector>
      )}
      
      <Player stats={HERO} stamina={heroStamina}  />

      <GestureHints activeMove={playerMove} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 10,
  },
  area: {
    flex: 1,
    minHeight: 80,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaActive: {
    borderColor: '#d9822b',
    backgroundColor: '#fff8ef',
  },
  roundButton: {
    backgroundColor: '#1a2f6b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  areaText: {
    fontSize: 16,
    color: '#555',
  },
});
