import FavouriteIcon from "../../assets/images/icons/favourite";
import { BaseColors } from "../constants/colors";
import { typography } from "../constants/typography";
import { useRecipes } from "../context/recipes-context";
import { IRecipe } from "../types/recipe";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import ActionButton from "./action-button";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ item }: { item: IRecipe }) => {
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false); // TODO: Get this from context or state

  const { favourites } = useRecipes();

    useEffect(() => {
    if (item?.id) {
      setIsFavorite(favourites.some((fav) => fav.id === item.id));
    }
  }, [favourites, item]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("RecipeDetails", {
          recipeId: JSON.stringify(item.id),
        })
      }
    >
      {isFavorite && (
        <ActionButton
          icon={
            <FavouriteIcon
              color={BaseColors.highlightDark}
              width={20}
              height={20}
            />
          }
          style={styles.favoriteBtn}
        />
      )}

      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <Text style={styles.mealType}>
        {item.mealType.join(", ").toUpperCase()}
      </Text>
      <Text numberOfLines={2} style={styles.mealName}>
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  mealImage: {
    width: "100%",
    height: 136,
    borderRadius: 16,
  },
  mealType: {
    marginTop: 16,
    ...typography.captionM,
    color: BaseColors.highlightDark,
  },
  mealName: {
    marginTop: 6,
    ...typography.h3,
    color: BaseColors.neutralDarkDarkest,
    marginBottom: 8,
  },
  favoriteBtn: {
    position: "absolute",
    borderRadius: 32,
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: BaseColors.highlightLightest,
  },
});

export default RecipeCard;
