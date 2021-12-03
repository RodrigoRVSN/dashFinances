import { render, fireEvent, screen } from "@testing-library/react";
import InputPassword from ".";

describe("<InputPassword />", () => {
  it("Should toggle type password", () => {
    render(
      <InputPassword placeholder="senha" label="senha" />
    );

    fireEvent.click(screen.getByTestId('eye-off'));
    expect(screen.getByPlaceholderText('senha')).toHaveAttribute('type', 'text')

    fireEvent.click(screen.getByTestId('eye-on'));
    expect(screen.getByPlaceholderText('senha')).toHaveAttribute('type', 'password')
  });

  it("Should clear and focus input", () => {
    render(
      <InputPassword placeholder="senha" label="senha" />
    );

    screen.getByPlaceholderText('senha');
  });
});
