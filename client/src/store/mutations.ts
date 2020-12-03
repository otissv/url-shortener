import notification from "@/notification/mutations.notification"
import url from "@/urls/mutations.url"

const mutations = {
  ...notification,
  ...url,
}

export default mutations
