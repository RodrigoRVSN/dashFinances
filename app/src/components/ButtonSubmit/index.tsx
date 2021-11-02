import styles from './styles.module.scss'

interface ButtonSubmitProps {
  title: string
}

export default function ButtonSubmit({ title }: ButtonSubmitProps) {
  return (
    <button className={styles.button__container} type='submit'>
      {title}
    </button>
  )
}
