type RealtimeEventIdentity = {
  eventId: string
  resourceId: string
  version: number
}

const seenEventIds = new Set<string>()
const latestResourceVersions = new Map<string, number>()

export function shouldApplyRealtimeEvent(event: RealtimeEventIdentity): boolean {
  const isDuplicateEvent = seenEventIds.has(event.eventId)

  if (isDuplicateEvent) {
    return false
  }

  seenEventIds.add(event.eventId)

  const knownVersion = latestResourceVersions.get(event.resourceId) ?? 0
  const isStaleVersion = event.version < knownVersion

  if (isStaleVersion) {
    return false
  }

  latestResourceVersions.set(event.resourceId, event.version)

  return true
}
