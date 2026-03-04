import React from 'react';
import { render } from '@testing-library/react-native';
import Tags from '../src/components/tag';

describe('Tag Component', () => {
  it('should render tag with text', () => {
    const { getByText } = render(
      <Tags title="Indian" />
    );
    expect(getByText('INDIAN')).toBeTruthy();
  });

  it('should render multiple tags', () => {
    const { getByText } = render(
      <>
        <Tags title="Indian" />
        <Tags title="Spicy" />
        <Tags title="Healthy" />
      </>
    );
    expect(getByText('INDIAN')).toBeTruthy();
    expect(getByText('SPICY')).toBeTruthy();
    expect(getByText('HEALTHY')).toBeTruthy();
  });
});
