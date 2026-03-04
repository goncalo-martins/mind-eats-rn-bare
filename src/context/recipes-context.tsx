import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IRecipe } from '../types/recipe';
import { fetchRecipes, searchRecipes } from '../api/recipes';

interface IRecipesContextProps {
  recipes: IRecipe[];
  filteredRecipes: IRecipe[];
  favourites: IRecipe[];
  isLoading: boolean;
  fetchAllRecipes: () => Promise<void>;
  searchRecipesByQuery: (query: string) => Promise<void>;
  setFilteredRecipes: (recipes: IRecipe[]) => void;
  addToFavourites: (recipe: IRecipe) => void;
}

const RecipesContext = createContext<IRecipesContextProps | undefined>(
  undefined,
);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [favourites, setFavourites] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem('favourites');
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.error('Failed to load favourites', error);
      }
    };

    loadFavourites();
  }, []);

  const fetchAllRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRecipes();
      if (data && data.total === 0) setIsLoading(false);
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Failed to load recipes', error);

      setIsLoading(false);
    }
  };

  const searchRecipesByQuery = async (query: string) => {
    setIsLoading(true);

    try {
      const data = await searchRecipes(query);
      if (data && data.total === 0) setIsLoading(false);
      setFilteredRecipes(data.recipes);
    } catch (error) {
      console.error('Failed to load recipes', error);
      setIsLoading(false);
    }
  };

  const addToFavourites = async (recipe: IRecipe) => {
    setFavourites(prev => {
      const updatedFavourites = prev.some(fav => fav.id === recipe.id)
        ? prev.filter(fav => fav.id !== recipe.id)
        : [...prev, recipe];

      AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        filteredRecipes,
        favourites,
        isLoading,
        fetchAllRecipes,
        searchRecipesByQuery,
        setFilteredRecipes,
        addToFavourites,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context)
    throw new Error('useRecipes must be used within a RecipesProvider');
  return context;
};
