import React, { Component } from 'react';
import { StatusBar, Platform, YellowBox, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import * as Keychain from 'react-native-keychain';
import decoder from 'jwt-decode';

import RootNavigator from './Router';
import { Colors } from './components/DesignSystem';
import { Context } from './stores/context';
import { deleteStore, storeSecrets } from './stores/secrets';

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
    // TODO: fetches user data from openid provider api
    try {
      const keys = await this._getKeys();
      if (keys) {
        const jwt = decoder(keys.ID);
        const account = {};
        account.confirmed = true;
        account.ID = keys.ID;
        account.access = keys.access;
        account.name = jwt.name;
        account.email = jwt.email;
        
        this.setState({ account });
      } else {
        throw 'No credentials stored';
      }
    } catch (err) {
      throw err;
    }
  };

  _storeUserData = async (keys = null) => {
    // accounts = filtered accounts by hidden status
    // userSecrets =  ref to all userSecrets
    try {
      if (keys) {
        const jwt = decoder(keys.ID);
        const account = {};
        account.confirmed = true;
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
      await this._storeUserData(keys);
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
      console.log('Keychain couldn\'t be accessed!', error);
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
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.background} translucent={true} />
          <AppContainer uriPrefix={prefix} />
        </Context.Provider>
      </View>
    )
  };
};

export default App;
