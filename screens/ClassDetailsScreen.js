/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {getDBConnection, getStudents} from '../db/db-services';
import ClassItem from '../components/ClassItem';
import {ListItem, Card, Avatar} from 'react-native-elements';

function ClassDetailsScreen({route}) {
  const [students, setStudents] = useState([]);

  const classItem = route.params.classItem;

  useEffect(() => {
    const getStudentList = async () => {
      const db = await getDBConnection();
      const existingStudents = await getStudents(db, classItem.id);
      if (existingStudents) {
        setStudents(existingStudents);
      }
    };

    getStudentList();
  }, [classItem.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classe Details</Text>
      <Text style={styles.subTitle}>Class Information</Text>
      <ClassItem item={classItem} />

      <Text style={[styles.subTitle, {marginTop: 30}]}>Student List</Text>
      <FlatList
        data={students}
        keyExtractor={item => item.name}
        style={styles.listContainer}
        renderItem={({item}) => (
          <Card containerStyle={styles.card}>
            <ListItem>
              <Avatar
                rounded
                source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
                size="large"
              />
              <ListItem.Content>
                <Text style={styles.studentDetail}>Id: {item.id}</Text>
                <Text style={styles.studentDetail}>Name: {item.name}</Text>
                <Text style={styles.studentDetail}>
                  Dob: {new Date(item.birthdate).toLocaleDateString()}
                </Text>
              </ListItem.Content>
            </ListItem>
          </Card>
        )}
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
  subTitle: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {width: '100%'},
  studentDetail: {
    fontSize: 16,
    color: 'black',
  },
  card: {
    borderRadius: 8,
    padding: 4,
  },
});

export default ClassDetailsScreen;
