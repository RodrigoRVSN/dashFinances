import { render } from "@testing-library/react";
import FinancesTable from ".";

describe("<FinancesTable />", () => {
  it("should render finances table", () => {
    render(<FinancesTable />);
  });
});
