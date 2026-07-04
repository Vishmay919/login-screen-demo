import { useState } from 'react'

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

export const messageFrom = (err: unknown) =>
  err instanceof Error ? err.message : FALLBACK_MESSAGE

// Runs an async action while tracking whether it is in flight and surfacing any
// error it throws, so each step does not repeat the same loading and try/catch
// wiring. The message from a rejected call is shown as is.
export function useAsyncAction() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async (action: () => Promise<void>) => {
    if (pending) return
    setError(null)
    setPending(true)
    try {
      await action()
    } catch (err) {
      setError(messageFrom(err))
    } finally {
      setPending(false)
    }
  }

  return { pending, error, setError, run }
}
