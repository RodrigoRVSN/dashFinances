import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import ButtonSubmit from '../../ButtonSubmit'
import ModalAdd from '../ModalAdd'
import styles from './styles.module.scss'

export default function Header() {
  const { user, signOut } = useAuth()
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false)

  return (
    <header className={`${styles.header__container} appearTop`}>
      {!!user && (
        <>
          <aside>
            {user.name && <h2>Olá, {user.name}!</h2>}
            <h5>{user.email}</h5>
          </aside>
          <img src='/logo.png' alt='Logo dashfinances' loading="lazy" />
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
