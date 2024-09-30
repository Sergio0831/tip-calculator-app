import TipCalculator from '.';
import { render, screen, setup } from '../../../vitest.setup';

const renderTipCalculator = () => render(<TipCalculator />);

describe('TipCalculator', () => {
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
    const { user } = setup(<TipCalculator />);

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const tipButton = screen.getByRole('button', { name: '15%' });

    await user.type(billInput, '420');
    await user.type(peopleInput, '4');
    await user.click(tipButton);

    expect(screen.getByText(/\$?15\.75/)).toBeInTheDocument();
  });

  test('should calculate total amount correctly', async () => {
    const { user } = setup(<TipCalculator />);

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const tipButton = screen.getByRole('button', { name: '10%' });

    await user.type(billInput, '560');
    await user.type(peopleInput, '5');
    await user.click(tipButton);

    expect(screen.getByText(/\$?123\.20/)).toBeInTheDocument();
  });

  test('should calculate tip amount and total amount correctly when custom tip is entered', async () => {
    const { user } = setup(<TipCalculator />);

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const customTip = screen.getByPlaceholderText('Custom');

    await user.type(billInput, '120');
    await user.type(peopleInput, '2');
    await user.type(customTip, '3');

    expect(screen.getByText('$1.80')).toBeInTheDocument();
    expect(screen.getByText('$61.80')).toBeInTheDocument();
  });

  test('should display error message when people input is zero', async () => {
    const { user } = setup(<TipCalculator />);

    const peopleInput = screen.getByLabelText('Number of People');
    await user.type(peopleInput, '0');
    expect(screen.getByText("Can't be zero")).toBeInTheDocument();
  });

  test('should clear all inputs and states when reset button is clicked', async () => {
    const { user } = setup(<TipCalculator />);

    const billInput = screen.getByLabelText('Bill');
    const peopleInput = screen.getByLabelText('Number of People');
    const tipButton = screen.getByRole('button', { name: '15%' });

    await user.type(billInput, '420');
    await user.type(peopleInput, '4');
    await user.click(tipButton);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);

    expect(billInput).toHaveValue(null);
    expect(tipButton).toHaveAttribute('aria-pressed', 'false');
    expect(peopleInput).toHaveValue(null);
    expect(screen.queryByText("Can't be zero")).toBeNull();
    expect(resetButton).toBeDisabled();
  });
});
