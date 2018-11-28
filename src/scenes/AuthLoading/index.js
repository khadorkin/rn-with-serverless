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
      this._askCredentials();
    }
    
    componentWillUnmount () {
      // TODO: reset animation
    }

    _getUserStatus = async () => {
      try {
        const auth = await SecureStore.getItemAsync('auth');
        if (auth) {
          return true;
        }
      } catch (error) {
        console.log('Secure store couldn\'t be accessed!', error);
      }
      return false;
    }

    _askCredentials = async () => {
      const ok = await this._getUserStatus();
      if (ok) {
        this.props.navigation.navigate('App');
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('Auth');
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