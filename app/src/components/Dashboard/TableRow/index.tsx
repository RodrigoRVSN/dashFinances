import { Dispatch, SetStateAction, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { IFinance, useAuth } from '../../../contexts/auth'
import ModalDelete from '../ModalDelete'

import styles from './styles.module.scss'
import FinancesService from '../../../services/FinancesService'

interface TableRowProps {
  finance: IFinance
  setEditSelect: Dispatch<SetStateAction<string>>
  editSelect: string
}

export default function TableRow({
  finance,
  setEditSelect,
  editSelect,
}: TableRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(finance.name)
  const [category, setCategory] = useState(finance.category)
  const [amount, setAmount] = useState(finance.amount as unknown as number)
  const { refresh, setRefresh, setLoading } = useAuth()

  function handleGoEdit() {
    setEditSelect(finance.id)
  }

  async function handleEditInput() {
    try {
      setLoading(true);
      await FinancesService.updateFinance(name, category, amount, finance.id)
      setEditSelect('')
      setRefresh(!refresh)
      toast.dark('✅ Edição feita com sucesso!')
    } catch (error: any) {
      toast.error(error.message)
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <tr className={styles.table__row}>
        <td>{finance.created}</td>
        <td>
          <input
            disabled={finance.id !== editSelect}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
        </td>
        <td>
          <input
            disabled={finance.id !== editSelect}
            onChange={(ev) => setCategory(ev.target.value)}
            value={category}
          />
        </td>
        <td>
          <input
            type='number'
            className={amount < 0 ? styles.negative : styles.positive}
            disabled={finance.id !== editSelect}
            onChange={(ev) => setAmount(Number(ev.target.value))}
            value={amount}
          />
        </td>
        <td>
          <button type='button'>
            {finance.id !== editSelect ? (
              <FiEdit size={20} onClick={handleGoEdit} />
            ) : (
              <AiOutlineCheckCircle size={20} onClick={handleEditInput} />
            )}
          </button>
          <button type='button' onClick={() => setIsOpen(true)}>
            <FiTrash2 size={20} />
          </button>
        </td>
      </tr>
      <ModalDelete
        finance={finance}
        modalAddIsOpen={isOpen}
        setModalAddIsOpen={setIsOpen}
      />
    </>
  )
}
