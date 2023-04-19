/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {getDBConnection, saveUser} from '../db/db-services';
import LoginForm from '../components/LoginForm';
import {initUser} from '../data';

function LoginScreen({navigation}) {
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const db = await getDBConnection();
        await saveUser(db, initUser);
      } catch (error) {
        Alert.alert('Something went wrong', 'Failed to initialize user', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }
    };

    initializeUser();
  }, []);

  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
