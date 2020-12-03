import { StateInterface } from "@/store/state"

const getters = {
  notification(state: StateInterface) {
    return state.notification
  },
}

export default getters
