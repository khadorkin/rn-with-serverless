import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33337E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    color: 'rgba(255, 255, 255, .95)'
  }
});
