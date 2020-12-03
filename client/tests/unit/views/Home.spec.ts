import { mount } from "@vue/test-utils"
import Vuex from "vuex"

import Home from "@/views/Home.vue"
import { API_ADD_URL_ITEM } from "@/urls/constants.url"
import { mocks } from "../../test-utils"

describe("Home", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders url form", () => {
    const wrapper = mount(Home, {})

    const input = wrapper.find(".vueInput")
    const button = wrapper.findAll(".vueButton")

    expect(wrapper.findAll(".formUrl").length).toBe(1)
    expect(input.find(".vueInputControl").attributes("aria-label")).toBe("url")
    expect(button.length).toBe(1)
  })

  it("submits form", async () => {
    const wrapper = mount(Home, {
      global: {
        mocks,
      },
    })
    const url = "www.google.com"

    const input: any = wrapper.find(".vueInputControl")
    input.setValue(url)
    await wrapper.find("button").trigger("click")
    const dispatchSpy = jest.spyOn(mocks.$store, "dispatch")

    expect(dispatchSpy).toHaveBeenCalledWith(API_ADD_URL_ITEM, { url })
  })
})
