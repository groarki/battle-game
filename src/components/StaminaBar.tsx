import { StyleSheet, Text, View } from 'react-native';

type Props = {
  value: number;
  max: number;
  color?: string;
};

export default function StaminaBar({ value, max, color = '#c0392b' }: Props) {
  const percent = max > 0 ? Math.max(0, Math.min(1, value / max)) * 100 : 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.label}>
        Wytrzymałość: {value} / {max}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 2,
  },
  track: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e3e3e3',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
  label: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
