/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ClassItem from '../components/ClassItem';
import {
  getClasses,
  getDBConnection,
  saveClasses,
  saveStudents,
} from '../db/db-services';

const initClasses = [
  {
    id: 'C001',
    name: 'Class 001',
  },
];

const initStudents = [
  {
    id: 'S001',
    name: 'Jim Rohn',
    birthdate: new Date(),
  },
  {
    id: 'S002',
    name: 'Jack King',
    birthdate: new Date(),
  },
  {
    id: 'S003',
    name: 'Ketty Myth',
    birthdate: new Date(),
  },
];

function ClassesScreen() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const db = await getDBConnection();

      const existingClasses = await getClasses(db);
      if (existingClasses.length > 0) {
        setClasses(existingClasses);
      } else {
        await saveClasses(db, initClasses);
        setClasses(initClasses);
      }

      for (const classItem of initClasses) {
        await saveStudents(db, classItem.id, initStudents);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classes</Text>
      <FlatList
        data={classes}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ClassItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
    color: 'black',
  },
  listContainer: {
    width: '100%',
  },
});

export default ClassesScreen;
