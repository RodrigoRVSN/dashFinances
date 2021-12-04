import { render, screen } from "@testing-library/react";

import Input from '.'


const setup = () => {
  const renderResult = render(
    <Input placeholder="email" label="email" type="email" />
  );

  const inputElement = screen.getByPlaceholderText('email')

  return {
    inputElement,
    ...renderResult
  }
}

describe("ActiveLink component", () => {
  it("Should focus and blur input", () => {
    const { inputElement } = setup();

    inputElement.focus();
    expect(inputElement).toHaveFocus();
    inputElement.blur();
    expect(inputElement).not.toHaveFocus();
  });
});
