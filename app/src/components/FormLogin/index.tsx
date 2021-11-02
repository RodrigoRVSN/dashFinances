import Router from 'next/router'
import { FormEvent, useState } from 'react'
import { setCookie } from 'nookies'
import { useAuth } from '../../contexts/auth'
import ButtonSubmit from '../ButtonSubmit'
import ContactsService from '../services/ContactsService'
import Input from './Input'

import styles from './styles.module.scss'

export default function FormLogin() {
  const { setUser, setToken } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const data = await ContactsService.login(email, password)

      setUser(data)
      setToken(data.token)
      setCookie(undefined, '@dashfinances.token', data.token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      Router.push('/dashboard')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form__container}>
      <h1>Entre em sua conta</h1>

      <Input
        onChange={(ev) => setEmail(ev.target.value)}
        value={email}
        placeholder='Digite seu e-mail'
        label='E-mail'
      />
      <Input
        onChange={(ev) => setPassword(ev.target.value)}
        value={password}
        placeholder='Digite sua senha'
        label='Senha'
      />
      <ButtonSubmit title='ENTRAR' />
    </form>
  )
}
