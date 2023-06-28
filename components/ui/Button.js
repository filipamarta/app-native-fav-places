import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

const Button = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.quaternary,
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    width: '100%',
    marginTop: 30,
  },
  pressed: {
    opacity: 0.8,
  },
  text: { color: Colors.quaternary, fontSize: 20, fontWeight: 'bold' },
});
