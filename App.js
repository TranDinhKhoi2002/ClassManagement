import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './screens/LoginScreen';
import ClassesScreen from './screens/ClassesScreen';
import ClassDetailsScreen from './screens/ClassDetailsScreen';
import {
  createClassTable,
  createStudentTable,
  createUserTable,
  getDBConnection,
} from './db/db-services';
import {screenNames} from './config/screens';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const loadData = async () => {
      const db = await getDBConnection();
      await createClassTable(db);
      await createStudentTable(db);
      await createUserTable(db);
    };

    loadData();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={screenNames.loginScreen.name}
            component={LoginScreen}
            options={{title: screenNames.loginScreen.title}}
          />
          <Stack.Screen
            name={screenNames.classesScreen.name}
            component={ClassesScreen}
            options={{title: screenNames.classesScreen.title}}
          />
          <Stack.Screen
            name={screenNames.classDetails.name}
            component={ClassDetailsScreen}
            options={{title: screenNames.classDetails.title}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
