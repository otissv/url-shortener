import isValidUrl from "@/utils/isValidUrl"

describe("isValidUrl", () => {
  it("should return false if value is not a url", () => {
    expect(isValidUrl("")).toBeFalsy()
    expect(isValidUrl("s")).toBeFalsy()
    expect(isValidUrl("www.")).toBeFalsy()
    expect(isValidUrl("www.")).toBeFalsy()
    expect(isValidUrl("www.google,com")).toBeFalsy()
  })

  it("should return true invalid url", () => {
    expect(isValidUrl("www.google.com")).toBeTruthy()
    expect(isValidUrl("https://www.google.com")).toBeTruthy()
    expect(isValidUrl("http://www.google.com")).toBeTruthy()
    expect(isValidUrl("192.168.0.2")).toBeTruthy()
  })
})
