import axios from "axios"
import HttpService from "@/services/http.service"

describe("HttpService", () => {
  const data = [
    {
      _id: "5fc5fd5163575f00b6e73ba6",
      host: "https://pbid.io",
      shortUrlId: "12345678",
      url: "www.google.com",
    },
  ]

  const _id = data[0]._id

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("http get", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(data)
    const httpService = new HttpService("http://test.io")

    const actual = await httpService.get("/urls")

    expect(actual).toEqual(data)
  })

  test("http getOneById", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(data)
    const httpService = new HttpService("http://test.io")

    const actual = await httpService.getOneById("/urls", _id)

    expect(actual).toEqual(data)
  })

  test("http post", async () => {
    const payload = { _id, success: "OK" }

    jest.spyOn(axios, "post").mockResolvedValue(payload)
    const httpService = new HttpService("http://test.io")

    const actual = await httpService.post("/urls/insert-one", data)

    expect(actual).toEqual(payload)
  })

  test("http put", async () => {
    const payload = { success: "OK" }

    jest.spyOn(axios, "put").mockResolvedValue(payload)
    const httpService = new HttpService("http://test.io")

    const actual = await httpService.put("/urls/update-one", data)

    expect(actual).toEqual(payload)
  })

  test("http delete", async () => {
    const payload = { success: "OK" }

    jest.spyOn(axios, "delete").mockResolvedValue(payload)
    const httpService = new HttpService("http://test.io")

    const actual = await httpService.delete("/urls/delete-one", data)

    expect(actual).toEqual(payload)
  })
})
