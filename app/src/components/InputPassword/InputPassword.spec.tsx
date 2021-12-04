import { render, fireEvent, screen } from "@testing-library/react";
import InputPassword from ".";

const setup = () => {
  const renderResult = render(
    <InputPassword placeholder="senha" label="senha" />
  );

  const inputElement = screen.getByPlaceholderText('senha')

  return {
    inputElement,
    ...renderResult
  }
}

describe("<InputPassword />", () => {
  it("Should toggle type password", () => {
    const { inputElement } = setup();

    fireEvent.click(screen.getByTestId('eye-off'));
    expect(inputElement).toHaveAttribute('type', 'text')

    fireEvent.click(screen.getByTestId('eye-on'));
    expect(inputElement).toHaveAttribute('type', 'password')
  });

  it("Should focus and blur input", () => {
    const { inputElement } = setup();

    inputElement.focus();
    expect(inputElement).toHaveFocus();
    inputElement.blur();
    expect(inputElement).not.toHaveFocus();
  });
});
