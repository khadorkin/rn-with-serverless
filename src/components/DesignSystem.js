import {
  Dimensions,
  StyleSheet
} from 'react-native';

export const ButtonSize = {
  small: 28,
  medium: 42,
  large: 50
}

export const Colors = {
  background: '#33337E',
  RGB: {
    background: '51,51,126',
  }
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