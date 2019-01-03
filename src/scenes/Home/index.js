import React from 'react';

import * as Utils from '../../components/Utils';
import Button from '../../components/Button';
import onBackgroundHandler from '../../utils/onBackgroundHandler';
import { withContext } from '../../stores/context';

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.appStateListener = onBackgroundHandler(this._onAppStateChange);
  }

  componentWillUnmount() {
    this.appStateListener.remove();
  }

  _onAppStateChange = nextAppState => {
    const { keys } = this.props.context
    if (nextAppState.match(/background/)) {
      if (!keys)
        this.props.navigation.navigate('Loading');
    };
  };

  render() {
    return (
      <Utils.SafeAreaView>
        <Utils.Container justify='flex-start' align='stretch'>
          <Utils.Content paddingTop={48}>
            <Button icon={'ios-person'} iconSize={20} title={"Go to profile"} primary onPress={() => this.props.navigation.navigate('Profile')} />
          </Utils.Content>
        </Utils.Container>
      </Utils.SafeAreaView>
    );
  }
};

export default withContext(Home);
