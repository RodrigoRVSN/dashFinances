import HttpClient from './utils/HttpClient'

class FinancesService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient(`${process.env.NEXT_PUBLIC_API_LOCAL}/finance`)
  }

  async getAll(tableDirection: string) {
    return this.httpClient.get(`/all?orderBy=${tableDirection}`)
  }

  async newFinance(name: string, category: string, amount: number) {
    const body = { name, category, amount }
    return this.httpClient.post(`/new`, body)
  }

  async deleteFinance(id: string) {
    return this.httpClient.delete(`/delete/${id}`)
  }

  async updateFinance(
    name: string,
    category: string,
    amount: number,
    id: string
  ) {
    const body = { name, category, amount }

    return this.httpClient.put(`/update/${id}`, body)
  }
}

export default new FinancesService()
