import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WordDisplayProps {
  word: string;
  definition: string;
  example: string;
  showDefinition: boolean;
  isCorrect: boolean | null;
}

const WordDisplay = ({ word, definition, example, showDefinition, isCorrect }: WordDisplayProps) => {
  const display = showDefinition ? word : '•'.repeat(word.length);
  return (
    <View style={styles.container}>
      <Text style={showDefinition ? styles.word : styles.dots}>{display}</Text>
      {showDefinition && (
        <View style={styles.definitionContainer}>
          <Text style={styles.definition}>{definition}</Text>
          {example && (
            <Text style={styles.example}>Example: {example}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 4,
  },
  dots: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 12,
  },
  definitionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
  definition: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  example: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
  },
});

export default WordDisplay; 