export interface UrlInterface {
  _id: string
  url: string
  shortUrlId: string
  host: string
}

export interface UrlState {
  urls: {
    items: { [key: string]: UrlInterface }
  }
}

const state: UrlState = {
  urls: {
    items: {},
  },
}

export default state
