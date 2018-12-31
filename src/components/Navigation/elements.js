import styled, { css } from 'styled-components';

import { Colors, Spacing } from '../DesignSystem';

export const HeaderWrapper = styled.View`
  background-color:${Colors.background}
`;

export const Header = styled.View`
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${Spacing.medium}px;
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.paddingTop && css` padding-top: ${props.paddingTop}px`};
  ${props => props.border && css`border-bottom-width: 1px`};
  ${props => props.border && css`border-bottom-color: black`};
`;
