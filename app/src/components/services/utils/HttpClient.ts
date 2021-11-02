import { parseCookies } from 'nookies'
import delay from '../../../utils/delay'

class HttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async post(path: string, bodyFetch: any) {
    await delay(500)
    const cookies = parseCookies()
    
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies['@dashfinances.token']}`,
      },
      body: JSON.stringify(bodyFetch),
    })

    const contentType = response.headers.get('Content-Type')

    let body = null
    if (contentType?.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) {
      return body
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`
    )
  }

  async delete(path: string) {
    await delay(500)
    const cookies = parseCookies()

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies['@dashfinances.token']}`,
      },
    })

    const contentType = response.headers.get('Content-Type')

    let body = null
    if (contentType?.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) {
      return body
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`
    )
  }

  async put(path: string, bodyFetch: any) {
    await delay(500)
    const cookies = parseCookies()

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies['@dashfinances.token']}`,
      },
      body: JSON.stringify(bodyFetch),
    })

    const contentType = response.headers.get('Content-Type')

    let body = null
    if (contentType?.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) {
      return body
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`
    )
  }

  async get(path: string) {
    await delay(500)
    const cookies = parseCookies()

    const response = await fetch(`${this.baseURL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies['@dashfinances.token']}`,
      },
    })

    const contentType = response.headers.get('Content-Type')

    let body = null
    if (contentType?.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) {
      return body
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`
    )
  }
}
export default HttpClient
