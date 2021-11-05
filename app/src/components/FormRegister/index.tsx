import { FormEvent, useState, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import ButtonSubmit from '../ButtonSubmit'

import styles from './styles.module.scss'
import Input from '../Input'
import UsersServices from '../../services/UsersServices'
import InputPassword from '../InputPassword'

interface FormRegisterProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function FormRegister({ setIsLogin }: FormRegisterProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setLoading(true);
      await UsersServices.register(name, email, password)
      toast.dark('✅ Conta criada com sucesso!');
      setIsLogin(true)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false);
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
      <InputPassword
        type='password'
        onChange={(ev) => setPassword(ev.target.value)}
        value={password}
        placeholder='Digite sua senha'
        label='Senha'
      />
      <ButtonSubmit loading={loading} title='REGISTRAR' />
    </form>
  )
}
