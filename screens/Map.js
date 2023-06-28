import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, View } from 'react-native';
import IconButton from '../components/ui/IconButton';

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    long: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const defaultRegion = {
    latitude: initialLocation ? initialLocation.lat : 38.7223,
    longitude: initialLocation ? initialLocation.long : -9.1393,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, long: long });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'you have to pick a location on the map first'
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLocationLat: selectedLocation.lat,
      pickedLocationLong: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconColor={tintColor}
          iconName="save"
          iconSize={28}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Picked location"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.long,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
