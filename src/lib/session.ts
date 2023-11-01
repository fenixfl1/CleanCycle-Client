import { SessionPayload } from '@/redux/slices/userSlice'
import Cookies from 'js-cookie'

export const sessionCookies: Record<string, string> = {
  COOKIE_KEY_USERNAME: 'cleanCycleUsername',
  COOKIE_KEY_SESSION_TOKEN: 'cleanCycleSessionToken',
  COOKIE_KEY_USER_DATA: 'cleanCycleUserData',
}

export const getSessionToken = (): string => {
  const token = Cookies.get(sessionCookies.COOKIE_KEY_SESSION_TOKEN)
  return token ? `${token}` : ''
}

export const isLoggedIn = (): boolean => {
  return !!Cookies.get(sessionCookies.COOKIE_KEY_SESSION_TOKEN)
}

export const createSession = (data: SessionPayload): void => {
  const { USERNAME, SESSION_COOKIE, ...userData } = data

  const { TOKEN, EXPIRES_IN } = SESSION_COOKIE

  Cookies.set(sessionCookies.COOKIE_KEY_USERNAME, USERNAME, {
    expires: new Date(EXPIRES_IN),
  })
  Cookies.set(sessionCookies.COOKIE_KEY_SESSION_TOKEN, TOKEN, {
    expires: new Date(EXPIRES_IN),
  })
  Cookies.set(
    sessionCookies.COOKIE_KEY_USER_DATA,
    JSON.stringify({ ...userData, USERNAME }),
    {
      expires: new Date(EXPIRES_IN),
    },
  )
}

export const removeSession = (): void => {
  Object.keys(sessionCookies).forEach((key) => {
    Cookies.remove(sessionCookies[key])
  })
}

export const getSessionInfo = (): SessionPayload => {
  const sessionInfo = Cookies.get(sessionCookies.COOKIE_KEY_USER_DATA)
  return sessionInfo ? JSON.parse(sessionInfo) : {}
}
