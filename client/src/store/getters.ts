import notification from "@/notification/getters.notification"
import url from "@/urls/getters.url"

const getters = {
  ...notification,
  ...url,
}

export default getters
