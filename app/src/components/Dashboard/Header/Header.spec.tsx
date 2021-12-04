import { render, fireEvent, screen } from "@testing-library/react";
import Header from ".";
import { AuthContext } from "../../../contexts/auth";
import data from "../../../tests/__mocks__/authProvider";

describe("<Header />", () => {
  it("Should render Header and open modal", () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ ...data }}>
        <Header />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText(/Nova finança/i));
    expect(getByText('Inserir nova transação')).toBeInTheDocument();

  });
  it("Should sign out user in header button", () => {
    render(
      <AuthContext.Provider value={{ ...data }}>
        <Header />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText(/Sair/i));

    expect(data.signOut).toHaveBeenCalled();
  })
});
