import { useEffect, useState } from "react"

export function useOnlineStatus() {
    const [online, setOnline] = useState<boolean>(true) // default to true

    useEffect(() => {
        // Make sure this only runs in the browser
        const isBrowser = typeof window !== "undefined" && typeof navigator !== "undefined"
        if (isBrowser) {
            setOnline(navigator.onLine)

            const handleOnline = () => setOnline(true)
            const handleOffline = () => setOnline(false)

            window.addEventListener("online", handleOnline)
            window.addEventListener("offline", handleOffline)

            return () => {
                window.removeEventListener("online", handleOnline)
                window.removeEventListener("offline", handleOffline)
            }
        }
    }, [])

    return online
}
