import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const OutlineButton = ({
  children,
  onPress,
  iconName,
  iconSize,
  iconColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 6,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.secondary,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
  icon: { marginRight: 4 },
  text: { color: Colors.secondary, fontSize: 18 },
});
