import React from 'react';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useThemeContext } from './src/context/ThemeContext';
import SignInScreen from './src/screens/SignInScreen';

const CreamyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF5E6',
  },
};

const CreamyDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#FFF5E6', // Use same creamy color for dark mode, or change if desired
  },
};

const Main = () => {
  const { isDark } = useThemeContext();
  return (
    <PaperProvider theme={isDark ? CreamyDarkTheme : CreamyTheme}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
