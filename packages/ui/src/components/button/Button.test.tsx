import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
