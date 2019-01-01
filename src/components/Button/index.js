import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

import { Colors } from '../DesignSystem';
import { Button, View, Icon, Text } from './elements';

const ButtonComponent = ({
  onPress,
  title,
  icon = null,
  iconSize = 16,
  primary = null,
  floating = null,
  round = null,
  rippleColor = !rippleColor ?
    (primary ? 'white' : '#f3f3f3') : rippleColor
}) => {
  return (
    <Button background={TouchableNativeFeedback.Ripple(rippleColor, round)}  onPress={() => { setTimeout(() => { onPress() }, 100) }}>
      <View primary={primary} round={round} floating={floating} pointerEvents='box-only'>
        {icon && 
          <Icon name={icon} size={iconSize} primary={primary} round={round} color={Colors.primaryText} />
        }
        <Text primary={primary}>{title}</Text>
      </View>
    </Button>
  )
};

export default ButtonComponent;
