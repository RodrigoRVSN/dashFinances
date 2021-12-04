import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableRow, { TableRowProps } from ".";

import { finances } from '../../../tests/__mocks__/authProvider';

const data: TableRowProps = {
  finance: finances[0],
  editSelect: '',
  setEditSelect: jest.fn(),
}

const setup = (props = data) => {
  const renderResult = render(
    <TableRow {...data} />
  );

  const inputName = screen.getByDisplayValue(finances[0].name);
  const inputAmount = screen.getByDisplayValue(finances[0].amount);
  const inputCategory = screen.getByDisplayValue(finances[0].category);
  const buttonEdit = screen.getByTestId('button-edit');
  const buttonRemove = screen.getByTestId('button-remove');

  return {
    inputName,
    inputAmount,
    inputCategory,
    buttonEdit,
    buttonRemove,
    ...props,
    ...renderResult
  }
}

describe("<TableRow />", () => {
  it("Should render table row with mock", () => {
    const { getByText, inputName, inputAmount, inputCategory } = setup();

    expect(inputName).toBeInTheDocument();
    expect(inputAmount).toBeInTheDocument();
    expect(inputCategory).toBeInTheDocument();
    expect(getByText(finances[0].createdAt)).toBeInTheDocument();
  });

  it("Should be able to edit on click edit button", async () => {
    const { inputName, buttonEdit, rerender, finance, setEditSelect } = setup(data);

    expect(inputName).toBeDisabled();

    userEvent.click(buttonEdit);

    rerender(<TableRow editSelect={finance.id} finance={finance} setEditSelect={setEditSelect} />)

    expect(screen.getByTestId('button-cancel-edit')).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'netflix' } })
    expect(inputName).toHaveDisplayValue('netflix');

  });
});
