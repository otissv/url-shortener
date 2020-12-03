import { shallowMount } from "@vue/test-utils"
import App from "@/App.vue"

import { mocks } from "../test-utils"

describe("App.vue", () => {
  it("renders App", () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks,
      },
    })

    expect(wrapper.findAll(".nav").length).toBe(1)
  })

  it("does not render notification", () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks,
      },
    })

    expect(wrapper.find(".notification").exists()).toBe(false)
  })

  it("renders notification", () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks: {
          ...mocks,
          $store: {
            ...mocks.$store,
            getters: {
              ...mocks.$store.getters,
              notification: {
                message: "notification",
              },
            },
          },
        },
      },
    })

    expect(wrapper.find(".notification").exists()).toBe(true)
  })
})
