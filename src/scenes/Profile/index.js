import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import * as Utils from '../../components/Utils';
import Button from '../../components/Button';
import NavigationHeader from '../../components/Navigation/Header';
import { withContext } from '../../stores/context';
import { Colors } from '../../components/DesignSystem';

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
                <Utils.Label key='name-label'>
                  <Utils.Text key='name' color={Colors.secondaryText}>Name</Utils.Text>
                </Utils.Label>,
                <Utils.Text key='name'>{account.name}</Utils.Text>,
                <Utils.VerticalSpacer key='spacerName' size='medium' />
              ]
            }
            {account && account.email &&
              [
                <Utils.Label key='email-label'>
                  <Utils.Text key='name' color={Colors.secondaryText}>E-mail</Utils.Text>
                </Utils.Label>,
                <Utils.Text key='email'>{account.email}</Utils.Text>,
                <Utils.VerticalSpacer key='spacerEmail' size='medium' />
              ]
            }
            <Button title="Sign Out" primary icon={'ios-log-out'}
              iconSize={20} onPress={this._signOut} />
          </Utils.Content>
        </Utils.Container>
      </Utils.SafeAreaView>
    );
  }
};

export default withContext(Profile);
