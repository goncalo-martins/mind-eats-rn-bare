import { useRecipes } from "../context/recipes-context";
import { Text, View } from "react-native";

const Favourites = () => {
  const { favourites } = useRecipes();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{favourites.join(", ")} Favourites</Text>
    </View>
  );
};

export default Favourites;
