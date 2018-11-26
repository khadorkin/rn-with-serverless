import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';

import { styles } from '../../components/DesignSystem';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
};