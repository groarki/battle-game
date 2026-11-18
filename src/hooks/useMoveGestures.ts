import {
  Directions,
  useCompetingGestures,
  useFlingGesture,
  useLongPressGesture,
} from 'react-native-gesture-handler';
import { useEffect, useRef } from 'react';
import { Move } from '../logic/moves';

export function useMoveGestures(onMove: (move: Move) => void, enabled = true) {
  const onMoveRef = useRef(onMove);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  const swipeUp = useFlingGesture({
    direction: Directions.UP,
    enabled,
    disableReanimated: true,
    onActivate: () => onMoveRef.current('thrust'),
  });

  const swipeRight = useFlingGesture({
    direction: Directions.RIGHT,
    enabled,
    disableReanimated: true,
    onActivate: () => onMoveRef.current('swing'),
  });

  const hold = useLongPressGesture({
    minDuration: 600,
    enabled,
    disableReanimated: true,
    onActivate: () => onMoveRef.current('block'),
  });

  return useCompetingGestures(swipeUp, swipeRight, hold);
}
