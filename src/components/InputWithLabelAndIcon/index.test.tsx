import { render } from '@testing-library/react';
import InputWithLabelAndIcon from '.';
import User from '../Icons/User';

const renderInputWithLabelAndIcon = () =>
  render(
    <InputWithLabelAndIcon
      name="name"
      label="Name"
      placeholder="Enter you name"
      type="text"
      icon={<User />}
    />,
  );

describe('InputWithLabelAndIcon', () => {
  test('should render successfully', () => {
    renderInputWithLabelAndIcon();
  });
});
