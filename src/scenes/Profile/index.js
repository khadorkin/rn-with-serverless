import React from 'react';
import {
  RefreshControl,
  ScrollView
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Utils from '../../components/Utils';
import Button from '../../components/Button';
import NavigationHeader from '../../components/Navigation/Header';
import { withContext } from '../../stores/context';
import { Colors } from '../../components/DesignSystem';
import { logout } from '../../services/auth';

class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    refreshing: false,
    error: null
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', this._loadData);
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  _signOut = async () => {
    try {
      const keys = await this.props.context.getKeys();
      await logout(keys.ID);
      await this.props.context.clear();
    } catch (err) {
      throw err;
    } finally {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Loading' })],
        key: null
      });
      this.props.navigation.dispatch(resetAction);
    };
  };

  _loadData = async () => {
    try {
      await this.props.context.loadUserData();
    } catch (e) {
      console.log(e);
      this.setState({ error: "Error loading data" });
    }
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this._loadData();
    this.setState({ refreshing: false });
  };

  render() {
    const {
      refreshing,
      error
    } = this.state;

    const {
      account
    } = this.props.context;

    return (
      <Utils.SafeAreaView>
        <NavigationHeader
          title={"Profile"}
          onBack={() => { this.props.navigation.goBack() }}
          noBorder
        />
        <Utils.Container justify='flex-start' align='stretch'>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Utils.Content paddingTop={0}>
              {error &&
                <Utils.Text color={Colors.primaryText}>{error}</Utils.Text>
              }
              <Utils.Label>
                <Utils.Text color={Colors.secondaryText}>Name</Utils.Text>
              </Utils.Label>
              {account && account.name &&
                <Utils.Text>{account.name}</Utils.Text>
              }
              <Utils.VerticalSpacer size='small' />
              <Utils.Label>
                <Utils.Text color={Colors.secondaryText}>E-mail</Utils.Text>
              </Utils.Label>
              {account && account.email &&
                <Utils.Row justify='space-between' align='center'>
                  <Utils.Text>
                    {account.email}
                  </Utils.Text>
                  {(account && account.confirmed) ? <Ionicons name='ios-checkmark-circle' color={ Colors.primaryText } size={18} /> : null}
                </Utils.Row>
              }
              <Utils.VerticalSpacer size='large' />
              <Button title="Sign Out" primary icon={'ios-log-out'}
                iconSize={20} onPress={this._signOut} />
            </Utils.Content>
          </ScrollView>
        </Utils.Container>
      </Utils.SafeAreaView>
    );
  }
};

export default withContext(Profile);
