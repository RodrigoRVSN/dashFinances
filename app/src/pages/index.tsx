import React, { useState } from 'react'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'

import styles from '../styles/home.module.scss'
import withSSRGuest from '../utils/withSSRGuesst'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className={styles.home__container}>
      <img src='/investing.svg' alt='Investindo' />
      <div>
        <img src='/logo.png' alt='logo' />
        <div>
          <button
            onClick={() => setIsLogin(true)}
            className={isLogin ? styles.active : ''}
            type='button'
          >
            Entrar
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={!isLogin ? styles.active : ''}
            type='button'
          >
            Registrar
          </button>
        </div>
        {isLogin ? <FormLogin /> : <FormRegister setIsLogin={setIsLogin} />}
      </div>
    </main>
  )
}

export const getServerSideProps = withSSRGuest(async () => ({
  props: {},
}))
