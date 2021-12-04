import { render } from "@testing-library/react";
import FinancesTable from ".";
import { AuthContext } from "../../../contexts/auth";

import data from '../../../tests/__mocks__/authProvider';

describe("<FinancesTable />", () => {
  it("Should render finances table", () => {
    render(
      <AuthContext.Provider value={{ ...data }}>
        <FinancesTable />
      </AuthContext.Provider>
    );
  });
});
