import notification, {
  NotificationState,
} from "@/notification/state.notification"
import url, { UrlState } from "@/urls/state.url"

export interface StateInterface extends UrlState, NotificationState {
  [key: string]: any
}

const state: StateInterface = {
  ...notification,
  ...url,
}

export default state
