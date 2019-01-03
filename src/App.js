import React, { Component } from 'react';
import { StatusBar, Platform, YellowBox, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import * as Keychain from 'react-native-keychain';
import decoder from 'jwt-decode';
import { revoke } from 'react-native-app-auth';

import RootNavigator from './Router';
import { Colors } from './components/DesignSystem';
import { Context } from './stores/context';
import { deleteStore, storeSecrets, getSecrets } from './stores/secrets';
import { OAUTH_CONFIG } from './utils/constants';
import { getUserInfo } from './services/auth';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

const prefix = Platform.OS === 'android' ? 'rnwithserverless://rnwithserverless/' : 'rnwithserverless://'

const AppContainer = createAppContainer(RootNavigator);

class App extends Component {
  state = {
    account: null,
    keys: {
      access: null,
      ID: null,
    }
  };

  _loadUserData = async () => {
    try {
      const keys = await this._getKeys();
      if (keys) {
        // get current data from local storage
        const accounts = await getSecrets(keys.ID);

        // merge store with state
        const account = Object.assign({}, this.state.account, accounts[0]);

        this.setState({ account }, () => this._updateAccount(keys, account));
      } else {
        throw 'No credentials stored';
      }
    } catch (err) {
      throw err;
    }
  }

  _updateAccount = async (keys, account) => {
    try {
      // get user info from IDP service
      const { data } = await getUserInfo(keys.access);

      // merges local data with data from IDP service
      account.confirmed = data['email_verified'];
      account.ID = keys.ID;
      account.access = keys.access;
      account.name = data.name;
      account.email = data.email;

      await storeSecrets(keys.ID, account);
      this.setState({ account });
    } catch (err) {
      throw err;
    }
  };

  // loads user info from JWT ID Token in context
  _loadJWTUser = async (keys) => {
    try {
      if (keys) {
        // decodes id token
        const jwt = decoder(keys.ID);

        /*
        * instantiantes a empty account
        * since this function is only invoked at login
        */
        const account = {};
        account.confirmed = (jwt['ver'] === 1);
        account.ID = keys.ID;
        account.access = keys.access;
        account.name = jwt.name;
        account.email = jwt.email;

        await storeSecrets(keys.ID, account);
        this.setState({ account });
      } else {
        throw 'No credentials stored';
      }
    } catch (err) {
      throw err;
    }
  };

  _setKeys = async (keys, callback) => {
    try {
      await this._loadJWTUser(keys);
      await Keychain.setGenericPassword('keys', JSON.stringify(keys));
      this.setState({
        keys
      });
      callback();
    } catch (err) {
      console.log(err);
      throw "Keychain couldn\'t be accessed!";
    }
  };

  _getKeys = async () => {
    try {
      const { keys } = this.state;
      if (keys.access && keys.ID)
        return keys;

      const credentials = await Keychain.getGenericPassword();
      if (credentials)
        return JSON.parse(credentials.password);

      throw "No key present in context or keychain";
    } catch (error) {
      console.log(error);
      throw "Keychain couldn\'t be accessed!";
    }
  };

  _clear = async () => {
    try {
      const keys = await this._getKeys();
      await revoke(OAUTH_CONFIG, {
        tokenToRevoke: keys.access
      });
      await deleteStore(keys.ID);
      await Keychain.resetGenericPassword();
      this.setState({
        userSecrets: [],
        account: null,
        keys: {
          access: null,
          ID: null
        }
      });
    } catch (error) {
      console.log(error);
      throw 'Keychain couldn\'t be accessed: ';
    }
  };

  render() {
    const contextProps = {
      ...this.state,
      loadUserData: this._loadUserData,
      setKeys: this._setKeys,
      getKeys: this._getKeys,
      clear: this._clear
    };

    return (
      <View style={{ backgroundColor: Colors.background, flex: 1 }} >
        <Context.Provider value={contextProps}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor={'#CCC'} translucent={true} />
          <AppContainer uriPrefix={prefix} />
        </Context.Provider>
      </View>
    )
  };
};

export default App;
