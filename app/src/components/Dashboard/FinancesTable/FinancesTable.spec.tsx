import { render } from "@testing-library/react";
import FinancesTable from ".";

describe("FinancesTable component", () => {
  it("should render finances table", () => {
    render(<FinancesTable />);
  });
});
