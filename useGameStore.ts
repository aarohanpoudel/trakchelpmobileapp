import { create } from 'zustand';

interface GameState {
  score: number;
  highScore: number;
  isGameOver: boolean;
  isPaused: boolean;
  incrementScore: () => void;
  resetGame: () => void;
  gameOver: () => void;
  togglePause: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  highScore: 0,
  isGameOver: false,
  isPaused: false,
  incrementScore: () =>
    set((state) => ({
      score: state.score + 1,
      highScore: Math.max(state.score + 1, state.highScore),
    })),
  resetGame: () =>
    set((state) => ({
      score: 0,
      isGameOver: false,
      isPaused: false,
    })),
  gameOver: () =>
    set((state) => ({
      isGameOver: true,
    })),
  togglePause: () =>
    set((state) => ({
      isPaused: !state.isPaused,
    })),
}));