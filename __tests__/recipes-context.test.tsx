import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { RecipesProvider, useRecipes } from '../src/context/recipes-context';
import * as recipesAPI from '../src/api/recipes';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../src/api/recipes');
jest.mock('@react-native-async-storage/async-storage');

const mockRecipes = [
  {
    id: 1,
    name: 'Chicken Curry',
    image: 'https://example.com/chicken-curry.jpg',
    mealType: ['lunch', 'dinner'],
    ingredients: ['chicken', 'curry powder'],
    instructions: ['Cook chicken', 'Add curry'],
    rating: 4.5,
    reviewCount: 10,
    cuisine: 'Indian',
    difficulty: 'medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecipesProvider>{children}</RecipesProvider>
);

describe('RecipesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('should fetch all recipes', async () => {
    (recipesAPI.fetchRecipes as jest.Mock).mockResolvedValue({
      recipes: mockRecipes,
    });

    const { result } = renderHook(() => useRecipes(), { wrapper });

    act(() => {
      result.current.fetchAllRecipes();
    });

    await waitFor(() => {
      expect(result.current.recipes).toEqual(mockRecipes);
    });
  });

  it('should search recipes by query', async () => {
    (recipesAPI.searchRecipes as jest.Mock).mockResolvedValue({
      recipes: mockRecipes,
    });

    const { result } = renderHook(() => useRecipes(), { wrapper });

    act(() => {
      result.current.searchRecipesByQuery('chicken');
    });

    await waitFor(() => {
      expect(recipesAPI.searchRecipes).toHaveBeenCalledWith('chicken');
      expect(result.current.filteredRecipes).toEqual(mockRecipes);
    });
  });

  it('should add recipe to favourites', async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useRecipes(), { wrapper });

    act(() => {
      result.current.addToFavourites(mockRecipes[0]);
    });

    await waitFor(() => {
      expect(result.current.favourites).toContainEqual(mockRecipes[0]);
    });
  });

  it('should load stored favourites on mount', async () => {
    const storedFavourites = JSON.stringify(mockRecipes);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(storedFavourites);

    const { result } = renderHook(() => useRecipes(), { wrapper });

    await waitFor(() => {
      expect(result.current.favourites).toEqual(mockRecipes);
    });
  });

  it('should set filtered recipes', () => {
    const { result } = renderHook(() => useRecipes(), { wrapper });

    act(() => {
      result.current.setFilteredRecipes(mockRecipes);
    });

    expect(result.current.filteredRecipes).toEqual(mockRecipes);
  });
});
