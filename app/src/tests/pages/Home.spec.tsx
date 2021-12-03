import { render, fireEvent } from "@testing-library/react"
import Home from "../../pages";

describe('<Home />', () => {
  it('Should change the form between register and login', () => {
    const { getByRole, getByText } = render(<Home />);

    fireEvent.click(getByRole('button', { name: /registrar/i }));
    expect(getByText('REGISTRAR')).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: /entrar/i }));
    expect(getByText('ENTRAR')).toBeInTheDocument();
  })
})