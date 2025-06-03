"use client"

import { WifiOff, ServerOff } from "lucide-react"
import { useOnlineStatus } from "@/hooks/useOnlineStatus"

export const ConnectionWarning: React.FC = () => {
    const isOnline = useOnlineStatus()

    return (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center">
            {isOnline ? (
                <>
                    <ServerOff className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-sm text-amber-700">Server unreachable. You're in fallback mode.</span>
                </>
            ) : (
                <>
                    <WifiOff className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-sm text-amber-700">You're offline.</span>
                </>
            )}
        </div>
    )
}
