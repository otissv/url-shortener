import mutations from "@/urls/mutations.url"
import { UrlState } from "@/urls/state.url"

import {
  SET_URL_ITEM,
  SET_URL_ITEMS,
  UPDATE_URL,
  DELETE_URL_ITEM,
} from "@/urls/constants.url"

describe("url mutations", () => {
  const state: UrlState = {
    urls: {
      items: {},
    },
  }

  it("should delete url item", () => {
    const testState: UrlState = {
      urls: {
        ...state.urls,
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

    mutations[DELETE_URL_ITEM](testState, "5fc5fd5163575f00b6e73ba6")
    expect(Object.keys(testState.urls.items).length).toBe(1)
  })

  it("should add url item", () => {
    const testState: UrlState = {
      urls: {
        ...state.urls,
        items: {
          "5fc5fd5163575f00b6e73ba6": {
            _id: "5fc5fd5163575f00b6e73ba6",
            host: "https://pbid.io",
            shortUrlId: "27vm0c8s4",
            url: "www.google.com",
          },
        },
      },
    }

    const newItem = {
      _id: "5fc63b15db248f00b947bd80",
      host: "https://pbid.io",
      shortUrlId: "w7ts6v266",
      url: "www.facebook.com",
    }

    mutations[SET_URL_ITEM](testState, newItem)
    expect(Object.keys(testState.urls.items).length).toBe(2)
    expect(testState.urls.items[newItem._id]._id).toBe(newItem._id)
  })

  it("should replace url items", () => {
    const testState: UrlState = {
      urls: {
        ...state.urls,
        items: {},
      },
    }

    const items = [
      {
        _id: "5fc5fd5163575f00b6e73ba6",
        host: "https://pbid.io",
        shortUrlId: "27vm0c8s4",
        url: "www.google.com",
      },
      {
        _id: "5fc63b15db248f00b947bd80",
        host: "https://pbid.io",
        shortUrlId: "w7ts6v266",
        url: "www.facebook.com",
      },
    ]

    mutations[SET_URL_ITEMS](testState, items)
    expect(Object.keys(testState.urls.items).length).toBe(2)
    expect(testState.urls.items[items[0]._id]).toEqual(items[0])
  })

  it("should update url item", () => {
    const testState: UrlState = {
      urls: {
        ...state.urls,
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

    const updateItem = {
      _id: "5fc63b15db248f00b947bd80",
      url: "www.twitter.com",
    }

    mutations[UPDATE_URL](testState, updateItem)
    expect(testState.urls.items[updateItem._id].url).toBe(updateItem.url)
  })
})
