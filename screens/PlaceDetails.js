import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, StyleSheet, View } from 'react-native';
import OutlineButton from '../components/ui/OutlineButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetailsDB } from '../utils/database';

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.long,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceDetailsData = async () => {
      const place = await fetchPlaceDetailsDB(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };
    loadPlaceDetailsData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image source={{ uri: fetchedPlace.imageUri }} style={styles.image} />
      <Text style={styles.address}>{fetchedPlace.address}</Text>
      <View style={styles.buttonContainer}>
        <OutlineButton iconName="map" onPress={showOnMapHandler}>
          View on the Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.9 },
  image: { flex: 1, height: '35%', minHeight: 300, width: '100%' },
  address: {
    color: Colors.primary,
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
