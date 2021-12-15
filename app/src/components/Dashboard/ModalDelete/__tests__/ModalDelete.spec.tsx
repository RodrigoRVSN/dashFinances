import { render, screen, fireEvent } from "@testing-library/react"
import ModalDelete from ".."
import { finances } from "../../../../tests/__mocks__/authProvider"

const setup = () => {
  const toggleFn = jest.fn();

  const renderResult = render(<ModalDelete finance={finances[0]} modalAddIsOpen={true} setModalAddIsOpen={toggleFn} />)

  const cancelButton = screen.getByRole('button', { name: /cancelar/i });
  const removeButton = screen.getByRole('button', { name: /excluir/i });

  return {
    toggleFn,
    cancelButton,
    removeButton,
    ...renderResult
  }
}

describe('<ModalDelete />', () => {
  it('Should render buttons and close modal', () => {
    const { cancelButton, toggleFn } = setup();

    fireEvent.click(cancelButton);
    expect(toggleFn).toHaveBeenCalledTimes(1);
  });
})