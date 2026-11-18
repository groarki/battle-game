export type Move = 'thrust' | 'swing' | 'block';

export const MOVES: Move[] = ['thrust', 'swing', 'block'];

export type MoveInfo = {
  name: string;
  gesture: string;
  beats: Move;
};

export const MOVE_INFO: Record<Move, MoveInfo> = {
  thrust: { name: 'Pchnięcie', gesture: 'Przesuń w górę', beats: 'swing' },
  swing: { name: 'Zamaszysty cios', gesture: 'Przesuń w prawo', beats: 'block' },
  block: { name: 'Blok', gesture: 'Przytrzymaj', beats: 'thrust' },
};

export type ExchangeResult = 'player' | 'enemy' | 'draw';

export function resolveExchange(playerMove: Move, enemyMove: Move): ExchangeResult {
  if (playerMove === enemyMove) return 'draw';
  return MOVE_INFO[playerMove].beats === enemyMove ? 'player' : 'enemy';
}
