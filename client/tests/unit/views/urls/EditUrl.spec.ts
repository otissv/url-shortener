import { mount } from "@vue/test-utils"

import { mocks } from "../../../test-utils"
import EditUrl from "@/views/urls/EditUrl.vue"
import { API_UPDATE_URL_ITEM, API_FETCH_URL_ITEM } from "@/urls/constants.url"

describe("EditUrl", () => {
  const _id = "1"
  const url = "www.google.com"

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders url form", () => {
    const wrapper = mount(EditUrl, {
      global: {
        mocks,
      },
    })

    const input = wrapper.find(".vueInput")
    const button = wrapper.findAll(".vueButton")

    expect(wrapper.findAll(".formEditUrl").length).toBe(1)
    expect(input.find(".vueInputControl").attributes("aria-label")).toBe("url")
    expect(button.length).toBe(1)
  })

  it("dispatches API_FETCH_URL_ITEM on mount", () => {
    mount(EditUrl, {
      global: {
        mocks,
      },
    })

    const dispatchSpy = jest.spyOn(mocks.$store, "dispatch")

    expect(dispatchSpy).toHaveBeenCalledWith(API_FETCH_URL_ITEM, _id)
  })

  it.skip("calls validate on blur", () => {
    const options = {
      global: {
        mocks: {
          ...mocks,
          methods: {
            validate: jest.fn(),
          },
        },
      },
    }
    const wrapper: any = mount(EditUrl, options)

    const input: any = wrapper.find(".vueInputControl")
    input.setValue(url)
    input.trigger("blur")

    expect(options.global.mocks.methods.validate).toHaveBeenCalled()
  })

  it("onUrlInput should update form", () => {
    const wrapper: any = mount(EditUrl, {
      global: {
        mocks,
      },
    })

    const input: any = wrapper.find(".vueInputControl")
    input.setValue("www.facebook.com")

    expect(wrapper.vm.form.url.value).toBe("www.facebook.com")
  })

  it("submits form", async () => {
    const wrapper = mount(EditUrl, {
      global: {
        mocks,
      },
    })

    const input: any = wrapper.find(".vueInputControl")
    input.setValue(url)
    await wrapper.find("button").trigger("click")
    const dispatchSpy = jest.spyOn(mocks.$store, "dispatch")

    expect(dispatchSpy).toHaveBeenCalledWith(API_UPDATE_URL_ITEM, {
      id: _id,
      url,
    })
  })

  it.skip("form is initialized data ", () => {
    const wrapper = mount(EditUrl, {
      global: {
        mocks,
      },
    })

    expect(wrapper.vm.form.url).toEqual({
      errorMessage: "URL is invalid",
      isValid: true,
      label: "URL",
      name: "url",
      placeholder: "Enter URL",
      value: url,
    })
  })
})
