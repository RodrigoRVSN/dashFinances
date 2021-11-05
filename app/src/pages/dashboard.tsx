/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { FiArrowDown, FiArrowUp, FiLoader } from 'react-icons/fi'

import { IFinance, useAuth } from '../contexts/auth'

import FinancesTable from '../components/Dashboard/FinancesTable'
import Header from '../components/Dashboard/Header'
import Chart from '../components/Dashboard/Chart'

import FinancesService from '../services/FinancesService'
import withSSRAuth from '../utils/withSSRAuth'
import styles from '../styles/dashboard.module.scss'

export default function Dashboard() {
  const { finances, setFinances, refresh, loading, setLoading } = useAuth()
  const [tableDirection, setTableDirection] = useState('asc');

  function handleToggleDirectionTable() {
    setTableDirection((prevState) => prevState === 'asc' ? 'desc' : 'asc');
  }

  useEffect(() => {
    const { '@dashfinances.token': cookieToken } = parseCookies()
    if (cookieToken) {
      setLoading(true);
      FinancesService.getAll(tableDirection).then((res) => {
        const financesFormatted = res.map((finance: IFinance) => {
          return {
            ...finance,
            createdAt: new Date(finance.created).toLocaleDateString("pt-BR", {
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
  }, [refresh, tableDirection])

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
              <Chart />
              <aside>
                {tableDirection === 'asc' ? <FiArrowDown size={35} onClick={handleToggleDirectionTable} /> : <FiArrowUp size={35} onClick={handleToggleDirectionTable} />}
              </aside>
              <FinancesTable />
            </>
          )}
        </section>
      }
    </main>
  )
}



export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  }
);