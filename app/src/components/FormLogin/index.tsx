import Router from 'next/router'
import { FormEvent, useState } from 'react'
import { setCookie } from 'nookies'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth'
import ButtonSubmit from '../ButtonSubmit'
import ContactsService from '../services/ContactsService'

import styles from './styles.module.scss'
import Input from '../Input'

export default function FormLogin() {
  const { setUser, setToken } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const data = await ContactsService.login(email, password)

      setCookie(undefined, '@dashfinances.token', data.token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      
      setUser(data)
      setToken(data.token)
      toast.dark('✅ Login feito com sucesso!');

      Router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form__container}>
      <h1>Bem-vindo de volta! 💲</h1>

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
      <ButtonSubmit title='ENTRAR' />
    </form>
  )
}
