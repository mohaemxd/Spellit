import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';

interface SpellInputProps {
  onSubmit: (guess: string) => void;
  disabled: boolean;
  isCorrect: boolean | null;
  reset: boolean;
  style?: object;
}

const SpellInput = ({ onSubmit, disabled, isCorrect, reset, style }: SpellInputProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (reset) {
      setValue('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [reset]);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim().toLowerCase());
    }
  };

  const getBorderColor = () => {
    if (isCorrect === null) return '#D1D5DB';
    return isCorrect ? '#22C55E' : '#EF4444';
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={setValue}
          placeholder="Spell the word here..."
          editable={!disabled}
          style={[
            styles.input,
            { borderColor: getBorderColor() }
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={disabled || !value.trim()}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Check
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 32,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 18,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  button: {
    backgroundColor: '#000000',
    height: 56,
    justifyContent: 'center',
    borderRadius: 32,
    marginLeft: 4,
  },
  buttonLabel: {
    color: '#FFFFFF',
  },
});

export default SpellInput; 