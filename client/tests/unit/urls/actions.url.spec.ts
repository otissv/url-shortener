import { Commit } from "vuex"
import axios from "axios"

import actions from "@/urls/actions.url"
import state from "@/store/state"
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
} from "@/urls/constants.url"

describe("authenticate", () => {
  const data = [
    {
      _id: "5fc5fd5163575f00b6e73ba6",
      host: "https://pbid.io",
      shortUrlId: "12345678",
      url: "www.google.com",
    },
  ]

  const _id = data[0]._id
  const url = data[0].url

  let context: any
  const commit = jest.fn() as Commit

  beforeEach(() => {
    jest.resetAllMocks()

    // jest.spyOn(axios, "get").mockResolvedValue({ data: { data } })

    // jest.spyOn(axios, "put").mockResolvedValue({ success: "OK" })
    // jest.spyOn(axios, "delete").mockResolvedValue({ success: "OK" })

    context = {
      commit,
      state,
      getters: {},
    }
  })

  it(API_ADD_URL_ITEM, async () => {
    const commitSpy = jest.spyOn(context, "commit")
    jest.spyOn(axios, "post").mockResolvedValue({ data: { data } })

    await actions[API_ADD_URL_ITEM](context, { url })

    expect(commitSpy).toHaveBeenCalledWith(SET_URL_ITEM, data)
  })

  it(API_FETCH_URLS, async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: { data } })

    const commitSpy = jest.spyOn(context, "commit")
    await actions[API_FETCH_URLS](context)

    expect(commitSpy).toHaveBeenCalledWith(SET_URL_ITEMS, data)
  })

  it(API_FETCH_URL_ITEM, async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: { data } })

    const commitSpy = jest.spyOn(context, "commit")
    await actions[API_FETCH_URL_ITEM](context, _id)

    expect(commitSpy).toHaveBeenCalledWith(SET_URL_ITEM, data)
  })

  it(API_UPDATE_URL_ITEM, async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ success: "OK" })

    const payload = {
      id: data[0]._id,
      url: data[0].url,
    }

    const commitSpy = jest.spyOn(context, "commit")
    await actions[API_UPDATE_URL_ITEM](context, payload)

    expect(commitSpy).toHaveBeenCalledWith(UPDATE_URL, payload)
  })

  it(API_DELETE_URL_ITEM, async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ success: "OK" })

    const commitSpy = jest.spyOn(context, "commit")
    await actions[API_DELETE_URL_ITEM](context, _id)

    expect(commitSpy).toHaveBeenCalledWith(DELETE_URL_ITEM, _id)
  })
})
