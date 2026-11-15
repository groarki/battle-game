export type CharacterStats = {
  name: string;
  strength: number;
  maxStamina: number;
};

export const HERO: CharacterStats = {
  name: 'Bohater',
  strength: 3,
  maxStamina: 30,
};

export type EnemyType = 'orc' | 'goblin' | 'troll';

export const ENEMY_TYPES: EnemyType[] = ['orc', 'goblin', 'troll'];

export const ENEMIES: Record<EnemyType, CharacterStats> = {
  goblin: { name: 'Goblin', strength: 2, maxStamina: 18 },
  orc: { name: 'Ork', strength: 3, maxStamina: 24 },
  troll: { name: 'Troll', strength: 4, maxStamina: 32 },
};

export type DamageResult = {
  stamina: number;
  dead: boolean;
};

export function applyDamage(stamina: number, hitPoints: number): DamageResult {
  const left = Math.max(0, stamina - hitPoints);
  return { stamina: left, dead: hitPoints >= stamina };
}
