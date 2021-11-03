import styles from './styles.module.scss'

interface ButtonSubmitProps {
  title: string
  onClick?: any
  disabled?: boolean 
}

export default function ButtonSubmit({
  title,
  disabled,
  onClick = () => undefined,
}: ButtonSubmitProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button__container}
      type='submit'
    >
      {title}
    </button>
  )
}
