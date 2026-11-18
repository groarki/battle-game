import { StyleSheet, Text, View } from 'react-native';

type Props = {
  latest?: string;
};

export default function BattleLog({ latest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, latest !== undefined && styles.latest]}>
        {latest ?? 'Walka jeszcze się nie zaczęła.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
  latest: {
    color: '#222',
    fontWeight: 'bold',
  },
});
