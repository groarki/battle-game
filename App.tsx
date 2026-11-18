import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Battle from './src/components/Battle';
import { GameState, createNewGame } from './src/logic/gameState';
import { loadGame } from './src/storage/gameStorage';

export default function App() {
  const [initialGame, setInitialGame] = useState<GameState | null>(null);

  useEffect(() => {
    loadGame().then((saved) => setInitialGame(saved ?? createNewGame()));
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
          {initialGame ? (
            <Battle initial={initialGame} />
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </SafeAreaView>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
