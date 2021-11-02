import FormLogin from '../components/FormLogin'

import styles from '../styles/home.module.scss'
import withSSRGuest from '../utils/withSSRGuesst'

export default function Home() {
  return (
    <div className={styles.home__container}>
      <img src='/investing.svg' alt='Investindo' />
      <div>
        <img src='/logo.png' alt='logo' />
        <FormLogin />
      </div>
    </div>
  )
}

export const getServerSideProps = withSSRGuest(async () => ({
    props: {}
  }))