import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { useAuth } from '../../../hooks/useAuth'
import FinancesService from '../../../services/FinancesService'
import ButtonSubmit from '../../ButtonSubmit'
import Input from '../../Input'
import styles from './styles.module.scss'

interface ModalProps {
  modalAddIsOpen: boolean
  setModalAddIsOpen: Dispatch<SetStateAction<boolean>>
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export default function ModalAdd({
  modalAddIsOpen,
  setModalAddIsOpen,
}: ModalProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('' as unknown as number)
  const { refresh, setRefresh, setLoading } = useAuth()

  function closeModal() {
    setName('')
    setCategory('')
    setAmount('' as unknown as number)
    setModalAddIsOpen(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await FinancesService.newFinance(name, category, amount)
      setLoading(true)
      closeModal()
      setRefresh(!refresh)
      toast.dark('✅ Adição realizada com sucesso!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={modalAddIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={styles.modal__container}
      ariaHideApp={false}
    >
      <h2>Inserir nova transação</h2>
      <form onSubmit={handleSubmit}>
        <Input
          isAdd
          type='text'
          onChange={(ev) => setName(ev.target.value)}
          value={name}
          placeholder='Digite o nome'
          label='Nome'
        />
        <Input
          isAdd
          type='text'
          onChange={(ev) => setCategory(ev.target.value)}
          value={category}
          placeholder='Digite a categoria'
          label='Categoria'
        />
        <Input
          isAdd
          type='number'
          pattern='[0-9]*'
          onChange={(ev) => setAmount(Number(ev.target.value))}
          value={amount}
          placeholder='Digite o valor'
          label='Valor'
        />
        <ButtonSubmit
          title='Nova transação'
          disabled={!amount || !category || !name}
        />
      </form>
    </Modal>
  )
}
