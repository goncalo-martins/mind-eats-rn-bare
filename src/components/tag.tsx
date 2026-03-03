
import { StyleSheet, Text, View } from 'react-native';
import { BaseColors } from '../constants/colors';
import { typography } from '../constants/typography';

const Tags = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={typography.captionM}>{title.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    height: 24,
    borderColor: BaseColors.highlightDarkest,
    borderWidth: 2,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tags;
