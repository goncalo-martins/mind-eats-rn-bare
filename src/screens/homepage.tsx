import LogoIcon from "../../assets/images/logo.png";
import SearchIcon from "../../assets/images/icons/search";
import NothingFoundCard from "../components/nothing-found";
import RecipeList from "../components/recipe-list";
import Input from "../components/text-input";
import { BaseColors } from "../constants/colors";
import { useRecipes } from "../context/recipes-context";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Homepage = () => {
  const insets = useSafeAreaInsets();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const {
    recipes,
    fetchAllRecipes,

    searchRecipesByQuery,
    filteredRecipes,
    setFilteredRecipes,

    isLoading,
  } = useRecipes();

  const searchWithDebounce = useCallback(
    debounce(searchRecipesByQuery, 1000),
    [],
  );

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // TODO: Move this to outside the component
  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      flex: 1,
      backgroundColor: BaseColors.neutralLightLight,
      gap: 24,
    },
    icon: {
      width: 168,
      height: 34,
      alignSelf: "center",
      paddingHorizontal: 16,
    },
  });

  useEffect(() => {
    if (searchText.length === 0) {
      return;
    }
    setFilteredRecipes([]);
    searchWithDebounce(searchText);
  }, [searchText]);

  return (
    <View style={styles.container} testID="homepage">
      <Image source={LogoIcon} style={styles.icon} resizeMode="contain" />
      <Input
        testID="search-input"
        placeholder="Search by name or meal type"
        leftIcon={<SearchIcon />}
        onChange={(text) => {
          if (text.length > 0) setIsSearching(true);
          else setIsSearching(false);

          setSearchText(text);
        }}
      />
      {isSearching && filteredRecipes.length === 0 && !isLoading ? (
        <NothingFoundCard testID="nothing-found-message" search={searchText} />
      ) : (
        <RecipeList
          title={"Popular"}
          isSearching={isSearching}
          items={isSearching ? filteredRecipes : recipes}
          isLoading={isLoading}
        />
      )}
    </View>
  );
};

export default Homepage;
