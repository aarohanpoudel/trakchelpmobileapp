import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface SpaceshipProps {
  position: Animated.SharedValue<{ x: number; y: number }>;
}

export function Spaceship({ position }: SpaceshipProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(position.value.x) },
      { translateY: withSpring(position.value.y) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 40,
          height: 40,
          position: 'absolute',
        },
        animatedStyle,
      ]}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#7f5af0',
          borderRadius: 20,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
    </Animated.View>
  );
}