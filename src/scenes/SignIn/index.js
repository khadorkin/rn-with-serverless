import React from 'react';
import { authorize } from 'react-native-app-auth';

import Button from '../../components/Button';
import SigningCircle from '../../components/SigningCircle';
import { OAUTH_CONFIG } from '../../utils/constants';
import * as Utils from '../../components/Utils';

class SignIn extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    err: null,
    authorizing: false
  };

  _signIn = async () => {
    const onSuccess = this.props.navigation.getParam('onSuccess');
    this.setState({
      authorizing: true
    });
    try {
      // sign in to get authorized info
      const result = await authorize(OAUTH_CONFIG);

      if (result && result.accessToken && result.idToken) {
        this.props.navigation.goBack(null);
        if (onSuccess) {
          onSuccess({ access: result.accessToken, ID: result.idToken });
        }
      } else {
        // set state with error
        throw 'You cancel or dismissed the login';
      }
    } catch (err) {
      // set state with error
      this.setState({ authorizing: false, err });
    };
  };

  render() {
    const {
      err,
      authorizing
    } = this.state;

    const content = !authorizing ?
      <Button icon={'ios-lock'} iconSize={20} title="Login with SSO" primary onPress={this._signIn} />
      : <SigningCircle animation="pulse" duration={800} iterationCount="infinite" />;

    return (
      <Utils.SafeAreaView>
        <Utils.Container style={{ justifyContent: 'center', alignItems: (!authorizing ? 'stretch' : 'center') }}>
          <Utils.Content paddingTop={48}>
            {content}
            {err &&
              <Utils.Text>{err}</Utils.Text>
            }
          </Utils.Content>
        </Utils.Container>
      </Utils.SafeAreaView>
    );
  };
};

export default SignIn;
