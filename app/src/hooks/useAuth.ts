import { useContext } from "react"
import { AuthContext } from "../contexts/auth"
import { AuthContextData } from "../contexts/auth.types"

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  
  return context
}
