import { Dispatch, ReactNode, SetStateAction } from 'react'

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

export interface AuthProviderProps {
  children: ReactNode
}