// Example test patterns and templates for MindEatsRn

/**
 * Template for testing a simple functional component
 */
export const simpleComponentTestTemplate = `
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../src/components/my-component';

describe('MyComponent', () => {
  it('should render with default props', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Expected Text')).toBeTruthy();
  });

  it('should handle user interaction', () => {
    const mockHandler = jest.fn();
    const { getByTestId } = render(
      <MyComponent onPress={mockHandler} testID="component" />
    );
    fireEvent.press(getByTestId('component'));
    expect(mockHandler).toHaveBeenCalled();
  });

  it('should update when props change', () => {
    const { rerender, getByText } = render(
      <MyComponent text="Initial" />
    );
    expect(getByText('Initial')).toBeTruthy();
    
    rerender(<MyComponent text="Updated" />);
    expect(getByText('Updated')).toBeTruthy();
  });
});
`;

/**
 * Template for testing a component with providers
 */
export const componentWithProvidersTemplate = `
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RecipesProvider } from '../src/context/recipes-context';
import MyComponent from '../src/components/my-component';

const renderWithProviders = (component) => {
  return render(
    <NavigationContainer>
      <RecipesProvider>
        {component}
      </RecipesProvider>
    </NavigationContainer>
  );
};

describe('MyComponent with Providers', () => {
  it('should access context values', () => {
    const { getByText } = renderWithProviders(<MyComponent />);
    expect(getByText('Data from context')).toBeTruthy();
  });
});
`;

/**
 * Template for testing async operations
 */
export const asyncTestTemplate = `
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MyComponent from '../src/components/my-component';

jest.mock('../src/api/recipes', () => ({
  fetchRecipes: jest.fn(),
}));

describe('MyComponent with Async', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and display data', async () => {
    const mockData = [{ id: 1, name: 'Recipe' }];
    require('../src/api/recipes').fetchRecipes.mockResolvedValue(mockData);

    const { getByText } = render(<MyComponent />);
    
    await waitFor(() => {
      expect(getByText('Recipe')).toBeTruthy();
    });
  });

  it('should handle error state', async () => {
    require('../src/api/recipes').fetchRecipes.mockRejectedValue(
      new Error('API Error')
    );

    const { getByText } = render(<MyComponent />);
    
    await waitFor(() => {
      expect(getByText('Error loading data')).toBeTruthy();
    });
  });
});
`;

/**
 * Template for testing hooks
 */
export const hookTestTemplate = `
import { renderHook, act, waitFor } from '@testing-library/react-native';
import useMyHook from '../src/hooks/my-hook';
import { RecipesProvider } from '../src/context/recipes-context';

const wrapper = ({ children }) => (
  <RecipesProvider>{children}</RecipesProvider>
);

describe('useMyHook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useMyHook(), { wrapper });
    expect(result.current.value).toBe('initial');
  });

  it('should update state', () => {
    const { result } = renderHook(() => useMyHook(), { wrapper });
    
    act(() => {
      result.current.setValue('updated');
    });
    
    expect(result.current.value).toBe('updated');
  });

  it('should handle async operations', async () => {
    const { result } = renderHook(() => useMyHook(), { wrapper });
    
    act(() => {
      result.current.fetchData();
    });
    
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });
});
`;

/**
 * Template for testing navigation
 */
export const navigationTestTemplate = `
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyScreen from '../src/screens/my-screen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  }),
}));

describe('MyScreen Navigation', () => {
  it('should navigate to another screen on button press', () => {
    const { getByTestId } = render(<MyScreen />);
    
    fireEvent.press(getByTestId('navigate-button'));
    
    expect(mockNavigate).toHaveBeenCalledWith('TargetScreen', {
      param: 'value',
    });
  });
});
`;

/**
 * Template for testing context
 */
export const contextTestTemplate = `
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useMyContext } from '../src/context/my-context';
import { MyProvider } from '../src/context/my-context';

const wrapper = ({ children }) => (
  <MyProvider>{children}</MyProvider>
);

describe('MyContext', () => {
  it('should provide initial values', () => {
    const { result } = renderHook(() => useMyContext(), { wrapper });
    expect(result.current.state).toBeDefined();
  });

  it('should update state', () => {
    const { result } = renderHook(() => useMyContext(), { wrapper });
    
    act(() => {
      result.current.dispatch({ type: 'UPDATE', payload: 'new' });
    });
    
    expect(result.current.state).toBe('new');
  });
});
`;

/**
 * Template for E2E navigation test
 */
export const e2eNavigationTemplate = `
describe('E2E Navigation Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate through complete user flow', async () => {
    // 1. Check initial state
    await expect(element(by.id('home-screen'))).toBeVisible();
    
    // 2. Tap on a recipe
    await element(by.id('recipe-card').atIndex(0)).tap();
    await expect(element(by.id('recipe-details-screen'))).toBeVisible();
    
    // 3. Add to favorites
    await element(by.id('favourite-button')).tap();
    await expect(element(by.id('success-toast'))).toBeVisible();
    
    // 4. Navigate to favorites
    await element(by.id('back-button')).tap();
    await element(by.id('favourites-tab')).tap();
    
    // 5. Verify recipe in favorites
    await expect(element(by.id('favorite-recipe-card').atIndex(0))).toBeVisible();
  });
});
`;

/**
 * Template for testing API calls
 */
export const apiTestTemplate = `
import { fetchRecipes, searchRecipes } from '../src/api/recipes';
import axios from 'axios';

jest.mock('axios');

describe('Recipes API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch recipes successfully', async () => {
    const mockData = { recipes: [{ id: 1, name: 'Recipe' }] };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchRecipes();
    
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/recipes')
    );
  });

  it('should handle fetch error', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchRecipes()).rejects.toThrow('Network error');
  });

  it('should search recipes with query', async () => {
    const mockData = { recipes: [{ id: 1, name: 'Chicken' }] };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await searchRecipes('chicken');
    
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('chicken')
    );
  });
});
`;

/**
 * Template for testing form validation
 */
export const formValidationTemplate = `
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MyForm from '../src/components/my-form';

describe('MyForm Validation', () => {
  it('should show error for empty required fields', async () => {
    const { getByTestId, getByText } = render(<MyForm />);
    
    fireEvent.press(getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(getByText('Field is required')).toBeTruthy();
    });
  });

  it('should submit valid form', async () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId } = render(
      <MyForm onSubmit={mockOnSubmit} />
    );
    
    fireEvent.changeText(getByTestId('name-input'), 'John');
    fireEvent.changeText(getByTestId('email-input'), 'john@example.com');
    fireEvent.press(getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
      });
    });
  });
});
`;

/**
 * Template for testing list rendering
 */
export const listRenderingTemplate = `
import React from 'react';
import { render } from '@testing-library/react-native';
import MyList from '../src/components/my-list';

describe('MyList Rendering', () => {
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  it('should render all items in list', () => {
    const { getByText } = render(<MyList data={mockData} />);
    
    mockData.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('should handle empty list', () => {
    const { getByText } = render(<MyList data={[]} />);
    expect(getByText('No items')).toBeTruthy();
  });

  it('should render correct number of items', () => {
    const { getAllByTestId } = render(
      <MyList data={mockData} />
    );
    expect(getAllByTestId('list-item').length).toBe(3);
  });
});
`;

export const templates = {
  simpleComponentTestTemplate,
  componentWithProvidersTemplate,
  asyncTestTemplate,
  hookTestTemplate,
  navigationTestTemplate,
  contextTestTemplate,
  e2eNavigationTemplate,
  apiTestTemplate,
  formValidationTemplate,
  listRenderingTemplate,
};
