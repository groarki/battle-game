import { StyleSheet, Text, View } from 'react-native';
import { CharacterStats } from '../logic/characters';
import StaminaBar from './StaminaBar';

type Props = {
  stats: CharacterStats;
  stamina: number;
};

export default function Player({ stats, stamina }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{stats.name}</Text>
        <Text style={styles.info}>Siła: {stats.strength}</Text>
      </View>
      <StaminaBar value={stamina} max={stats.maxStamina} color="#27ae60" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 4,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 20,
    color: '#666',
  },
});
