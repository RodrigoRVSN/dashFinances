import { FormEvent, useState, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import ButtonSubmit from '../ButtonSubmit'
import ContactsService from '../services/ContactsService'

import styles from './styles.module.scss'
import Input from '../Input'

interface FormRegisterProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function FormRegister({ setIsLogin }: FormRegisterProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await ContactsService.register(name, email, password)
      toast.dark('✅ Conta criada com sucesso!');
      setIsLogin(true)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form__container}>
      <h1>Bem-vindo! 💲</h1>

      <Input
        type='text'
        onChange={(ev) => setName(ev.target.value)}
        value={name}
        placeholder='Digite seu nome'
        label='Nome'
      />
      <Input
        type='email'
        onChange={(ev) => setEmail(ev.target.value)}
        value={email}
        placeholder='Digite seu e-mail'
        label='E-mail'
      />
      <Input
        type='password'
        onChange={(ev) => setPassword(ev.target.value)}
        value={password}
        placeholder='Digite sua senha'
        label='Senha'
      />
      <ButtonSubmit title='REGISTRAR' />
    </form>
  )
}
