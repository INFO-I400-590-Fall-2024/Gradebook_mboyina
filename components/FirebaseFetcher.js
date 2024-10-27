import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

export default function FirebaseFetcher() {
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentData = [];
      querySnapshot.forEach((doc) => {
        studentData.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={fetchData} />
      {students.length > 0 ? (
        students.map((student) => (
          <View key={student.id} style={styles.studentContainer}>
            <Text style={styles.nameText}>Name: {student.name}</Text>
            <Text style={styles.ageText}>Age: {student.age}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No students found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  studentContainer: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ageText: {
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});
