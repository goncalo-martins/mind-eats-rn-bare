import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RecipeList from '../src/components/recipe-list';
import { RecipesProvider } from '../src/context/recipes-context';
import { IRecipe } from '../src/types/recipe';

const mockRecipes: IRecipe[] = [
  {
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
  },
  {
    id: 2,
    name: 'Pasta Carbonara',
    image: 'https://example.com/pasta.jpg',
    mealType: ['Lunch', 'Dinner'],
    ingredients: ['pasta', 'eggs', 'bacon'],
    instructions: ['Cook pasta', 'Mix with sauce'],
    rating: 4.8,
    reviewCount: 25,
    cuisine: 'Italian',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    caloriesPerServing: 400,
    tags: ['Spicy', 'Quick'],
    userId: 1,
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <NavigationContainer>
      <RecipesProvider>
        {component}
      </RecipesProvider>
    </NavigationContainer>
  );
};

describe('RecipeList Component', () => {
  it('should render list of recipes', () => {
    const { getByText } = renderWithProviders(
      <RecipeList items={mockRecipes} isLoading={false} />
    );
    
    expect(getByText('Chicken Curry')).toBeTruthy();
    expect(getByText('Pasta Carbonara')).toBeTruthy();
  });

  it('should render correct number of recipe cards', () => {
    const { getAllByTestId } = renderWithProviders(
      <RecipeList items={mockRecipes} isLoading={false} />
    );
    
    const cards = getAllByTestId('recipe-card');
    expect(cards.length).toBe(2);
  });

  it('should display loading indicator when isLoading is true', () => {
    const { getByTestId } = renderWithProviders(
      <RecipeList items={[]} isLoading={true} />
    );
    
    expect(getByTestId('recipe-list-loading')).toBeTruthy();
  });

  it('should render empty list when data is empty and not loading', () => {
    const { getByTestId } = renderWithProviders(
      <RecipeList items={[]} isLoading={false} />
    );
    
    expect(getByTestId('empty-recipe-list')).toBeTruthy();
  });
});
