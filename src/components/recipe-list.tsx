import { BaseColors } from "../constants/colors";
import { typography } from "../constants/typography";
import { IRecipe } from "../types/recipe";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RecipeCard from "./recipe-card";

const RecipeList = ({
  items,
  isLoading,
  title,
  isSearching = false,
}: {
  items: IRecipe[];
  isLoading: boolean;
  title?: string;
  isSearching?: boolean;
}) => {
  if (isLoading && items.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={BaseColors.highlightDarkest} />
      </View>
    );
  }
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
      {title && !isSearching && <Text style={styles.title}>{title}</Text>}
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        style={styles.container}
        data={items}
        renderItem={({ item }) => <RecipeCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        columnWrapperStyle={{ gap: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...typography.h1,
    marginBottom: 16,
  },
  description: {
    ...typography.bodyM,
    paddingTop: 12,
  },
  searchText: {
    ...typography.bodyM,
    fontWeight: "700",
  },
});

export default RecipeList;
