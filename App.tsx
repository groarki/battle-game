import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import GestureHints from './src/components/GestureHints';
import { useMoveGestures } from './src/hooks/useMoveGestures';
import { MOVE_INFO, Move } from './src/logic/moves';

export default function App() {
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const gesture = useMoveGestures(setLastMove);

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Test gestów</Text>

        <GestureDetector gesture={gesture}>
          <View style={styles.area}>
            <Text style={styles.areaText}>
              {lastMove ? `Rozpoznano: ${MOVE_INFO[lastMove].name}` : 'Wykonaj gest tutaj'}
            </Text>
          </View>
        </GestureDetector>

        <GestureHints activeMove={lastMove} />
      </View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 30,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  area: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaText: {
    fontSize: 18,
    color: '#555',
  },
});
