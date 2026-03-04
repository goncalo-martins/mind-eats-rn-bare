import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../src/components/text-input';

describe('TextInput Component', () => {
  it('should render text input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChange={() => {}} />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('should call onChange when text is entered', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChange={mockOnChange}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'hello');
    expect(mockOnChange).toHaveBeenCalledWith('hello');
  });

  it('should handle text changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text"
        onChange={mockOnChange}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'hello');
    fireEvent.changeText(input, 'hello world');
    fireEvent.changeText(input, 'hello world!');
    
    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(mockOnChange).toHaveBeenLastCalledWith('hello world!');
  });
});
