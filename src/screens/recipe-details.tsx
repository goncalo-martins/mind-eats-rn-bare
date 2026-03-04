import { useNavigation } from "@react-navigation/native";
import { fetchRecipeDetailsById } from "../api/recipes";
import ArrowLeftIcon from "../../assets/images/icons/arrow-left";
import { default as FavouriteIcon } from "../../assets/images/icons/favourite";
import FavouritesOutlineIcon from "../../assets/images/icons/favourites-outline";
import ActionButton from "../components/action-button";
import Button from "../components/button";
import DetailsCard from "../components/details-card";
import List from "../components/list";
import { Rating } from "../components/rating";
import Tag from "../components/tag";
import { BaseColors } from "../constants/colors";
import { typography } from "../constants/typography";
import { useRecipes } from "../context/recipes-context";
import { IRecipe } from "../types/recipe";
// import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RecipeDetails = ({ route }) => {
  const { recipeId } = route.params;
  const navigation = useNavigation();

  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    favoriteBtn: {
      position: "absolute",
      top: insets.top,
      right: 16,
    },
    backBtn: {
      position: "absolute",
      top: insets.top,
      left: 16,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageBanner: {
      width: "100%",
      height: 300,
    },
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const { addToFavourites, favourites } = useRecipes();

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetailsById(Number(recipeId)).then((data) => setRecipe(data));
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipe && favourites.some((fav) => fav.id === recipe.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favourites, recipe]);

  const handleAddToFavourites = () => {
    if (recipe) addToFavourites(recipe);
  };

  if (!recipe) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={BaseColors.highlightDarkest} />
      </View>
    );
  }

  return (
    <>
      <Image source={{ uri: recipe.image }} style={styles.imageBanner} />
      <ActionButton
        icon={
          isFavorite ? (
            <FavouriteIcon
              color={BaseColors.neutralLightLight}
              width={20}
              height={20}
            />
          ) : (
            <FavouritesOutlineIcon
              color={BaseColors.neutralLightLight}
              width={20}
              height={20}
            />
          )
        }
        style={styles.favoriteBtn}
        onPress={handleAddToFavourites}
      />
      <ActionButton
        icon={
          <ArrowLeftIcon
            color={BaseColors.neutralLightLight}
            height={20}
            width={20}
          />
        }
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        style={{
          flex: 1,
          alignContent: "center",
          paddingTop: 24,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 48,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text
            style={[
              typography.captionM,
              { color: BaseColors.highlightDarkest, paddingBottom: 6 },
            ]}
          >
            {recipe.mealType.join(", ").toUpperCase()}
          </Text>
          <Text style={[typography.h1, {}]}>{recipe.name}</Text>

          <View
            style={{
              paddingVertical: 24,
              flexDirection: "row",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {recipe.tags.map((tag: string) => (
              <Tag key={tag} title={tag} />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              paddingBottom: 32,
              justifyContent: "center",
            }}
          >
            <DetailsCard
              title={"Servings"}
              description={`${recipe.servings} people`}
            />
            <DetailsCard
              title={"Cook Time"}
              description={`${recipe.cookTimeMinutes} minutes`}
            />
            <DetailsCard title={"Rating"}>
              <Rating rating={recipe.rating} />
            </DetailsCard>
          </View>
          <View style={{ gap: 32 }}>
            <List
              title={"Ingredients"}
              type={"bullet"}
              items={recipe.ingredients}
            />
            <List
              title={"Instructions"}
              type={"ordered"}
              items={recipe.instructions}
            />
          </View>
          <Button
            title={isFavorite ? "Remove Favourite" : "Add to Favourites"}
            onPress={handleAddToFavourites}
            leftIcon={
              isFavorite ? (
                <FavouriteIcon
                  color={BaseColors.neutralDarkDarkest}
                  width={20}
                  height={20}
                />
              ) : (
                <FavouritesOutlineIcon
                  color={BaseColors.neutralDarkDarkest}
                  width={16}
                  height={16}
                />
              )
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default RecipeDetails;
