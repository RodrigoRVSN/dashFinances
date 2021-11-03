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

interface IUser {
  token: string
  email: string
  name: string
}

export interface IFinance {
  id: string
  name: string
  category: string
  amount: number
}

interface AuthContextData {
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>>
  finances: IFinance[]
  setFinances: Dispatch<SetStateAction<never[]>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [token, setToken] = useState('')
  const [finances, setFinances] = useState([])
  const [refresh, setRefresh] = useState(false)

  async function signOut() {
    destroyCookie(undefined, '@dashfinances.token')
    setUser({} as IUser)
    setFinances([])
    Router.push('/')
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
