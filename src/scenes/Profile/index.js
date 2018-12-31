import React from 'react';
import {
  Button
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import * as Utils from '../../components/Utils';
import NavigationHeader from '../../components/Navigation/Header';
import { withContext } from '../../stores/context';

class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  _signOut = async () => {
    try {
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

  render() {
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
          <Utils.Content paddingTop={0}>
            {account && account.name &&
              [
                <Utils.Text key='labelName'>{account.name}</Utils.Text>,
                <Utils.VerticalSpacer key='spacerName' size='medium' />
              ]
            }
            {account && account.email &&
              [
                <Utils.Text key='labelEmail'>{account.email}</Utils.Text>,
                <Utils.VerticalSpacer key='spacerEmail' size='medium' />
              ]
            }
            <Button title="Sign Out" onPress={this._signOut} />
          </Utils.Content>
        </Utils.Container>
      </Utils.SafeAreaView>
    );
  }
};

export default withContext(Profile);
