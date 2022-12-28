import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify'

export default function withSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['@dashfinances.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (error: any) {
      toast.error(error.message)
      destroyCookie(undefined, 'authnext.token')

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  }
}
