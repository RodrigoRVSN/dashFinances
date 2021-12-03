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

  it("Should focus input", () => {
    const { inputElement } = setup();
    const handleFocus = jest.fn();

    inputElement.focus();
    expect(document.activeElement === inputElement).toBeTruthy();
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });
});
