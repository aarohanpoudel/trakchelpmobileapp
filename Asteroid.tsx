import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface AsteroidProps {
  position: { x: number; y: number };
  size: number;
}

export function Asteroid({ position, size }: AsteroidProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(position.x, { duration: 2000 }) },
      { translateY: withTiming(position.y, { duration: 2000 }) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: '#ff8906',
          borderRadius: size / 2,
          position: 'absolute',
        },
        animatedStyle,
      ]}
    />
  );
}