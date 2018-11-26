import React from 'react';
import {
  View,
  Button,
  StatusBar,
  AsyncStorage
} from 'react-native';

import { styles } from '../../components/DesignSystem';

export default class Other extends React.Component {
    static navigationOptions = {
        title: 'Lots of features here',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
                <StatusBar barStyle="default" />
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
};