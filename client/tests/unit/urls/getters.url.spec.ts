import getters from "@/urls/getters.url"
import { UrlState } from "@/urls/state.url"

describe("Urls getters", () => {
  const state: UrlState = {
    urls: {
      items: {
        "5fc5fd5163575f00b6e73ba6": {
          _id: "5fc5fd5163575f00b6e73ba6",
          host: "https://pbid.io",
          shortUrlId: "27vm0c8s4",
          url: "www.google.com",
        },
        "5fc63b15db248f00b947bd80": {
          _id: "5fc63b15db248f00b947bd80",
          host: "https://pbid.io",
          shortUrlId: "w7ts6v266",
          url: "www.facebook.com",
        },
      },
    },
  }

  it("should return all url items", () => {
    const actual = getters.urls(state)
    expect(actual.length).toBe(2)
  })
  it("should return url item by id", () => {
    const actual = getters.getUrlItemById(state)("5fc63b15db248f00b947bd80")
    expect(actual._id).toBe("5fc63b15db248f00b947bd80")
  })
})
