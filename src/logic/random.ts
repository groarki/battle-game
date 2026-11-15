import { ENEMY_TYPES, EnemyType } from './characters';
import { MOVES, Move } from './moves';

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)];
}

export function randomEnemyType(): EnemyType {
  return randomItem(ENEMY_TYPES);
}

export function randomEnemyMove(): Move {
  return randomItem(MOVES);
}

export function rollDamage(strength: number): number {
  return Math.floor((randomInt(1, 6) - 0.5) * strength);
}
