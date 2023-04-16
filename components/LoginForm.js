/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {checkUserExists, getDBConnection} from '../db/db-services';
import {screenNames} from '../config/screens';
import {useNavigation} from '@react-navigation/native';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    const db = await getDBConnection();
    const isValidUser = await checkUserExists(db, {username, password});
    if (isValidUser) {
      navigation.navigate(screenNames.classesScreen.name);
    } else {
      Alert.alert('Login failed', 'Username or password is incorrect', [
        {text: 'Ok', style: 'cancel'},
      ]);
    }
  };

  const handleUsernameChange = enteredText => {
    setUsername(enteredText);
  };

  const handlePasswordChange = enteredText => {
    setPassword(enteredText);
  };

  return (
    <>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Username</Text>
        <TextInput
          value={username}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleUsernameChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          value={password}
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={handlePasswordChange}
        />
      </View>

      <View style={styles.buttonOuterContainer}>
        <Pressable
          style={({pressed}) =>
            pressed
              ? [styles.buttonInnerContainer, styles.pressed]
              : styles.buttonInnerContainer
          }
          android_ripple={{color: '#9089e7'}}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'black',
  },
  textLabel: {
    fontSize: 20,
    marginBottom: 12,
    color: 'black',
  },
  textInput: {
    height: 44,
    fontSize: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: '#eceaea',
    borderRadius: 4,
  },
  inputContainer: {
    marginVertical: 12,
    width: '100%',
  },
  result: {
    fontSize: 28,
    marginVertical: 20,
  },
  buttonOuterContainer: {
    alignSelf: 'stretch',
  },
  buttonInnerContainer: {
    backgroundColor: '#675ce4',
    elevation: 3,
    marginTop: 20,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 30,
    color: 'white',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default LoginForm;
