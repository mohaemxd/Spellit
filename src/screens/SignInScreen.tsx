import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native-paper';
import GoogleLogo from '../../assets/google-icon-logo.svg';
import * as AuthSession from 'expo-auth-session';

console.log('Expo Auth Redirect URI:', AuthSession.makeRedirectUri());


const GOOGLE_CLIENT_ID_WEB = '442822319233-5ob1no9pp2a5gljm8ijh8idoe1p0mbtv.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID_IOS = '442822319233-qelv0au3vmrvc699p80c1fftcoemi99v.apps.googleusercontent.com';
// const GOOGLE_CLIENT_ID_ANDROID = 'YOUR_ANDROID_CLIENT_ID_HERE'; // Add if you have one

console.log('Expo Auth Redirect URI:', AuthSession.makeRedirectUri());

export default function SignInScreen({ onSignIn }: { onSignIn: (user: any) => void }) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: GOOGLE_CLIENT_ID_WEB,
        iosClientId: GOOGLE_CLIENT_ID_IOS,
        scopes: ['profile', 'email'],
        useProxy: true,
      } as any);

  useEffect(() => {
    const getUserInfo = async () => {
      if (response?.type === 'success' && response.authentication?.accessToken) {
        const userInfoRes = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
        });
        const user = await userInfoRes.json();
        onSignIn(user);
      }
    };
    getUserInfo();
  }, [response]);

  return (
    <View style={styles.creamyBg}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Spell-It</Text>
        <Text style={styles.subtitle}>Sharpen your spelling skills and compete with others!</Text>
        <Button
          mode="contained"
          onPress={() => promptAsync()}
          disabled={!request}
          style={styles.googleButton}
          labelStyle={styles.googleButtonLabel}
          icon={() => (
            <View style={{ marginRight: 10 }}>
              <GoogleLogo width={24} height={24} />
            </View>
          )}
        >
          Sign in with Google
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  creamyBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#388e3c',
    marginBottom: 24,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    width: '100%',
    justifyContent: 'center',
    elevation: 2,
  },
  googleButtonLabel: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
}); 