import ResetButton from '.';
import { render, screen } from '../../../vitest.setup';

describe('ResetButton', () => {
  test('should render a button with type reset', () => {
    render(<ResetButton />);
    const button = screen.getByRole('button', { name: /reset/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'reset');
  });

  test('should disable button when disabled prop is true', () => {
    render(<ResetButton disabled />);
    const button = screen.getByRole('button', { name: /reset/i });
    expect(button).toBeDisabled();
  });

  test('button is not clickable when disabled', () => {
    render(<ResetButton disabled />);
    const button = screen.getByRole('button', { name: /reset/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
