import { render } from "@testing-library/react";
import Header from ".";

describe("Header component", () => {
  it("should render users info", () => {
    render(<Header />);
  });
});
