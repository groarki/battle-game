import { Image, StyleSheet, Text, View } from 'react-native';
import { ENEMIES, EnemyType } from '../logic/characters';
import { ENEMY_IMAGES, EnemyPose } from './enemyImages';
import StaminaBar from './StaminaBar';

type Props = {
  type: EnemyType;
  stamina: number;
  pose?: EnemyPose;
  hidden?: boolean;
};

export default function Enemy({ type, stamina, pose = 'idle', hidden = false }: Props) {
  const info = ENEMIES[type];
  const shownPose = stamina <= 0 ? 'defeated' : pose;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{hidden ? '???' : info.name}</Text>

      <Text style={styles.strength}>Siła: {hidden ? '?' : info.strength}</Text>

      <View style={[styles.bar, hidden && styles.invisible]}>
        <StaminaBar value={stamina} max={info.maxStamina} />
      </View>
      {hidden ? (
        <View style={[styles.image, styles.mystery]}>
          <Text style={styles.mysteryText}>?</Text>
        </View>
      ) : (
        <Image source={ENEMY_IMAGES[type][shownPose]} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  strength: {
    fontSize: 20,
    color: '#424242',
    marginBottom: 12
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
  },
  mystery: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  mysteryText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#bbb',
  },
  bar: {
    width: '100%',
  },
  invisible: {
    opacity: 0,
  },
});
