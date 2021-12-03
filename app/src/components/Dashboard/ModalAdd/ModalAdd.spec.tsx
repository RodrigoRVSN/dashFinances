import { render } from "@testing-library/react"
import ModalAdd from "."

describe('<ModalAdd />', () => {
  it('Should render the ModalAdd', () => {
    const fn = jest.fn();

    const { getByText } = render(<ModalAdd modalAddIsOpen setModalAddIsOpen={fn} />)

    expect(getByText('Inserir nova transação')).toBeInTheDocument();

  })
})