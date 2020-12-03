import axios from "axios"

export default class HttpService {
  private host = ""

  constructor(host: string) {
    this.host = host
  }

  get(route: string) {
    return axios.get(`${this.host}${route}`)
  }

  getOneById(route: string, id: string) {
    return axios.get(`${this.host}${route}`, { params: { query: { _id: id } } })
  }

  post<T>(route: string, data: T) {
    return axios.post(`${this.host}${route}`, data)
  }

  put<T>(route: string, data: T) {
    return axios.put(`${this.host}${route}`, data)
  }

  delete<T>(route: string, data: T) {
    return axios.delete(`${this.host}${route}`, data)
  }
}
