import React from 'react';
import {
  View,
  Button,
  Linking
} from 'react-native';
import {
  AuthSession,
  SecureStore
} from 'expo';

import { styles } from '../../components/DesignSystem';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOut} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOut = async () => {
    // retrieve authorization info from secure storage
    const auth = await SecureStore.getItemAsync('auth');

    // logout from keycloak
    let redirectUrl = AuthSession.getRedirectUrl();
    
    // TODO: use WebView for SSO interactions
    Linking.openURL(
      `http://192.168.1.3:32089/auth/realms/justice-league/protocol/openid-connect/logout` +
      `?redirect_uri=${encodeURIComponent(redirectUrl)}`
    );

    // delete secure store data
    await SecureStore.deleteItemAsync('auth');

    this.props.navigation.navigate('Auth');
  };
};