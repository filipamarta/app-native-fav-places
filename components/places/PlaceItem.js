import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

const PlaceItem = ({ place, onSelect }) => {
  const { title, imageUri, address } = place;

  return (
    <Pressable
      onPress={onSelect.bind(this, place.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.quaternary,
  },
  pressed: { opacity: 0.9 },
  image: { flex: 1, height: 100 },
  info: { flex: 2, padding: 12 },
  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: { color: Colors.secondary, fontSize: 16 },
});
