import HttpService from "./http.service"
import { API } from "@/constants"

export default class UrlService {
  private api = new HttpService(API)

  get() {
    return this.api.get(`/urls`)
  }

  getOneById(id: string) {
    return this.api.getOneById(`/urls/${id}`, id)
  }

  post(url: { url: string }) {
    return this.api.post(`/urls/insert-one`, url)
  }

  put({ id, url }: { id: string; url: string }) {
    const data = {
      filter: { _id: id },
      update: { url },
    }

    return this.api.put(`/urls/update-one`, data)
  }

  delete(id: string) {
    return this.api.delete(`/urls/delete-one`, { data: { _id: id } })
  }
}
