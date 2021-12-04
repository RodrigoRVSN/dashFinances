
import { AuthContextData, IFinance, IUser } from "../../contexts/auth"

export const finances: IFinance[] = [{
  id: '1',
  name: 'freela',
  category: 'trabalho',
  amount: 3000,
  created: '04/12/2021',
  createdAt: '04/12/2021',
}, {
  id: '2',
  name: 'frango',
  category: 'comida',
  amount: -70,
  created: '04/12/2021',
  createdAt: '04/12/2021',
}
]

const user: IUser = {
  email: 'johndoe@gmail.com',
  name: 'John Doe',
  token: 'aoiaoiaoi'
}

const data: AuthContextData = {
  loading: false,
  setLoading: jest.fn(),
  finances,
  setFinances: jest.fn(),
  refresh: false,
  setRefresh: jest.fn(),
  setToken: () => 'string',
  token: 'aoiaoiaoi',
  setUser: jest.fn(),
  user,
  signOut: jest.fn()
};

export default data