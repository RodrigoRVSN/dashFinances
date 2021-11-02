import { useState } from 'react'
import { useAuth } from '../../../contexts/auth'
import ButtonSubmit from '../../ButtonSubmit'
import ModalAdd from '../ModalAdd'
import styles from './styles.module.scss'

export default function Header() {
  const { user, signOut, finances } = useAuth()
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false)

  return (
    <header className={styles.header__container}>
      {!!user && (
        <>
          <div>
            <h5>{user.email}</h5>
            {user.name && <h1>Olá, {user.name}!</h1>}
          </div>
          <img src='/logo.png' alt='Logo dashfinances' />
          <div>
            <ButtonSubmit
              onClick={() => setModalAddIsOpen(true)}
              title={`+ ${finances.length}
              ${finances.length === 1 ? ' finança' : ' finanças'}`}
            />
            <ButtonSubmit onClick={signOut} title='Sair' />
          </div>
        </>
      )}
      <ModalAdd
        modalAddIsOpen={modalAddIsOpen}
        setModalAddIsOpen={setModalAddIsOpen}
      />
    </header>
  )
}
