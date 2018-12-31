import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { getStore } from '../../stores/secrets';
import { withContext } from '../../stores/context';
import { styles } from '../../components/DesignSystem';

class Loading extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    // TODO: stop animation
    this._askCredentials();
  };

  componentWillUnmount() {
    // TODO: reset animation
  };

  _handleSuccess = async (keys) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
      key: null
    });
    setTimeout(() => {
      this.props.context.setKeys(keys, () => this.props.navigation.dispatch(resetAction));
    }, 2000);
  };

  _askCredentials = async () => {
    // try to get key from context
    try {
      const keys = await this.props.context.getKeys();
      await getStore(keys.ID);
      this.props.navigation.navigate('Home');
    } catch (_) {
      setTimeout(() => {
        this.props.navigation.navigate('SignIn', {
          onSuccess: this._handleSuccess
        });
      }, 1000);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
};

export default withContext(Loading);
