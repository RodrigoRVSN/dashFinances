import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import {
  createContext,
  useEffect,
  useState,
} from 'react'
import UsersServices from '../services/UsersServices'
import { AuthContextData, AuthProviderProps, IUser } from './auth.types'


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
