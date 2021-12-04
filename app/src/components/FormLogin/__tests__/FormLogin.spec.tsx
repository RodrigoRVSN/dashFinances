import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { mocked } from 'ts-jest/utils';
import FormLogin from "..";

jest.mock('next/router')

describe('<FormLogin />', () => {
  it('Should not redirect without input data', () => {
    const { getByText } = render(<FormLogin />);
    const useRouterMocked = mocked(useRouter)
    const routerMock = jest.fn();

    userEvent.click(getByText('ENTRAR'));

    useRouterMocked.mockReturnValueOnce({
      push: routerMock,
    } as any)

    expect(routerMock).not.toHaveBeenCalled();

  })
})