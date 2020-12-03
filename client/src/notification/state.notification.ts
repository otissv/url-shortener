import { NotificationCodeTypes } from "./types.notification"

export interface NotificationInterface {
  message: string
  type?: string
  code?: NotificationCodeTypes
}

export interface NotificationState {
  notification: NotificationInterface
}

const state: NotificationState = {
  notification: {
    message: "",
    type: "",
    code: "",
  },
}

export default state
