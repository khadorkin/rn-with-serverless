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
    // TODO: use WebView for SSO interactions
    // logout from keycloak
    let redirectUrl = AuthSession.getRedirectUrl();
    Linking.openURL(
      `${process.env.OAUTH_URL}/auth/realms/${process.env.OAUTH_REALM}/protocol/openid-connect/logout` +
      `?redirect_uri=${encodeURIComponent(redirectUrl)}`
    );

    // delete secure store auth data
    await SecureStore.deleteItemAsync('auth');

    this.props.navigation.navigate('Auth');
  };
};