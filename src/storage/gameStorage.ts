import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENEMIES } from '../logic/characters';
import { GameState } from '../logic/gameState';

const STORAGE_KEY = 'battle-game.battle.v1';

function isValid(data: unknown): data is GameState {
  if (typeof data !== 'object' || data === null) return false;
  const game = data as Partial<GameState>;
  return (
    typeof game.enemyType === 'string' &&
    game.enemyType in ENEMIES &&
    typeof game.enemyStamina === 'number' &&
    typeof game.heroStamina === 'number' &&
    typeof game.round === 'number' &&
    typeof game.phase === 'string' &&
    Array.isArray(game.log)
  );
}

export async function loadGame(): Promise<GameState | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    return isValid(data) ? data : null;
  } catch {
    return null;
  }
}

export async function saveGame(game: GameState): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  } catch {}
}
