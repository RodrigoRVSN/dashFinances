import { FiLoader } from 'react-icons/fi'
import styles from './styles.module.scss'

interface ButtonSubmitProps {
  title: string
  onClick?: any
  loading?: boolean
  disabled?: boolean
}

export default function ButtonSubmit({
  title,
  disabled,
  loading,
  onClick = () => undefined,
}: ButtonSubmitProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={styles.button__container}
      type='submit'
    >
      {loading ? <FiLoader className="loader" size={16.2} /> : title}

    </button>
  )
}
