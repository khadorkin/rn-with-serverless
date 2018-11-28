import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import {
  AuthSession,
  SecureStore
} from 'expo';

import { styles } from '../../components/DesignSystem';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
    errorCode: null,
  };

  render() {
    const { errorCode } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Login with Keycloak" onPress={this._signInAsync} />
        {errorCode ? (
          <Text>{errorCode}</Text>
        ) : null}
      </View>
    );
  }

  _signInAsync = async () => {
    // retrieve token from oauth server
    let redirectUrl = AuthSession.getRedirectUrl();
    let auth = await AuthSession.startAsync({
      authUrl:
        `${process.env.OAUTH_URL}/auth/realms/${process.env.OAUTH_REALM}/protocol/openid-connect/auth?response_type=token` +
        `&client_id=${process.env.OAUTH_CLIENT_ID}` +
        `&client_secret=${process.env.OAUTH_CLIENT_SECRET}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    const { type, errorCode = 'You cancel or dismissed the login' } = auth;
    if (type === 'success') {
      // store token in secure storage
      await SecureStore.setItemAsync('auth', JSON.stringify(auth));
      this.props.navigation.navigate('App');
    } else {
      // set state with error
      this.setState({ errorCode });
    }
  };
};