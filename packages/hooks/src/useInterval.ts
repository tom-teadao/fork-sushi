'use client'

import { useEffect, useRef } from 'react'

export function useInterval(
  callback: () => void,
  delay: null | number,
  leading = true,
) {
  const savedCallback = useRef<() => void>(undefined)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      const current = savedCallback.current
      current?.()
    }

    if (delay !== null) {
      if (leading) tick()
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return undefined
  }, [delay, leading])
}
