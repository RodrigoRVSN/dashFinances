import HttpClient from './utils/HttpClient'

class ContactsService {
  httpClient: HttpClient

  constructor() {
    
    this.httpClient = new HttpClient('http://localhost:3333')
    // this.httpClient = new HttpClient(process.env.API_LOCAL!)
  }
  
  async login(email: string, password: string) {
    const body = { email, password }
    return this.httpClient.post(`/login`, body)
  }
  
  async register(name: string, email: string, password: string) {
    const body = { name, email, password }
    return this.httpClient.post(`/register`, body)
  }

  async me() {
    return this.httpClient.get(`/me`)
  }
}

export default new ContactsService()
