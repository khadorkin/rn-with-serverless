import {
  Dimensions,
  StyleSheet
} from 'react-native';

export const Spacing = {
  none: 0,
  tiny: 2,
  xsmall: 4,
  small: 8,
  medium: 16,
  big: 24,
  large: 32
};

export const ButtonSize = {
  small: 28,
  medium: 42,
  large: 50
}

export const Colors = {
  background: '#33337E',
  RGB: {
    background: '51,51,126',
  },
  primaryText: '#FFFFFF',
  secondaryText: '#66688F',
  summaryText: '#999bb5'
}

const { width, height } = Dimensions.get('window');

export const ScreenSize = {
  width,
  height
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
});

export const getAdjustedFontSize = size =>
  parseInt(size) * width * (1.8 - 0.002 * width) / 400;

export const FontSize = {
  tiny: getAdjustedFontSize(11),
  button: getAdjustedFontSize(12),
  xsmall: getAdjustedFontSize(12),
  smaller: getAdjustedFontSize(14),
  small: getAdjustedFontSize(16),
  average: getAdjustedFontSize(18),
  medium: getAdjustedFontSize(24),
  large: getAdjustedFontSize(36),
  huge: getAdjustedFontSize(54)
};
