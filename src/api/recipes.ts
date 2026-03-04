import { IRecipe, IRecipesResponse } from "../types/recipe";
import axios from "axios";

const BASE_URL = "https://dummyjson.com/recipes";

export const fetchRecipes = async (limit = 10, skip = 0) => {
  const response = await axios.get<IRecipesResponse>(
    `${BASE_URL}?limit=${limit}&skip=${skip}&select=name,image,mealType`,
  );
  return response.data;
};

export const fetchRecipesByType = async (
  mealType: string,
  limit = 10,
  skip = 0,
) => {
  const response = await axios.get<IRecipesResponse>(
    `${BASE_URL}/meal-type/${mealType}?limit=${limit}&skip=${skip}&select=name,image,mealType`,
  );
  return response.data;
};

export const fetchRecipeDetailsById = async (id: number) => {
  const response = await axios.get<IRecipe>(`${BASE_URL}/${id}`);
  return response.data;
};

export const searchRecipes = async (query: string, limit = 10, skip = 0) => {
  const response = await axios.get<IRecipesResponse>(
    `${BASE_URL}/search?q=${query}&limit=${limit}&skip=${skip}&select=name,image,mealType`,
  );
  return response.data;
};
