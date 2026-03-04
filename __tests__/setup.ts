import '@testing-library/jest-native/extend-expect';
import React from 'react';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn((key) => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    multiGet: jest.fn(() => Promise.resolve([])),
    multiSet: jest.fn(() => Promise.resolve()),
    getAllKeys: jest.fn(() => Promise.resolve([])),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: any }) => children,
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {},
  })),
  NavigationContext: {
    Provider: ({ children }: { children: any }) => children,
    Consumer: ({ children }: { children: any }) => children,
  },
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(() => true),
  CommonActions: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(() => ({
    Navigator: ({ children }: { children: any }) => children,
    Screen: ({ children }: { children: any }) => children,
  })),
  useBottomTabBarHeight: jest.fn(() => 60),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }: { children: any }) => children,
    Screen: ({ children }: { children: any }) => children,
  })),
}));

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })),
  SafeAreaView: ({ children }: { children: any }) => children,
  SafeAreaProvider: ({ children }: { children: any }) => children,
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
) as jest.Mock;

// Suppress console errors and warnings
const originalError = console.error;
const originalWarn = console.warn;
beforeAll(() => {
  console.error = jest.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Non-serializable values') ||
        args[0].includes('Cannot use import statement outside a module') ||
        args[0].includes('RCTTurboModuleManager'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  });

  console.warn = jest.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('ViewPropTypes will be removed')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});




