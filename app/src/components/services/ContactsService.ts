import HttpClient from './utils/HttpClient'

class ContactsService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333')
  }

  async login(email: string, password: string) {
    const body = { email, password }
    return this.httpClient.post(`/login`, body)
  }
  
  async me() {
    return this.httpClient.get(`/me`)
  }

  async createContact(contact: string) {
    return this.httpClient.post('/contacts', contact)
  }
}

export default new ContactsService()
