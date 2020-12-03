import { config } from "@vue/test-utils"
import state, { StateInterface } from "@/store/state"
import getters from "@/store/getters"

export interface MockInterface {
  $store: {
    state: StateInterface
    getters: { [key: string]: any }
    dispatch: jest.Mock<any, any>
  }
  $route: {
    params: { [key: string]: any }
  }
}

config.global.mocks = config.global.mocks || {}
config.global.mocks.$style = new Proxy(
  {},
  {
    get(_, name) {
      if (name !== "_isMockFunction") {
        return name
      }
    },
  }
)

export const mocks: MockInterface = {
  $store: {
    state,
    getters,
    dispatch: jest.fn(),
  },
  $route: {
    params: {
      id: "1",
    },
  },
}
