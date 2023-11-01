import Cookies from 'js-cookie'

export const setCookie = (
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {},
) => {
  Cookies.set(name, value, options)
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

export const removeCookie = (name: string | string[]) => {
  if (typeof name === 'string') {
    Cookies.remove(name)
  } else {
    name?.forEach((key) => {
      Cookies.remove(key)
    })
  }
}
