import { useEffect } from "react"

export function useMount(fn: () => void | (() => void) | undefined) {
    useEffect(() => {
        const cleanFn = fn?.()
        return () => {
            cleanFn?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}