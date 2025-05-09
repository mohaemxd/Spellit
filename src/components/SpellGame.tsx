import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Animated, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, FlatList } from 'react-native';
import Header from './Header';
import AudioButton from './AudioButton';
import WordDisplay from './WordDisplay';
import SpellInput from './SpellInput';
import { Button, FAB, useTheme } from 'react-native-paper';
import { useGameContext } from '../context/GameContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const TOTAL_QUESTIONS = 10;
const TIME_PER_WORD = 10;

const SpellGame = () => {
  const { 
    currentWord,
    score,
    isPlaying,
    isCorrect,
    showDefinition,
    playCurrentWord,
    checkAnswer,
    nextWord
  } = useGameContext();
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [resetInput, setResetInput] = useState(false);
  const { colors, dark } = useTheme();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(TIME_PER_WORD);
  const [timerColor, setTimerColor] = useState('#388e3c');
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const handleSubmitGuess = (guess: string) => {
    checkAnswer(guess);
    setTimer(TIME_PER_WORD);
  };
  
  const handlePlayCurrentWord = () => {
    playCurrentWord();
    setTimerActive(true);
  };

  const handleNextWord = () => {
    setTimer(TIME_PER_WORD);
    setTimerActive(false);
    setQuestionIndex(prev => Math.min(prev + 1, TOTAL_QUESTIONS - 1));
    nextWord();
    setResetInput(true);
    setTimeout(() => setResetInput(false), 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playCurrentWord();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!timerActive || isCorrect !== null) return;
    if (timer === 0) {
      setTimerActive(false);
      handleNextWord();
      return;
    }
    timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    if (timer > 5) setTimerColor('#388e3c');
    else if (timer > 2) setTimerColor('#fbc02d');
    else setTimerColor('#d32f2f');
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer, isCorrect, timerActive]);

  // Progress bar width
  const progress = ((questionIndex + 1) / TOTAL_QUESTIONS) * 100;

  const dummyLeaderboard = [
    { username: 'Alice', score: 9 },
    { username: 'Bob', score: 8 },
    { username: 'You', score: score },
    { username: 'Charlie', score: 7 },
    { username: 'Dana', score: 6 },
  ];

  // Show leaderboard when round ends
  useEffect(() => {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      setShowLeaderboard(true);
    }
  }, [questionIndex]);

  const handlePlayAgain = () => {
    setShowLeaderboard(false);
    setQuestionIndex(0);
    setTimer(TIME_PER_WORD);
    setTimerActive(false);
    // Optionally reset score and game state here if needed
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      
      {/* Progress Bar & Timer */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={[styles.timerText, { color: timerColor }]}>{timer.toString().padStart(2, '0')}</Text>
        <Text style={styles.scoreCounter}>{`Correct: ${score} / ${TOTAL_QUESTIONS}`}</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <View style={styles.content}>
          <WordDisplay 
            word={currentWord.word}
            definition={currentWord.definition}
            example={currentWord.example}
            showDefinition={showDefinition}
            isCorrect={isCorrect}
          />
          
          <AudioButton onPlay={handlePlayCurrentWord} isPlaying={isPlaying} />
          
          <Text style={[styles.score, { color: '#222' }]}>Score: {score}</Text>
          
          <SpellInput 
            onSubmit={handleSubmitGuess}
            disabled={isCorrect !== null}
            isCorrect={isCorrect}
            reset={resetInput}
            style={{ marginTop: 32 }}
          />
          
          {isCorrect !== null && (
            <Button 
              mode="contained"
              onPress={handleNextWord}
              style={styles.nextButton}
              labelStyle={styles.nextButtonLabel}
            >
              Next Word
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
      
      <FAB
        icon="account"
        style={[styles.fab, { backgroundColor: dark ? '#23211A' : '#FFF5E6' }]}
        onPress={() => navigation.navigate('Account')}
        accessibilityLabel="Account"
      />

      <Modal
        visible={showLeaderboard}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.leaderboardContainer}>
            <Text style={styles.leaderboardTitle}>Daily Leaderboard</Text>
            <FlatList
              data={dummyLeaderboard.sort((a, b) => b.score - a.score)}
              keyExtractor={(item, idx) => item.username + idx}
              renderItem={({ item, index }) => (
                <View style={[styles.leaderboardRow, item.username === 'You' && styles.currentUserRow]}>
                  <Text style={styles.leaderboardRank}>{index + 1}</Text>
                  <Text style={styles.leaderboardName}>{item.username}</Text>
                  <Text style={styles.leaderboardScore}>{item.score}</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6', // fallback
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 96,
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: '#000000',
  },
  nextButtonLabel: {
    color: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#fff',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  progressBarBg: {
    width: '80%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#388e3c',
    borderRadius: 4,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  scoreCounter: {
    fontSize: 16,
    color: '#222',
    marginTop: 2,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  currentUserRow: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
  leaderboardRank: {
    width: 32,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388e3c',
    textAlign: 'center',
  },
  leaderboardName: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    marginLeft: 8,
  },
  leaderboardScore: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'right',
  },
  playAgainButton: {
    marginTop: 20,
    backgroundColor: '#388e3c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  playAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpellGame; 