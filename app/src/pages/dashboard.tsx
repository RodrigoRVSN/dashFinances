import { useAuth } from '../contexts/auth'
import withSSRAuth from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user, signOut, finances } = useAuth()
  return (
    <div>
      <h1>{user.name}</h1>
      <button type='button' onClick={signOut}>
        sair
      </button>
      {finances.map((finance) => (
        <h1>{finance.name}</h1>
      ))}
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async () => ({
  props: {},
}))
