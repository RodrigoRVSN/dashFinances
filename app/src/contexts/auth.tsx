import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import UsersServices from '../services/UsersServices'

export interface IUser {
  token: string
  email: string
  name: string
}

export interface IFinance {
  id: string
  name: string
  category: string
  amount: number
  created: string;
  createdAt: string;
}

export interface AuthContextData {
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>>
  finances: IFinance[]
  setFinances: Dispatch<SetStateAction<never[]>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [token, setToken] = useState('')
  const [finances, setFinances] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)

  function signOut() {
    setLoading(true);
    destroyCookie(undefined, '@dashfinances.token')
    setUser({} as IUser)
    setFinances([])
    Router.push('/')
    setLoading(false);
  }

  useEffect(() => {
    const { '@dashfinances.token': cookieToken } = parseCookies()

    if (cookieToken) {
      UsersServices.me().then((res) => {
        setUser(res)
        setToken(cookieToken)
      })
    }
  }, [finances])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        finances,
        setFinances,
        signOut,
        refresh,
        setRefresh,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  return context
}
