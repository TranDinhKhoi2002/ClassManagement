/* eslint-disable prettier/prettier */
import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

const classTableName = 'CLASS';
const studentTableName = 'STUDENT';
const userTableName = 'USER';

enablePromise(true);

export const getDBConnection = async () => {
  return await openDatabase({
    name: 'MainDB.db',
    location: 'default',
    createFromLocation: 2,
  });
};

export const createClassTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS ${classTableName}(id text primary key not null, name text);`;

  await db.executeSql(query);
};

export const createStudentTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS ${studentTableName}(id TEXT PRIMARY KEY NOT NULL, name TEXT, birthdate TEXT, class_id TEXT, FOREIGN KEY(class_id) REFERENCES ${classTableName}(id))`;
  await db.executeSql(query);
};

export const createUserTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS ${userTableName}(username TEXT PRIMARY KEY NOT NULL, password text);`;

  await db.executeSql(query);
};

export const saveClasses = async (db, classItems) => {
  const insertClassQuery =
    `INSERT OR REPLACE INTO ${classTableName}(id, name) values` +
    classItems.map(i => `('${i.id}', '${i.name}')`).join(',');

  return db.executeSql(insertClassQuery);
};

export const saveStudents = async (db, classId, students) => {
  const insertStudentQuery =
    `INSERT OR REPLACE INTO ${studentTableName}(id, name, birthdate, class_id) values` +
    students
      .map(i => `('${i.id}', '${i.name}', '${i.birthdate}', '${classId}')`)
      .join(',');

  return db.executeSql(insertStudentQuery);
};

export const saveUser = async (db, user) => {
  const insertUserQuery =
    `INSERT OR REPLACE INTO ${userTableName}(username, password) values` +
    `('${user.username}', '${user.password}')`;

  return db.executeSql(insertUserQuery);
};

export const getClasses = async db => {
  const classes = [];
  const results = await db.executeSql(`SELECT id,name FROM ${classTableName}`);

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      classes.push(result.rows.item(index));
    }
  });

  return classes;
};

export const getStudents = async (db, classId) => {
  const students = [];
  const results = await db.executeSql(
    `SELECT id, name, birthdate FROM ${studentTableName} WHERE class_id='${classId}'`,
  );

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      students.push(result.rows.item(index));
    }
  });

  return students;
};

export const checkUserExists = async (db, user) => {
  const results = await db.executeSql(
    `SELECT username, password FROM ${userTableName}`,
  );

  let isValidUser = false;

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      const {username, password} = result.rows.item(index);
      console.log(password, user.password);
      if (username === user.username && password === user.password) {
        isValidUser = true;
        break;
      }
    }
  });

  return isValidUser;
};
