import React from 'react';
import {
  RefreshControl,
  ScrollView
} from 'react-native';

import * as Utils from '../../components/Utils';
import Button from '../../components/Button';
import onBackgroundHandler from '../../utils/onBackgroundHandler';
import { withContext } from '../../stores/context';

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    refreshing: false,
    error: null,
    accountModalVisible: false
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', this._loadData);
    this.appStateListener = onBackgroundHandler(this._onAppStateChange);
  }

  componentWillUnmount() {
    this._navListener.remove();
    this.appStateListener.remove();
  }

  _onAppStateChange = nextAppState => {
    const { keys } = this.props.context
    if (nextAppState.match(/background/)) {
      if (!keys)
        this.props.navigation.navigate('Loading');
    };
  };

  _loadData = async () => {
    try {
      this.props.context.loadUserData();
    } catch (e) {
      this.setState({ error: "Error loading data" });
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this._loadData()
    this.setState({ refreshing: false })
  }

  render() {
    const {
      refreshing
    } = this.state;

    return (
      <Utils.SafeAreaView>
        <Utils.Container justify='flex-start' align='stretch'>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Utils.Content paddingTop={48}>
              <Button icon={'ios-person'} iconSize={20} title={"Go to profile"} primary onPress={() => this.props.navigation.navigate('Profile')} />
            </Utils.Content>
          </ScrollView>
        </Utils.Container>
      </Utils.SafeAreaView>
    );
  }
};

export default withContext(Home);
