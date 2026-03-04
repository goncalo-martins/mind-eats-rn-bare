import React from 'react';
import { render } from '@testing-library/react-native';
import { Rating } from '../src/components/rating';

describe('Rating Component', () => {
  it('should render correct number of full stars', () => {
    const { queryAllByTestId } = render(
      <Rating rating={4} />
    );
    
    const fullStars = queryAllByTestId('star-full');
    const emptyStars = queryAllByTestId('star-empty');
    expect(fullStars.length).toBe(4);
    expect(emptyStars.length).toBe(1);
  });

  it('should render half star for decimal ratings', () => {
    const { queryAllByTestId } = render(
      <Rating rating={4.5} />
    );
    
    const fullStars = queryAllByTestId('star-full');
    const halfStars = queryAllByTestId('star-half');
    const emptyStars = queryAllByTestId('star-empty');
    
    expect(fullStars.length).toBe(4);
    expect(halfStars.length).toBe(1);
    expect(emptyStars.length).toBe(0);
  });
});
