import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ onPress, iconName, iconSize, iconColor }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
