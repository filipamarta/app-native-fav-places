import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, Text } from 'react-native';
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlineButton from '../ui/OutlineButton';

const ImagePicker = () => {
  const [image, setImage] = useState(null);
  const [status, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (status.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (status.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufissient permissions',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    // No permissions request is necessary for launching the image library
    let imageResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!imageResult.canceled) {
      setImage(imageResult.assets[0].uri);
    }
  };

  const deleteImageHandler = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View></View>

      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Text style={styles.imageFallbackText}>No image taken yet</Text>
        )}
      </View>
      <OutlineButton
        onPress={pickImage}
        iconName="camera-reverse"
        iconSize={30}
        iconColor={Colors.secondary}
      >
        {image ? 'Update' : 'Take'} image
      </OutlineButton>
      {image && (
        <OutlineButton
          onPress={deleteImageHandler}
          iconName="ios-remove-circle-outline"
          iconSize={30}
          iconColor={Colors.secondary}
        >
          Delete Image
        </OutlineButton>
      )}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    marginVertical: 8,
    backgroundColor: Colors.quaternary,
    marginTop: 10,
    borderRadius: 6,
  },
  imageFallbackText: {
    color: Colors.secondary,
  },
});
