import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGameStore } from '../../components/Game/useGameStore';

export default function LeaderboardScreen() {
  const { highScore } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.scoreCard}>
          <Text style={styles.rank}>#1</Text>
          <Text style={styles.playerName}>You</Text>
          <Text style={styles.score}>{highScore}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fffffe',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#242629',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  rank: {
    color: '#7f5af0',
    fontSize: 24,
    fontWeight: 'bold',
    width: 50,
  },
  playerName: {
    color: '#94a1b2',
    fontSize: 18,
    flex: 1,
  },
  score: {
    color: '#fffffe',
    fontSize: 20,
    fontWeight: 'bold',
  },
});