import { EnemyPose } from '../components/enemyImages';
import { Outcome } from '../components/ResultBanner';
import { ENEMIES, EnemyType, HERO } from './characters';
import { Move } from './moves';
import { randomEnemyType } from './random';

export type Phase = 'waiting' | 'playerTurn' | 'enemyTurn' | 'gameOver';

export type GameState = {
  gameId: number;
  enemyType: EnemyType;
  enemyStamina: number;
  enemyPose: EnemyPose;
  heroStamina: number;
  phase: Phase;
  round: number;
  playerMove: Move | null;
  log: string[];
  outcome: Outcome | null;
};

export function createNewGame(gameId = 0): GameState {
  const enemyType = randomEnemyType();
  return {
    gameId,
    enemyType,
    enemyStamina: ENEMIES[enemyType].maxStamina,
    enemyPose: 'idle',
    heroStamina: HERO.maxStamina,
    phase: 'waiting',
    round: 0,
    playerMove: null,
    log: [],
    outcome: null,
  };
}
