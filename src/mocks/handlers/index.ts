import { httpHandlers } from '@/mocks/handlers/httpHandlers'
import { socketHandlers } from '@/mocks/handlers/socketHandlers'

export const mockHandlers = [...httpHandlers, ...socketHandlers]
