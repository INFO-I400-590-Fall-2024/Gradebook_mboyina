// app/screens/AddStudentForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

export default function AddStudentForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Define the addStudent function to add data to Firestore
  const addStudent = async (studentData) => {
    try {
      const docRef = await addDoc(collection(db, 'students'), studentData);
      console.log('Student added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleAddStudent = () => {
    const studentData = {
      name,
      age: parseInt(age),
    };
    addStudent(studentData); // Call addStudent with the student data
    setName('');
    setAge('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Student</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
