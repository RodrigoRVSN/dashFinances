import { InputHTMLAttributes, useState } from 'react'
import { FiShoppingBag, FiUser } from 'react-icons/fi'
import { MdOutlineMail } from 'react-icons/md'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  label: string
  type: string
  isAdd?: boolean
}

export default function Input({
  placeholder,
  type,
  label,
  isAdd,
  ...rest
}: InputProps) {
  const [focusedInput, setFocusedInput] = useState('')

  function handleFocusInput(selected: string) {
    setFocusedInput(selected)
  }

  return (
    <div className={styles.input__container} id={
      focusedInput === label ? styles.active : styles.disabled
    }>
      {isAdd ? <FiShoppingBag size="25px"/> : label === "E-mail" ? <MdOutlineMail size="25px" /> : <FiUser size="25px" />}
      <div>
        <label htmlFor='input__id'>{label}</label>
        <input
          required
          {...rest}

          type={type}
          onFocus={() => handleFocusInput(label)}
          onBlur={() => handleFocusInput('')}
          placeholder={placeholder}
          id='input__id'
        />
      </div>
    </div>
  )
}
