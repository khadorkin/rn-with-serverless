import React from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {
  SecureStore
} from 'expo';

import { styles } from '../../components/DesignSystem';

export default class AuthLoading extends React.Component {

    async componentDidMount () {
      // TODO: stop animation
      this._askCredentials()
    }
    
    componentWillUnmount () {
      // TODO: reset animation
    }

    _getCredentials = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          return true;
        }
      } catch (token) {
        console.log('Secure store couldn\'t be accessed!', error);
      }
      return false;
    }

    _askCredentials = async () => {
      const token = await this._getCredentials()
      if (token) {
        this.props.navigation.navigate('App')
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('Auth')
        }, 3000)
      }
    }
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  };