export function shouldEnableMocks(): boolean {
  return import.meta.env.VITE_ENABLE_MSW === 'true'
}
