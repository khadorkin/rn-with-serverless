import React from 'react';
import {
  Button,
  View,
} from 'react-native';
import {
  AuthSession,
  SecureStore
} from 'expo';

// TODO: use .env for commom configs
// import Config from 'react-native-config';

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
        `http://192.168.1.3:32089/auth/realms/justice-league/protocol/openid-connect/auth?response_type=token` +
        `&client_id=rn-with-serverless` +
        `&client_secret=<client_secret>` +
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