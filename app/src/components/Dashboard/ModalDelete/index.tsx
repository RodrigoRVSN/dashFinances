import { Dispatch, FormEvent, SetStateAction } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { IFinance, useAuth } from '../../../contexts/auth'
import FinancesService from '../../../services/FinancesService'
import ButtonSubmit from '../../ButtonSubmit'
import styles from './styles.module.scss'

interface ModalProps {
  modalAddIsOpen: boolean
  setModalAddIsOpen: Dispatch<SetStateAction<boolean>>
  finance: IFinance
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

export default function ModalDelete({
  modalAddIsOpen,
  setModalAddIsOpen,
  finance,
}: ModalProps) {
  const { refresh, setRefresh, setLoading } = useAuth()

  function closeModal() {
    setModalAddIsOpen(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setLoading(true);
      await FinancesService.deleteFinance(finance.id)
      setRefresh(!refresh)
      closeModal()
      toast.dark('✅ Exclusão realizada com sucesso!')
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
      <h2>Deseja mesmo excluir {finance.name}?</h2>
      <div onSubmit={handleSubmit}>
        <ButtonSubmit
          title='Excluir'
          onClick={(e: FormEvent) => handleSubmit(e)}
        />
        <ButtonSubmit title='Cancelar' onClick={closeModal} />
      </div>
    </Modal>
  )
}
