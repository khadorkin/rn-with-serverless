import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Utils from '../Utils';
import { Colors } from '../DesignSystem';
import { Header, HeaderWrapper, Button } from './elements';

class NavigationHeader extends React.Component {
  _renderLeftElement = (onBack, leftButton) => {
    let element = null

    if (onBack && !leftButton) {
      element = (
        <View style={{ borderRadius: 21, backgroundColor: '#FFF', width: 42,height: 42 }}>
          <Button floating={false} rippleColor={Colors.secondaryText} round icon={'ios-arrow-round-back'}
            iconSize={32} onPress={onBack} testID='HeaderBack' />
        </View>
      )
    } else {
      element = leftButton;
    }
    return (
      <Utils.View margin={5} position='absolute' left={10}>
        {element}
      </Utils.View>
    );
  };

  _renderRightElement = (onClose, onSearch, onSearchPressed, rightButton) => {
    let element = null
    if (onClose) {
      element = (<Ionicons onPress={onClose} name='ios-close' size={13} />)
    } else if (onSearch) {
      element = (
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            if (onSearchPressed) onSearchPressed()
          }}>
          <Ionicons name='ios-search' color='white' size={21} />
        </TouchableOpacity>
      );
    } else {
      element = rightButton;
    }

    return (
      <Utils.View margin={10} position='absolute' right={10}>
        {element}
      </Utils.View>
    );
  };

  render() {
    const { title, onClose, rightButton, onBack, leftButton, onSearch, onSearchPressed } = this.props;

    return (
      <HeaderWrapper paddingTop={16}>
        <Header border={false}>
          <React.Fragment>
            {this._renderLeftElement(onBack, leftButton)}
            <Utils.View justify='center' align='center'>
              {title && (
                <Utils.Text lineHeight={36} size='average' font='medium'>{title.toUpperCase()}</Utils.Text>
              )}
            </Utils.View >
            {this._renderRightElement(onClose, onSearch, onSearchPressed, rightButton)}
          </React.Fragment>
        </Header>
      </HeaderWrapper>
    );
  };
}

export default NavigationHeader;
