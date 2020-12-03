import { SET_NOTIFICATION_MESSAGE } from "./constants.notification"

import { StateInterface } from "@/store/state"
import { NotificationInterface } from "./state.notification"

export interface NotificationMutationsInterface {
  [SET_NOTIFICATION_MESSAGE](
    state: StateInterface,
    notification: NotificationInterface
  ): void
}

export const mutations: NotificationMutationsInterface = {
  [SET_NOTIFICATION_MESSAGE](state: StateInterface, notification) {
    state.notification = notification
  },
}

export default mutations
