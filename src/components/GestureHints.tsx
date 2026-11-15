import { StyleSheet, Text, View } from 'react-native';
import { MOVE_INFO, MOVES, Move } from '../logic/moves';

type Props = {
  activeMove?: Move | null;
};

export default function GestureHints({ activeMove = null }: Props) {
  return (
    <View style={styles.row}>
      {MOVES.map((move) => {
        const info = MOVE_INFO[move];
        const active = move === activeMove;
        return (
          <View key={move} style={[styles.card, active && styles.cardActive]}>
            <Text style={styles.icon}>{info.icon}</Text>
            <Text style={styles.name}>{info.name}</Text>
            <Text style={styles.gesture}>{info.gesture}</Text>
            <Text style={styles.beats}>pokonuje: {MOVE_INFO[info.beats].name}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f6f6f6',
  },
  cardActive: {
    borderColor: '#d9822b',
    backgroundColor: '#fdebd3',
  },
  icon: {
    fontSize: 32,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  gesture: {
    fontSize: 12,
    textAlign: 'center',
    color: '#444',
  },
  beats: {
    fontSize: 11,
    textAlign: 'center',
    color: '#888',
    marginTop: 4,
  },
});
