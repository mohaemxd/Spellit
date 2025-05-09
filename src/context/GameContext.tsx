import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { fetchRandomWord } from '../services/openrouter';

interface Word {
  word: string;
  definition: string;
  example: string;
}

interface GameContextType {
  currentWord: Word;
  score: number;
  isPlaying: boolean;
  isCorrect: boolean | null;
  showDefinition: boolean;
  playCurrentWord: () => void;
  checkAnswer: (guess: string) => void;
  nextWord: () => void;
  loading: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch the first word on mount
  useEffect(() => {
    const getWord = async () => {
      setLoading(true);
      try {
        const word = await fetchRandomWord();
        setCurrentWord(word);
      } catch (e) {
        setCurrentWord({ word: 'error', definition: 'Could not fetch word.', example: '' });
      }
      setLoading(false);
    };
    getWord();
  }, []);

  const playCurrentWord = () => {
    if (!currentWord) return;
    setIsPlaying(true);
    Speech.speak(currentWord.word, {
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const checkAnswer = (guess: string) => {
    if (!currentWord) return;
    const correct = guess.toLowerCase() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setShowDefinition(true);
  };

  const nextWord = async () => {
    setLoading(true);
    setIsCorrect(null);
    setShowDefinition(false);
    try {
      const word = await fetchRandomWord();
      setCurrentWord(word);
    } catch (e) {
      setCurrentWord({ word: 'error', definition: 'Could not fetch word.', example: '' });
    }
    setLoading(false);
  };

  return (
    <GameContext.Provider
      value={{
        currentWord: currentWord || { word: '', definition: '', example: '' },
        score,
        isPlaying,
        isCorrect,
        showDefinition,
        playCurrentWord,
        checkAnswer,
        nextWord,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}; 