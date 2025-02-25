import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Spaceship } from '../../components/Game/Spaceship';
import { Asteroid } from '../../components/Game/Asteroid';
import { useGameStore } from '../../components/Game/useGameStore';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const { score, highScore, isGameOver, isPaused, incrementScore, resetGame, gameOver, togglePause } = useGameStore();
  const [asteroids, setAsteroids] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  
  const position = useSharedValue({ x: width / 2, y: height - 100 });

  const pan = Gesture.Pan()
    .onChange((event) => {
      position.value = {
        x: Math.max(0, Math.min(width - 40, position.value.x + event.changeX)),
        y: Math.max(0, Math.min(height - 40, position.value.y + event.changeY)),
      };
    });

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const asteroidInterval = setInterval(() => {
      setAsteroids((current) => {
        const newAsteroids = current
          .filter((asteroid) => asteroid.y < height)
          .map((asteroid) => ({
            ...asteroid,
            y: asteroid.y + 5,
          }));

        const shouldAddNew = Math.random() > 0.7;
        if (shouldAddNew) {
          newAsteroids.push({
            id: Date.now(),
            x: Math.random() * (width - 30),
            y: -30,
            size: Math.random() * 20 + 20,
          });
        }

        return newAsteroids;
      });

      runOnJS(incrementScore)();
    }, 50);

    return () => clearInterval(asteroidInterval);
  }, [isGameOver, isPaused]);

  useEffect(() => {
    if (isGameOver) return;

    const checkCollision = () => {
      asteroids.forEach((asteroid) => {
        const dx = asteroid.x - position.value.x;
        const dy = asteroid.y - position.value.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (asteroid.size + 40) / 2) {
          gameOver();
        }
      });
    };

    const collisionInterval = setInterval(checkCollision, 16);
    return () => clearInterval(collisionInterval);
  }, [asteroids, isGameOver]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.highScore}>High Score: {highScore}</Text>
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View style={styles.gameArea}>
          <Spaceship position={position} />
          {asteroids.map((asteroid) => (
            <Asteroid
              key={asteroid.id}
              position={{ x: asteroid.x, y: asteroid.y }}
              size={asteroid.size}
            />
          ))}
        </Animated.View>
      </GestureDetector>

      {(isGameOver || isPaused) && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {isGameOver ? 'Game Over!' : 'Paused'}
          </Text>
          <Pressable style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>
              {isGameOver ? 'Play Again' : 'Resume'}
            </Text>
          </Pressable>
        </View>
      )}

      <Pressable style={styles.pauseButton} onPress={togglePause}>
        <Ionicons
          name={isPaused ? 'play' : 'pause'}
          size={24}
          color="#fff"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  score: {
    color: '#94a1b2',
    fontSize: 20,
    fontWeight: 'bold',
  },
  highScore: {
    color: '#94a1b2',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fffffe',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7f5af0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fffffe',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pauseButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: '#7f5af0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});