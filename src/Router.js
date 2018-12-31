import {
  createStackNavigator
} from 'react-navigation';

import Loading from './scenes/Loading';
import SignIn from './scenes/SignIn';
import Home from './scenes/Home';
import Profile from './scenes/Profile';

const RootNavigator = createStackNavigator({
  Loading,
  SignIn,
  Home,
  Profile
}, {
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
    header: null
  },
  cardStyle: { shadowColor: 'transparent' }
});

export default RootNavigator;
