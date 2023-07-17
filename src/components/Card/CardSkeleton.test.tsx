import React from 'react';
import { render } from '@testing-library/react';
import CardSkeleton from './CardSkeleton';

describe('CardSkeleton', () => {
  it('should render the correct number of skeleton cards', () => {
    const { container } = render(<CardSkeleton count={0} />);
    expect(container.querySelectorAll('.card.skeleton')).toHaveLength(0);

    const { container: container1 } = render(<CardSkeleton count={1} />);
    expect(container1.querySelectorAll('.card.skeleton')).toHaveLength(1);

    const { container: container2 } = render(<CardSkeleton count={5} />);
    expect(container2.querySelectorAll('.card.skeleton')).toHaveLength(5);
  });

  it('should have the correct structure and classes for the skeleton cards', () => {
    const { container } = render(<CardSkeleton count={3} />);
    const skeletonCards = container.querySelectorAll('.card.skeleton');

    skeletonCards.forEach((card) => {
      expect(card.querySelector('.skeleton-content')).toBeTruthy();
      expect(card.querySelector('.skeleton-image')).toBeTruthy();
      expect(card.querySelector('.skeleton-title')).toBeTruthy();
      expect(card.querySelectorAll('.skeleton-text')).toHaveLength(2);
    });
  });

  it('should display skeleton cards in a grid layout', () => {
    const { container } = render(<CardSkeleton count={3} />);
    expect(container.querySelector('.card-grid')).toBeTruthy();
  });
});
