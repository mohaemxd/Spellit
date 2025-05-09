import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const GeneralSettings = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { backgroundColor: colors.background }]}> 
        <Text style={[styles.headerTitle, { color: '#222' }]}>General</Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>ACCOUNT</Text>
      <View style={[styles.card, { backgroundColor: colors.elevation?.level1 || colors.surface }]}> 
        <View style={styles.row}>
          <MaterialIcons name="person-outline" size={24} color={colors.onSurface} />
          <Text style={[styles.label, { color: colors.onSurface }]}>Sign in to your account</Text>
          <Button mode="contained" onPress={() => {}} style={styles.signInBtn}>Sign In</Button>
        </View>
      </View>

      {/* Follow Us Section */}
      <Text style={styles.sectionTitle}>FOLLOW US</Text>
      <View style={[styles.card, { backgroundColor: colors.elevation?.level1 || colors.surface }]}> 
        <TouchableOpacity style={styles.socialRowVertical} onPress={() => Linking.openURL('https://twitter.com/')}> 
          <FontAwesome name="twitter" size={24} color="#222" style={styles.socialIconVertical} />
          <Text style={[styles.socialLabel, { color: colors.onSurface }]}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialRowVertical} onPress={() => Linking.openURL('https://instagram.com/')}> 
          <FontAwesome name="instagram" size={24} color="#222" style={styles.socialIconVertical} />
          <Text style={[styles.socialLabel, { color: colors.onSurface }]}>Instagram</Text>
        </TouchableOpacity>
      </View>

      {/* Help Section */}
      <Text style={styles.sectionTitle}>HELP</Text>
      <View style={[styles.card, { backgroundColor: colors.elevation?.level1 || colors.surface }]}> 
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <MaterialIcons name="help-outline" size={24} color={colors.onSurface} />
          <Text style={[styles.label, { color: colors.onSurface }]}>Get Support</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  label: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#222',
  },
  signInBtn: {
    marginLeft: 8,
  },
  socialRowVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  socialIconVertical: {
    marginRight: 16,
  },
  socialLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GeneralSettings; 