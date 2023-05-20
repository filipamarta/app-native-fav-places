import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';

const PlaceForm = () => {
  const [title, setTitle] = useState('');

  const onChangeTitleHandler = (titleInput) => {
    setTitle(titleInput);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          onChangeText={onChangeTitleHandler}
          value={title}
          style={styles.input}
        />
      </View>
      <ImagePicker />
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 24,
  },
  input: {
    marginRight: 16,
    marginLeft: 16,
    marginTop: 8,
    padding: 10,
    fontSize: 16,
    color: Colors.secondary,
    backgroundColor: Colors.quaternary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    marginRight: 16,
    marginLeft: 16,
    color: Colors.terciary,
  },
});
