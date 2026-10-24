/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MSW: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_MOCK_SCENARIO: string
  readonly VITE_SOCKET_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
