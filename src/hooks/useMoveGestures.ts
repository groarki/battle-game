import {
  Directions,
  useCompetingGestures,
  useFlingGesture,
  useLongPressGesture,
} from 'react-native-gesture-handler';
import { Move } from '../logic/moves';

export function useMoveGestures(onMove: (move: Move) => void, enabled = true) {
  const swipeUp = useFlingGesture({
    direction: Directions.UP,
    enabled,
    disableReanimated: true,
    onActivate: () => onMove('thrust'),
  });

  const swipeRight = useFlingGesture({
    direction: Directions.RIGHT,
    enabled,
    disableReanimated: true,
    onActivate: () => onMove('swing'),
  });

  const hold = useLongPressGesture({
    minDuration: 600,
    enabled,
    disableReanimated: true,
    onActivate: () => onMove('block'),
  });

  return useCompetingGestures(swipeUp, swipeRight, hold);
}
