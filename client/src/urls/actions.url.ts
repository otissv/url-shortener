import { ActionContext } from "vuex"

import UrlService from "@/services/url.service"
import { StateInterface } from "@/store/state"
import notificationHandler from "@/notification/handler.notification"
import {
  API_ADD_URL_ITEM,
  API_DELETE_URL_ITEM,
  API_FETCH_URLS,
  API_FETCH_URL_ITEM,
  API_UPDATE_URL_ITEM,
  SET_URL_ITEM,
  SET_URL_ITEMS,
  UPDATE_URL,
  DELETE_URL_ITEM,
} from "./constants.url"

export interface UrlActionsInterface {
  [API_ADD_URL_ITEM](
    { commit }: ActionContext<StateInterface, StateInterface>,
    url: { url: string }
  ): void
  [API_FETCH_URLS]({
    commit,
  }: ActionContext<StateInterface, StateInterface>): void
  [API_FETCH_URL_ITEM](
    { commit }: ActionContext<StateInterface, StateInterface>,
    id: string
  ): void
  [API_UPDATE_URL_ITEM](
    { commit }: ActionContext<StateInterface, StateInterface>,
    data: { id: string; url: string }
  ): void
  [API_DELETE_URL_ITEM](
    { commit }: ActionContext<StateInterface, StateInterface>,
    id: string
  ): void
}

const actions: UrlActionsInterface = {
  async [API_ADD_URL_ITEM]({ commit }, url) {
    try {
      const urlApi = new UrlService()

      await urlApi.post(url).then(({ data, error }: any) => {
        if (error) {
          throw new Error(error)
        }

        commit(SET_URL_ITEM, data.data)
        notificationHandler(
          { commit },
          {
            type: "SUCCESS",
            message: `Your short code is ${data.data.host}/${data.data.shortUrlId}`,
          }
        )
      })
    } catch (error) {
      notificationHandler({ commit }, error)
    }
  },

  async [API_FETCH_URLS]({ commit }) {
    try {
      const urlApi = new UrlService()
      await urlApi.get().then(({ data, error }: any) => {
        if (error) {
          throw new Error(error)
        }

        commit(SET_URL_ITEMS, data.data)
      })
    } catch (error) {
      notificationHandler({ commit }, error)
    }
  },

  async [API_FETCH_URL_ITEM]({ commit }, id) {
    try {
      const urlApi = new UrlService()
      await urlApi.getOneById(id).then(({ data, error }: any) => {
        if (error) {
          throw new Error(error)
        }

        commit(SET_URL_ITEM, data.data)
      })
    } catch (error) {
      notificationHandler({ commit }, error)
    }
  },

  async [API_UPDATE_URL_ITEM]({ commit }, data: { id: string; url: string }) {
    try {
      const urlApi = new UrlService()
      await urlApi.put(data).then(({ error }: any) => {
        if (error) {
          throw new Error(error)
        }
        commit(UPDATE_URL, data)
        notificationHandler(
          { commit },
          {
            type: "SUCCESS",
            message: "Url updated",
          }
        )
      })
    } catch (error) {
      notificationHandler({ commit }, error)
    }
  },

  async [API_DELETE_URL_ITEM]({ commit }, id) {
    try {
      const urlApi = new UrlService()
      await urlApi.delete(id).then(({ error }: any) => {
        if (error) {
          throw new Error(error)
        }

        commit(DELETE_URL_ITEM, id)
      })
    } catch (error) {
      notificationHandler({ commit }, error)
    }
  },
}

export default actions
