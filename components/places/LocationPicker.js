import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import OutlineButton from '../ui/OutlineButton';
import { Colors } from '../../constants/colors';
import { getGoogleMapAddress, getGoogleMapPreview } from '../../utils/location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

const LocationPicker = ({ onLocation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { params } = useRoute();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufissient permissions',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }
    return true;
  };

  const locationUserHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    let locationPermissionResult = await requestForegroundPermissionsAsync();

    if (locationPermissionResult.status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // gives latitude and longitude
    let pickedLocation = await getCurrentPositionAsync({});
    setLocation({
      latitude: pickedLocation.coords.latitude,
      longitude: pickedLocation.coords.longitude,
    });
  };

  const locationMapHandler = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    if (isFocused && params) {
      const mapPickedLocation = {
        lat: params.pickedLocationLat,
        lng: params.pickedLocationLong,
      };
      setLocation({
        latitude: mapPickedLocation.lat,
        longitude: mapPickedLocation.lng,
      });
    }
  }, [params, isFocused]);

  useEffect(() => {
    const handleGeoLocationAddress = async () => {
      if (location) {
        //translate lat and lng into a readable address
        const address = await getGoogleMapAddress({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        //update location data to the submit on PlaceForm
        onLocation({ ...location, address: address });
      }
    };
    handleGeoLocationAddress();
  }, [location, onLocation]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location ? (
          <Image
            source={{
              uri: getGoogleMapPreview({
                latitude: location.latitude,
                longitude: location.longitude,
              }),
            }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.locationFallbackText}>
            {errorMsg ? errorMsg : ' No location picked yet'}
          </Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <OutlineButton iconName="location-sharp" onPress={locationUserHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton iconName="map-sharp" onPress={locationMapHandler}>
          Pick Location
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    marginVertical: 8,
    backgroundColor: Colors.quaternary,
    marginTop: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  locationFallbackText: {
    color: Colors.secondary,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
});
