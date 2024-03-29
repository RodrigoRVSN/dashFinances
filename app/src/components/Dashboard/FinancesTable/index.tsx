import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import TableRow from '../TableRow'
import styles from './styles.module.scss'

export default function FinancesTable() {
  const { finances } = useAuth()
  const [editSelect, setEditSelect] = useState('')

  return (
    <div className={styles.table__container}>
      <table className="appearRight">
        <thead>
          <tr>
            <td>Data</td>
            <td>Nome</td>
            <td>
              <p>Descrição</p>
            </td>
            <td>Valor (R$)</td>
            <td />
          </tr>
        </thead>

        <tbody>
          {finances && finances.map((finance) => (
            <TableRow
              editSelect={editSelect}
              setEditSelect={setEditSelect}
              finance={finance}
              key={finance.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
