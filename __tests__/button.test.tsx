import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/button';

describe('Button Component', () => {
  it('should render button with text', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button onPress={mockOnPress} title="Click Me" testID="test-button" />
    );
    fireEvent.press(getByTestId('test-button'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
