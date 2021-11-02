import HttpClient from './utils/HttpClient'

class FinancesService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333')
  }

  async getAll() {
    return this.httpClient.get(`/finance/all`)
  }
  
}

export default new FinancesService()
