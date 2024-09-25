import { render, screen } from '@testing-library/react';
import TipCalculator from '.';

const renderTipCalculator = () => render(<TipCalculator />);

describe('TipCalculator', () => {
  test('should initialize state variables to default values', () => {
    renderTipCalculator();
    expect(screen.getByLabelText('Bill')).toHaveValue(null);
    expect(screen.getByPlaceholderText<HTMLInputElement>('Custom').value).toBe('');
    expect(screen.getByLabelText('Number of People')).toHaveValue(null);
    expect(screen.getByRole('button', { name: 'reset' })).toBeDisabled();
  });
});
