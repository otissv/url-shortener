import { NotificationInterface } from "@/notification/state.notification"
import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
  DOCUMENTS_EXISTS,
  SERVER_ERROR,
  SUCCESS,
  ERROR,
  SET_NOTIFICATION_MESSAGE,
} from "@/notification/constants.notification"
import { NotificationCodeTypes } from "./types.notification"

function getNotificationType(code: NotificationCodeTypes) {
  switch (code) {
    case SUCCESS:
      return SUCCESS

    case DOCUMENTS_EXISTS:
    case BAD_REQUEST:
    case DATA_NOT_SAVED:
    case SERVER_ERROR:
    default:
      return ERROR
  }
}

export default function notificationHandler(
  { commit },
  { code, message, type }: NotificationInterface
) {
  commit(SET_NOTIFICATION_MESSAGE, {
    type: type || getNotificationType(code),
    message,
  })
}
