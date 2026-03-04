

import { Pressable, StyleSheet, Text } from 'react-native';
import { typography } from '../constants/typography';
import { BaseColors } from '../constants/colors';

const Button = ({
  title,
  onPress,
  leftIcon,
  testID,
}: {
  title: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  testID?: string;
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress} testID={testID}>
      {leftIcon && leftIcon}
      <Text style={typography.h3}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    backgroundColor: BaseColors.highlightDarkest,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default Button;
