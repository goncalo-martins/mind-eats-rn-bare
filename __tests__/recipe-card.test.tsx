import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RecipeCard from '../src/components/recipe-card';
import { RecipesProvider } from '../src/context/recipes-context';
import { IRecipe } from '../src/types/recipe';

const mockRecipe: IRecipe = {
  id: 1,
  name: 'Chicken Curry',
  image: 'https://example.com/chicken-curry.jpg',
  mealType: ['Lunch', 'Dinner'],
  ingredients: ['chicken', 'curry powder'],
  instructions: ['Cook chicken', 'Add curry'],
  rating: 4.5,
  reviewCount: 10,
  cuisine: 'Indian',
  difficulty: 'Medium',
  prepTimeMinutes: 20,
  cookTimeMinutes: 30,
  servings: 4,
  caloriesPerServing: 400,
  tags: ['Spicy', 'Quick'],
  userId: 1,
};


const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <NavigationContainer>
      <RecipesProvider>{component}</RecipesProvider>
    </NavigationContainer>,
  );
};

describe('RecipeCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render recipe card with recipe details', () => {
    const { getByText } = renderWithProviders(<RecipeCard item={mockRecipe} />);

    expect(getByText('LUNCH, DINNER')).toBeTruthy();
    expect(getByText('Chicken Curry')).toBeTruthy();
  });

  it('should render recipe image', () => {
    const { getByTestId } = renderWithProviders(
      <RecipeCard item={mockRecipe} />,
    );

    const image = getByTestId('recipe-image');
    expect(image).toBeTruthy();
  });

  it('should render recipe card with favorite button', async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <RecipeCard item={mockRecipe} />,
    );

    // The recipe card should render
    expect(getByTestId('recipe-card')).toBeTruthy();
    
    // Initially favorite icon should not show (recipe not in favorites)
    expect(queryByTestId('favorite-icon')).toBeNull();
  });
});
