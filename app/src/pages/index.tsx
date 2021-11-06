import { useState } from 'react'
import Head from 'next/head'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'

import withSSRGuest from '../utils/withSSRGuesst'
import styles from '../styles/home.module.scss'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className={styles.home__container}>
      <Head>
        <title>Início | Dashfinances</title>
      </Head>
      <img className="appearRight" src='/investing.svg' alt='Investindo' loading="lazy" />
      <main className="appearTop">
        <img src='/logo.png' alt='logo' loading="lazy" />
        <aside>
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
        </aside>
        {isLogin ? <FormLogin  /> : <FormRegister setIsLogin={setIsLogin} />}
      </main>
    </div>
  )
}

export const getServerSideProps = withSSRGuest(async () => ({
  props: {},
}))
