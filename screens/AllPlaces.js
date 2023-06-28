import React, { useEffect, useState } from 'react';
import PlacesList from '../components/places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';

const AllPlaces = () => {
  const [placesList, setPlacesList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setPlacesList(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={placesList} />;
};

export default AllPlaces;
