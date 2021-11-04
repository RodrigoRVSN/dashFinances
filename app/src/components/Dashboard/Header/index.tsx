import { useState } from 'react'
import { useAuth } from '../../../contexts/auth'
import ButtonSubmit from '../../ButtonSubmit'
import ModalAdd from '../ModalAdd'
import styles from './styles.module.scss'

export default function Header() {
  const { user, signOut } = useAuth()
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false)

  return (
    <header className={styles.header__container}>
      {!!user && (
        <>
          <div>
            {user.name && <h2>Olá, {user.name}!</h2>}
            <h5>{user.email}</h5>
          </div>
          <img src='/logo.png' alt='Logo dashfinances' />
          <div>
            <ButtonSubmit
              onClick={() => setModalAddIsOpen(true)}
              title="Nova finança"
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
