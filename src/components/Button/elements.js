import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../DesignSystem';

export const Button = styled.TouchableNativeFeedback`
`;

export const View = styled.View`
  padding: ${(props) => props.round ? '0' : '14px'};
  background-color: ${(props) => props.primary ? Colors.primaryText : '#FFFFFF'};
  border-radius: ${(props) => props.round ? '24px' : '4px'};
  shadow-color: ${(props) => props.floating ? '#000' : '#fff'};
  shadow-offset: ${(props) => props.floating ? '0 2px' : '0'};
  shadow-opacity: ${(props) => props.floating ? '0.25' : '0'};
  shadow-radius: ${(props) => props.floating ? '3.84' : '0'};
  elevation: ${(props) => props.floating ? '5' : '0'};;
  flex-direction: row;
`;

export const Icon = styled(Ionicons)`
  padding: ${(props) => props.round ? '6px 14px' : '0 14px 0 6px'};
  color: ${(props) => props.primary ? '#FFFFFF' : '#FE7163'};
`;

export const Text = styled.Text`
  font-size: 16px;
  letter-spacing: 0.6px;
  color: ${(props) => props.primary ? '#FFFFFF' : '#FE7163'};
`;
