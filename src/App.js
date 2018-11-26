import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import SignIn from './scenes/SignIn';
import AuthLoading from './scenes/AuthLoading';
import Other from './scenes/Other';
import Home from './scenes/Home';

const AppStack = createStackNavigator({ Home, Other });
const AuthStack = createStackNavigator({ SignIn });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));