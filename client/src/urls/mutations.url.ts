import {
  DELETE_URL_ITEM,
  SET_URL_ITEM,
  SET_URL_ITEMS,
  UPDATE_URL,
} from "./constants.url"
import { UrlInterface, UrlState } from "./state.url"
import { StateInterface } from "@/store/state"

export interface UrlMutationsInterface {
  [DELETE_URL_ITEM](state: UrlState, id: string): void
  [SET_URL_ITEM](state: UrlState, items: UrlInterface): void
  [SET_URL_ITEMS](state: UrlState, items: UrlInterface[]): void
  [UPDATE_URL](
    state: UrlState,
    payload: Pick<UrlInterface, "_id" | "url">
  ): void
}

const mutations: UrlMutationsInterface = {
  [DELETE_URL_ITEM](state, id) {
    delete state.urls.items[id]

    state.urls = {
      ...state.urls,
    }
  },

  [SET_URL_ITEM](state, item) {
    state.urls = {
      ...state.urls,
      items: {
        ...state.urls.items,
        [item._id]: item,
      },
    }
  },

  [SET_URL_ITEMS](state, payload) {
    const items = {}

    for (const item of payload) {
      items[item._id] = item
    }

    state.urls = {
      ...state.urls,
      items: items,
    }
  },

  [UPDATE_URL](state, item) {
    state.urls = {
      ...state.urls,
      items: {
        ...state.urls.items,
        [item._id]: {
          ...state.urls.items[item._id],
          ...item,
        },
      },
    }
  },
}

export default mutations
