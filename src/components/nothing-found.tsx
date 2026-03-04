import NoResultsIcon from "../../assets/images/icons/no-results";
import { typography } from "../constants/typography";
import { StyleSheet, Text, View } from "react-native";

const NothingFoundCard = ({ search, testID }: { search: string; testID?: string }) => {
  return (
    <View
      testID={testID}
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <NoResultsIcon />
      <Text style={styles.title}>Nothing Found</Text>
      <Text style={styles.description}>
        {`It looks like we couldn't find any results for `}
        <Text style={styles.searchText}>{search}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h3,
    paddingTop: 22,
  },
  description: {
    ...typography.bodyM,
    paddingTop: 12,
    textAlign: "center",
  },
  searchText: {
    ...typography.bodyM,
    fontWeight: "700",
  },
});

export default NothingFoundCard;
