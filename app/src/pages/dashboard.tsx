/* eslint-disable arrow-body-style */
import { useEffect } from 'react'
import { parseCookies } from 'nookies'
import FinancesTable from '../components/Dashboard/FinancesTable'
import { useAuth } from '../contexts/auth'
import withSSRAuth from '../utils/withSSRAuth'

import styles from '../styles/dashboard.module.scss'
import Header from '../components/Dashboard/Header'
import FinancesService from '../services/FinancesService'

export default function Dashboard() {
  const { finances, setFinances, refresh } = useAuth()

  useEffect(() => {
    const { '@dashfinances.token': cookieToken } = parseCookies()
    if (cookieToken) {
      FinancesService.getAll().then((res) => {
        setFinances(res)
      })
    }
  }, [refresh])

  return (
    <main className={styles.dashboard__container}>
      <Header />

      <section>
        {!finances.length ? (
          <>
            <span>Nenhuma finança registrada ainda!</span>
            <img src='/bear.svg' alt='Urso investidor' />
          </>
        ) : (
          <>
            {/* CHART */}
            <FinancesTable />
          </>
        )}
      </section>
    </main>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})
