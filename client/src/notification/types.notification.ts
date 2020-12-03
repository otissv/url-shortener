import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
  DOCUMENTS_EXISTS,
  SERVER_ERROR,
  SUCCESS,
  ERROR,
} from "@/notification/constants.notification"

export type NotificationCodeTypes =
  | typeof BAD_REQUEST
  | typeof DATA_NOT_SAVED
  | typeof DOCUMENTS_EXISTS
  | typeof SERVER_ERROR
  | typeof SUCCESS
  | typeof ERROR
  | string
