/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Platform, Pressable, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../config/screens';
import {getDBConnection, getStudents} from '../db/db-services';

function ClassItem({item, order}) {
  const navigation = useNavigation();
  const [students, setStudents] = useState();

  useEffect(() => {
    const getStudentsInClass = async () => {
      try {
        const db = await getDBConnection();
        const classStudents = await getStudents(db, item.id);
        setStudents(classStudents);
      } catch (error) {
        Alert.alert('Something went wrong', 'Failed to load students', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }
    };

    getStudentsInClass();
  }, [item.id]);

  const handlePress = () => {
    navigation.navigate(screenNames.classDetails.name, {
      classItem: item,
      students,
      order,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{color: '#ccc'}}
        style={styles.innerContainer}
        onPress={handlePress}>
        <Text style={styles.classDetail}>Id: {item.id}</Text>
        <Text style={styles.classDetail}>Name: {item.name}</Text>
        <Text style={styles.classDetail}>Students: {students?.length}</Text>
        <Text style={styles.order}>#{order}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  classDetail: {
    fontSize: 20,
    color: 'black',
    marginVertical: 4,
  },
  container: {
    margin: 10,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    alignSelf: 'stretch',
    position: 'relative',
  },
  innerContainer: {
    padding: 14,
  },
  order: {
    position: 'absolute',
    top: 14,
    right: 14,
    fontSize: 18,
  },
});

export default ClassItem;
