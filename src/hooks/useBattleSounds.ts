import { AudioPlayer, useAudioPlayer } from 'expo-audio';
import { useCallback } from 'react';
import { EnemyType } from '../logic/characters';

const SOUNDS = {
  goblin: require('@assets/sounds/goblin_sound.wav'),
  orc: require('@assets/sounds/orc_sound.wav'),
  troll: require('@assets/sounds/troll_sound.wav'),
  sword: require('@assets/sounds/sword_sound.wav'),
  monsterHurt: require('@assets/sounds/monster_hurt_sound.wav'),
  heroHurt: require('@assets/sounds/hero_hurt_sound.wav'),
};

function replay(player: AudioPlayer) {
  player.seekTo(0);
  player.play();
}

export function useBattleSounds() {
  const goblin = useAudioPlayer(SOUNDS.goblin);
  const orc = useAudioPlayer(SOUNDS.orc);
  const troll = useAudioPlayer(SOUNDS.troll);
  const sword = useAudioPlayer(SOUNDS.sword);
  const monsterHurt = useAudioPlayer(SOUNDS.monsterHurt);
  const heroHurt = useAudioPlayer(SOUNDS.heroHurt);

  const playEnemyAppear = useCallback(
    (type: EnemyType) => replay({ goblin, orc, troll }[type]),
    [goblin, orc, troll],
  );
  const playSword = useCallback(() => replay(sword), [sword]);
  const playMonsterHurt = useCallback(() => replay(monsterHurt), [monsterHurt]);
  const playHeroHurt = useCallback(() => replay(heroHurt), [heroHurt]);

  return { playEnemyAppear, playSword, playMonsterHurt, playHeroHurt };
}
