import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { fetchSession } from '@/api/authApi'
import { queryKeys } from '@/consts/queryKeys'
import { hasSessionToken, sessionChangedEventName } from '@/utils/sessionToken'

export function useSessionQuery() {
  const [sessionVersion, setSessionVersion] = useState(0)

  useEffect(() => {
    const handleSessionChanged = () => {
      setSessionVersion((currentVersion) => currentVersion + 1)
    }

    window.addEventListener(sessionChangedEventName, handleSessionChanged)

    return () => {
      window.removeEventListener(sessionChangedEventName, handleSessionChanged)
    }
  }, [])

  const isSessionTokenPresent = sessionVersion >= 0 && hasSessionToken()

  return useQuery({
    queryKey: queryKeys.session,
    queryFn: fetchSession,
    enabled: isSessionTokenPresent,
    retry: false,
  })
}
