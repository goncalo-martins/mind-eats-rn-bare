import { fetchRecipes, searchRecipes } from '../api/recipes';
import { IRecipe } from '../types/recipe';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IRecipesContextProps {
  recipes: IRecipe[];
  favourites: number[];
  isLoading: boolean;
  fetchAllRecipes: () => Promise<void>;
  searchRecipesByQuery: (query: string) => Promise<void>;
  addToFavourites: (id: number) => void;
  filteredRecipes: IRecipe[];
  setFilteredRecipes: (recipes: IRecipe[]) => void;
}

const RecipesContext = createContext<IRecipesContextProps | undefined>(
  undefined,
);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRecipes();
      if (data && data.total === 0) setIsLoading(false);
      setRecipes(data.recipes);
    } catch (error) {
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
      setIsLoading(false);
    }
  };

  const addToFavourites = (id: number) => {
    if (favourites.includes(id)) {
      setFavourites((prev) => prev.filter((favId) => favId !== id));
    } else {
      setFavourites((prev) => [...prev, id]);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        favourites,
        isLoading,
        fetchAllRecipes,
        searchRecipesByQuery,
        addToFavourites,
        filteredRecipes,
        setFilteredRecipes,
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
