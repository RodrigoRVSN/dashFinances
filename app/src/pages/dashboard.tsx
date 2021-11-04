/* eslint-disable arrow-body-style */
import { useEffect } from 'react'
import { parseCookies } from 'nookies'
import { FiLoader } from 'react-icons/fi'
import FinancesTable from '../components/Dashboard/FinancesTable'
import { IFinance, useAuth } from '../contexts/auth'

import styles from '../styles/dashboard.module.scss'
import Header from '../components/Dashboard/Header'
import FinancesService from '../services/FinancesService'

export default function Dashboard() {
  const { finances, setFinances, refresh, loading, setLoading } = useAuth()

  useEffect(() => {
    const { '@dashfinances.token': cookieToken } = parseCookies()
    if (cookieToken) {
      setLoading(true);
      FinancesService.getAll().then((res) => {
        const financesFormatted = res.map((finance: IFinance) => {
          return {
            ...finance,
            created: new Date(finance.created).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }),
          }
        }
        )
        setFinances(financesFormatted)
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [refresh])

  return (
    <main className={styles.dashboard__container}>
      <Header />

      {loading ?
        <FiLoader className="loader" size={60} />
        :
        <section>
          {!finances.length ? (
            <div>
              <span>Nenhuma finança registrada ainda!</span>
              <img src='/bear.svg' alt='Urso investidor' />
            </div>
          ) : (
            <>
              {/* CHART */}
              <h1>Pronto para organizar suas finanças?</h1>
              <FinancesTable />
            </>
          )}
        </section>
      }
    </main>
  )
}


