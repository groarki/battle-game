import { Button, StyleSheet, Text, View } from 'react-native';

export type Outcome = 'victory' | 'defeat';

type Props = {
  outcome: Outcome;
  onRestart: () => void;
};

export default function ResultBanner({ outcome, onRestart }: Props) {
  const victory = outcome === 'victory';

  return (
    <View style={[styles.container, victory ? styles.victory : styles.defeat]}>
      <Text style={styles.title}>{victory ? 'Zwycięstwo!' : 'Porażka…'}</Text>
      <Button title="Nowa gra" onPress={onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  victory: {
    backgroundColor: '#d5f5e3',
  },
  defeat: {
    backgroundColor: '#f9d6d5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
