import { UrlInterface, UrlState } from "./state.url"

const getters = {
  urls(state: UrlState) {
    const items: UrlInterface[] = []

    for (const key in state.urls.items) {
      items.push(state.urls.items[key])
    }

    return items
  },
  getUrlItemById: (state: UrlState) => {
    return (id: string) => state.urls.items[id]
  },
}

export default getters
