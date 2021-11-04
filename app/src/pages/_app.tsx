import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/auth'

import '../styles/global.scss'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  console.log(process.env.API_LOCAL)
  return (
    <AuthProvider>
      <ToastContainer />

      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
