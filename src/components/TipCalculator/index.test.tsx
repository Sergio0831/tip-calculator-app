import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TipCalculator from '.';

const renderTipCalculator = () => render(<TipCalculator />);

describe('TipCalculator', () => {
  const user = userEvent.setup();

  test('should initialize state variables to default values', () => {
    renderTipCalculator();

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const customTipInput = screen.getByPlaceholderText<HTMLInputElement>('Custom');
    const resetButton = screen.getByRole('button', { name: 'reset' });

    expect(billInput).toHaveValue(null);
    expect(customTipInput.value).toBe('');
    expect(peopleInput).toHaveValue(null);
    expect(resetButton).toBeDisabled();
  });

  test('should calculate tip amount correctly', async () => {
    renderTipCalculator();

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const tipButton = screen.getByRole('button', { name: '15%' });

    await user.type(billInput, '420');
    await user.type(peopleInput, '4');
    await user.click(tipButton);

    expect(screen.getByText(/\$?15\.75/)).toBeInTheDocument();
  });

  test('should calculate total amount correctly', async () => {
    renderTipCalculator();

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const tipButton = screen.getByRole('button', { name: '10%' });

    await user.type(billInput, '560');
    await user.type(peopleInput, '5');
    await user.click(tipButton);

    expect(screen.getByText(/\$?123\.20/)).toBeInTheDocument();
  });

  test('should calculate tip amount and total amount correctly when custom tip is entered', async () => {
    renderTipCalculator();

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const customTip = screen.getByPlaceholderText('Custom');

    await user.type(billInput, '120');
    await user.type(peopleInput, '2');
    await user.type(customTip, '3');

    expect(screen.getByText('$1.80')).toBeInTheDocument();
    expect(screen.getByText('$61.80')).toBeInTheDocument();
  });
});
