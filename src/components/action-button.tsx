import { Pressable, StyleSheet, View } from 'react-native';

const ActionButton = ({
  icon,
  onPress,
  style,
  testID,
}: {
  icon: React.ReactNode;
  onPress?: () => void;
  style?: object;
  testID?: string;
}) => {
  return onPress ? (
    <Pressable style={[styles.container, style]} onPress={onPress} testID={testID}>
      {icon}
    </Pressable>
  ) : (
    <View style={[styles.container, style]} testID={testID}>{icon}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(7, 12, 2, 0.28)',
    width: 40,
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionButton;
