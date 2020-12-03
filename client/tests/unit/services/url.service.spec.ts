import axios from "axios"
import UrlService from "@/services/url.service"

describe("UrlService", () => {
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

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("http get", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(data)
    const httpService = new UrlService()

    const actual = await httpService.get()

    expect(actual).toEqual(data)
  })

  test("http getOneById", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(data)
    const httpService = new UrlService()

    const actual = await httpService.getOneById(_id)

    expect(actual).toEqual(data)
  })

  test("http post", async () => {
    const payload = { _id, success: "OK" }

    jest.spyOn(axios, "post").mockResolvedValue(payload)
    const httpService = new UrlService()

    const actual = await httpService.post({ url })

    expect(actual).toEqual(payload)
  })

  test("http put", async () => {
    const payload = { success: "OK" }

    jest.spyOn(axios, "put").mockResolvedValue(payload)
    const httpService = new UrlService()

    const actual = await httpService.put({ id: _id, url })

    expect(actual).toEqual(payload)
  })

  test("http delete", async () => {
    const payload = { success: "OK" }

    jest.spyOn(axios, "delete").mockResolvedValue(payload)
    const httpService = new UrlService()

    const actual = await httpService.delete(_id)

    expect(actual).toEqual(payload)
  })
})
