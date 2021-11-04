import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/auth'

import '../styles/global.scss'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AuthProvider>
      <ToastContainer />

      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
