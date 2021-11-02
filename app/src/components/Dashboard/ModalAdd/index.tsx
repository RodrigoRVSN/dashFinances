import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { useAuth } from '../../../contexts/auth'
import ButtonSubmit from '../../ButtonSubmit'
import Input from '../../Input'
import FinancesService from '../../services/FinancesService'
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
  const { refresh, setRefresh } = useAuth()

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
      setRefresh(!refresh)
      closeModal()
      toast.dark('✅ Adição realizada com sucesso!')
    } catch (err) {
      toast.error(error.message)
    }
  }

  return (
    <Modal
      isOpen={modalAddIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={styles.modal__container}
    >
      <h2>Inserir nova transação</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          onChange={(ev) => setName(ev.target.value)}
          value={name}
          placeholder='Digite o nome'
          label='Nome'
        />
        <Input
          type='text'
          onChange={(ev) => setCategory(ev.target.value)}
          value={category}
          placeholder='Digite a cateegoria'
          label='Categoria'
        />
        <Input
          type='number'
          pattern='[0-9]*'
          onChange={(ev) => setAmount(Number(ev.target.value))}
          value={amount}
          placeholder='Digite o valor'
          label='Valor'
        />
        <ButtonSubmit title='Criar' disabled={!amount || !category || !name} />
      </form>
    </Modal>
  )
}
