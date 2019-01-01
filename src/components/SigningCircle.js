import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';

import { Colors } from './DesignSystem';

const SigningCircle = styled(Animatable.View)`
  height: 120px;
  width: 120px;
  border: 2px solid ${Colors.primaryText};
  border-radius: 60px;
`;

export default SigningCircle;
