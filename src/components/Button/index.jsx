import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#141496',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 40,
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
