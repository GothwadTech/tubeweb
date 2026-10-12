import { useEffect, useState } from 'react'

let cache: string | null = null
let pending: Promise<string | null> | null = null

function load(): Promise<string | null> {
    if (!pending) {
        pending = fetch('/downloads.json')
            .then(res => res.json())
            .then((data: { android?: { version?: string } | null }) => {
                cache = data?.android?.version ?? null
                return cache
            })
            .catch(() => null)
    }
    return pending
}

export function useLatestVersion() {
    const [version, setVersion] = useState<string | null>(cache)

    useEffect(() => {
        if (cache) return
        let active = true
        load().then(v => { if (active && v) setVersion(v) })
        return () => { active = false }
    }, [])

    return version
}
