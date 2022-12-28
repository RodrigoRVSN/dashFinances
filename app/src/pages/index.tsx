import { useState } from 'react'
import Head from 'next/head'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'

import withSSRGuest from '../utils/withSSRGuesst'
import styles from '../styles/home.module.scss'
import Image from 'next/image'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleLoginButton = () => {
    setIsLogin(prevState => !prevState)
  }

  return (
    <>
      <Head>
        <title>Início | Dashfinances</title>
      </Head>
    
      <div className={styles.home__container}>
        <Image 
          className="appearRight"
          src='/investing.svg'
          aria-hidden
          height={560}
          width={560}
        />

        <main className="appearTop">
          <Image
            width={160}
            height={160}
            src='/logo.png'
            alt='logo'
          />

          <aside>
            <button
              onClick={handleToggleLoginButton}
              className={isLogin ? styles.active : ''}
              type='button'
            >
              Entrar
            </button>
            <button
              onClick={handleToggleLoginButton}
              className={!isLogin ? styles.active : ''}
              type='button'
            >
              Registrar
            </button>
          </aside>

          {isLogin ? <FormLogin  /> : <FormRegister setIsLogin={setIsLogin} />}
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async () => ({
  props: {},
}))
