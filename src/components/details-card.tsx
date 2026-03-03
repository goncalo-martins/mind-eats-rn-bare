
import { StyleSheet, Text, View } from "react-native";
import { typography } from "../constants/typography";
import { BaseColors } from "../constants/colors";

const DetailsCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  return (
    <View style={styles.container}>
      <Text style={typography.bodyS}>{title}</Text>
      {children ? (
        children
      ) : (
        <Text style={typography.bodyM}>{description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 66,
    flex: 1,
    overflow: "hidden",
    backgroundColor: BaseColors.neutralLightLight,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 16,
  },
});

export default DetailsCard;
