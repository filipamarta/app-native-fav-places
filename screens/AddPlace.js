import React from 'react';
import PlaceForm from '../components/places/PlaceForm';
import { addPlaceDB } from '../utils/database';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await addPlaceDB(place);
    navigation.navigate('AllPlaces');
  };

  return <PlaceForm onAddPlace={createPlaceHandler} />;
};

export default AddPlace;
