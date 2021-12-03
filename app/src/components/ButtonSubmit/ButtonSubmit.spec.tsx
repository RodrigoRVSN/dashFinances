import { render, screen, fireEvent } from "@testing-library/react"
import ButtonSubmit from "."

describe("<ButtonSubmit />", () => {
  it("Should render button submit", () => {
    render(<ButtonSubmit title="title" />)
    expect(screen.getByRole("button", { name: /title/i })).toBeInTheDocument();
  });

  it("Should not call function on button disabled", () => {
    const fn = jest.fn();

    render(<ButtonSubmit title="title" disabled onClick={fn} />)
    fireEvent.click(screen.getByRole("button", { name: /title/i }));

    expect(fn).not.toHaveBeenCalled();
  });

  it("Should call Loading Component in loading state", () => {

    const { container } = render(<ButtonSubmit title="title" loading />);
    expect(container.getElementsByClassName('loader').length).toBe(1);
  });
})