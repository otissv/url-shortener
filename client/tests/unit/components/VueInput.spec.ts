import { mount } from "@vue/test-utils"

import VueInput from "@/components/VueInput.vue"

import "../../test-utils"

describe("VueButton", () => {
  it("should render VueButton", () => {
    const wrapper = mount(VueInput)

    expect(wrapper.find(".vueInput")).toBeTruthy()
  })

  it("should render VueButton label", () => {
    const wrapper = mount(VueInput, {
      props: {
        label: "my label",
        name: "my name",
        required: true,
      },
    })

    expect(wrapper.find("label").attributes("for")).toBe("my name")
    expect(wrapper.find("label").text()).toBe("my label*")
  })

  it("should render VueButton input", () => {
    const wrapper = mount(VueInput, {
      propsData: {
        name: "my input",
        id: "my input",
        required: true,
        value: "value",
        type: "type",
        disabled: true,
        placeholder: "placeholder",
      },
    })

    expect(wrapper.find("input").attributes("name")).toBe("my input")
    expect(wrapper.find("input").attributes("id")).toBe("my input")
    expect(wrapper.find("input").element.required).toBeTruthy()
    expect(wrapper.find("input").element.value).toBe("value")
    expect(wrapper.find("input").attributes("type")).toBe("type")
    expect(wrapper.find("input").attributes("autocomplete")).toBe("type")
    expect(wrapper.find("input").element.disabled).toBeTruthy()
    expect(wrapper.find("input").attributes("placeholder")).toBe("placeholder")
  })

  it("should not emit input event", async () => {
    const wrapper = mount(VueInput)

    await wrapper.find("input").setValue("my@mail.com")
    expect(wrapper.emitted().input).toBeTruthy()
  })

  it("should not emit blur event id if isLoading", async () => {
    const wrapper = mount(VueInput, {
      props: {
        isLoading: true,
      },
    })

    await wrapper.find("input").trigger("blur")
    expect(wrapper.emitted().blur).toBeTruthy()
  })

  it("should show error if invalid", async () => {
    const wrapper = mount(VueInput, {
      props: {
        isValid: false,
        errorMessage: "errorMessage",
      },
    })

    expect(wrapper.find("p").text()).toBe("errorMessage")
  })

  it("should not show error if valid", async () => {
    const wrapper = mount(VueInput, {
      props: {
        isValid: true,
      },
    })

    expect(wrapper.find("p").exists()).toBeFalsy()
  })
})
