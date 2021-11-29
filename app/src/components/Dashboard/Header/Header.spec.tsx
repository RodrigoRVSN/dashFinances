import { render, fireEvent } from "@testing-library/react";
import Header from ".";
import { AuthProvider } from "../../../contexts/auth";
import ModalAdd from "../ModalAdd";

describe("<Header />", () => {
  it("Should render Header and open modal", () => {
    const handleOpen = jest.fn();

    const { getByText, debug } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    debug();

    fireEvent.click(getByText('Nova finança'));

    const { getAllByText } = render(<ModalAdd modalAddIsOpen={false} setModalAddIsOpen={handleOpen} />);

    expect(getAllByText('Inserir nova transação'));
  });
});
