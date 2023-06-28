import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/place';

const PlaceForm = ({ onAddPlace }) => {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState();

  const changeTitleHandler = (titleInput) => {
    setTitle(titleInput);
  };

  const imageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };
  const locationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const submitPlaceHandler = () => {
    const placeData = new Place(title, selectedImage, selectedLocation);
    onAddPlace(placeData);
    setTitle('');
    setSelectedImage('');
    setSelectedLocation('');
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={title}
          style={styles.input}
        />
      </View>
      <ImagePicker onImage={imageHandler} />
      <LocationPicker onLocation={locationHandler} />
      <Button onPress={submitPlaceHandler}>Add place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 24,
    marginBottom: 80,
    marginHorizontal: 16,
  },
  input: {
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
    color: Colors.terciary,
  },
});
