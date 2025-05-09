import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Switch, useTheme } from 'react-native-paper';
import { useGameContext } from '../context/GameContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';

const Account = () => {
  const { score } = useGameContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDark, setIsDark } = useThemeContext();
  const { colors } = useTheme();
  const [reminders, setReminders] = React.useState(false);

  // Static streak demo
  const streak = 2;
  const days = ['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We'];
  const activeDays = [0, 1]; // Th, Fr

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: '#222' }]}>Account</Text>
      </View>

      {/* Streak Section */}
      <View style={[styles.streakCard, { backgroundColor: colors.elevation?.level1 || colors.surface }]}>
        <View style={styles.streakRow}>
          <MaterialCommunityIcons name="fire" size={32} color="#FF7043" />
          <Text style={[styles.streakNumber, { color: '#FF7043' }]}>{streak}</Text>
        </View>
        <View style={styles.daysRow}>
          {days.map((d, i) => (
            <View
              key={d}
              style={[styles.dayCircle, activeDays.includes(i) && { backgroundColor: '#FF7043' }]}
            >
              <Text style={[styles.dayText, { color: colors.onBackground }, activeDays.includes(i) && { color: '#fff' }]}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Section */}
      <Text style={[styles.sectionTitle, { color: '#222' }]}>SETTINGS</Text>
      <View style={[styles.settingsCard, { backgroundColor: colors.elevation?.level1 || colors.surface }]}>
        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('GeneralSettings')}>
          <MaterialIcons name="person-outline" size={24} color={colors.onSurface} />
          <Text style={[styles.settingLabel, { color: colors.onSurface }]}>General</Text>
        </TouchableOpacity>
        <View style={styles.settingRow}>
          <MaterialIcons name="brightness-6" size={24} color={colors.onSurface} />
          <Text style={[styles.settingLabel, { color: colors.onSurface }]}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={setIsDark} />
        </View>
        <View style={styles.settingRow}>
          <MaterialIcons name="notifications-none" size={24} color={colors.onSurface} />
          <Text style={[styles.settingLabel, { color: colors.onSurface }]}>Reminders</Text>
          <Switch value={reminders} onValueChange={setReminders} />
        </View>
        <View style={styles.settingRow}>
          <MaterialIcons name="record-voice-over" size={24} color={colors.onSurface} />
          <Text style={[styles.settingLabel, { color: colors.onSurface }]}>Voices</Text>
          <Text style={[styles.settingValue, { color: colors.onSurface }]}>Default</Text>
        </View>
      </View>

      {/* Stats Section */}
      <Text style={[styles.sectionTitle, { color: '#222' }]}>STATS</Text>
      <View style={[styles.statsCard, { backgroundColor: colors.elevation?.level1 || colors.surface }]}>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: colors.onSurface }]}>Total Score</Text>
          <Text style={[styles.statValue, { color: colors.onSurface }]}>{score}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: colors.onSurface }]}>Best Streak</Text>
          <Text style={[styles.statValue, { color: colors.onSurface }]}>2</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#FFF5E6',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#FF7043',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  dayActive: {
    backgroundColor: '#FF7043',
  },
  dayText: {
    color: '#6B7280',
    fontWeight: 'bold',
  },
  dayTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 1,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#222',
  },
  settingValue: {
    color: '#6B7280',
    fontSize: 15,
    marginRight: 8,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#222',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
});

export default Account; 