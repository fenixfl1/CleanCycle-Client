import { PATH_HOME } from '@/constants/routes'
import { isLoggedIn } from '@/lib/session'
import { useRouter } from 'next/router'

function useAnonymousUserRequired() {
  const router = useRouter()
  if (isLoggedIn()) {
    router.push(PATH_HOME)
    return null
  }
}

export default useAnonymousUserRequired
