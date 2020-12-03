import { mount } from "@vue/test-utils"

import VueButton from "@/components/VueButton.vue"

import "../../test-utils"

describe("VueButton", () => {
  it("should render VueButton", () => {
    const wrapper = mount(VueButton)

    expect(wrapper.find("button")).toBeTruthy()
  })

  it("should emit click event", async () => {
    const wrapper = mount(VueButton)

    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it("should not emit click event id if disabled", async () => {
    const wrapper = mount(VueButton, {
      props: {
        disabled: true,
      },
    })

    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it("should not emit click event id if isLoading", async () => {
    const wrapper = mount(VueButton, {
      props: {
        isLoading: true,
      },
    })

    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted().click).toBeFalsy()
  })
})
