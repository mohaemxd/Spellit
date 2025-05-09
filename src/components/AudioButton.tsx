import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

interface AudioButtonProps {
  onPlay: () => void;
  isPlaying: boolean;
}

const AudioButton = ({ onPlay, isPlaying }: AudioButtonProps) => {
  const { dark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPlay}
      style={[styles.button, { backgroundColor: dark ? '#23211A' : '#FFF5E6' }]}
      disabled={isPlaying}
    >
      <MaterialCommunityIcons
        name={isPlaying ? 'volume-high' : 'volume-high'}
        size={32}
        color={dark ? '#fff' : '#000'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default AudioButton; 