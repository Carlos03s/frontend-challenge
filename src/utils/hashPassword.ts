export async function hashPassword(password: string): Promise<string> {
  const passwordBytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', passwordBytes)
  const digestBytes = Array.from(new Uint8Array(digest))

  return digestBytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}
