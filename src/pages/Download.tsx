import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Copy, Download as DownloadIcon, TriangleAlert } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { detectDevice, type Device } from '@/lib/detectDevice'

type Flavor = 'github' | 'foss'
type Abi = 'universal' | 'arm64-v8a' | 'armeabi-v7a'

interface AndroidAsset { name: string; url: string; size: number; flavor: Flavor; abi: Abi }

interface AndroidNightly {
    created: string
    commit: string | null
    release_url: string
    apk: { name: string; url: string; size: number }
    checksums_url: string | null
}

interface Downloads {
    android: {
        version: string
        tag: string
        published: string
        release_url: string
        checksums_url: string | null
        assets: AndroidAsset[]
    } | null
    nightly: { android: AndroidNightly | null }
}

const ABI_LABEL: Record<Abi, string> = {
    universal: 'Universal',
    'arm64-v8a': 'arm64-v8a',
    'armeabi-v7a': 'armeabi-v7a',
}

const ABI_ORDER: Abi[] = ['universal', 'arm64-v8a', 'armeabi-v7a']

const linkClass = 'font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary'

function formatSize(bytes: number) {
    return `${(bytes / 1_000_000).toFixed(1)} MB`
}

function formatDate(iso: string) {
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function timeAgo(iso: string) {
    const hours = Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000)
    if (hours < 1) return 'less than an hour ago'
    if (hours < 48) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    return `${Math.round(hours / 24)} days ago`
}

function androidPick(assets: AndroidAsset[], flavor: Flavor, abi: Abi) {
    return assets.find(a => a.flavor === flavor && a.abi === abi) ?? null
}

function Row({ title, detail, href, size, primary }: { title: string; detail?: string; href: string; size?: number; primary?: boolean }) {
    return (
        <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4">
            <div className="min-w-0">
                <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{title}</p>
                {detail && <p className="text-sm text-text-secondary">{detail}</p>}
            </div>
            <div className="flex items-center gap-4">
                {size !== undefined && <span className="font-mono text-[12px] text-text-muted tabular-nums">{formatSize(size)}</span>}
                <a
                    href={href}
                    className={cn(
                        'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                        primary
                            ? 'bg-text-primary text-bg-primary hover:opacity-90'
                            : 'border border-border-subtle text-text-primary hover:border-text-primary'
                    )}
                >
                    <DownloadIcon className="w-4 h-4" aria-hidden="true" />
                    Download
                </a>
            </div>
        </li>
    )
}

function Group({ title, note, children }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-text-primary">{title}</h3>
                {note && <span className="kicker">{note}</span>}
            </div>
            <ul className="rounded-2xl border border-border-subtle bg-bg-card divide-y divide-border-subtle">{children}</ul>
        </div>
    )
}

function SectionHeader({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
    return (
        <div className="mb-8 max-w-2xl">
            <p className="kicker mb-3">{kicker}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-text-primary mb-3">{title}</h2>
            {children && <div className="text-text-secondary leading-relaxed space-y-2">{children}</div>}
        </div>
    )
}

function describeDevice(device: Device): string | null {
    switch (device.os) {
        case 'android':
            return 'Looks like you\'re on Android. This is the right place.'
        case 'chromeos':
            return 'On a Chromebook, the Android app works best.'
        case 'ios':
            return 'PlusTube is an Android app, so it isn\'t available for iPhone or iPad. You can still grab the APK for another device below.'
        case 'windows':
        case 'macos':
        case 'linux':
            return 'PlusTube is made for Android phones, tablets and TVs. Grab the APK below and move it to your Android device.'
        default:
            return null
    }
}

export function Download() {
    const [data, setData] = useState<Downloads | null>(null)
    const [failed, setFailed] = useState(false)
    const [device, setDevice] = useState<Device | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    useEffect(() => {
        fetch('/downloads.json')
            .then(res => res.json())
            .then((json: Downloads) => setData(json))
            .catch(() => setFailed(true))

        detectDevice().then(setDevice)
    }, [])

    const copyValue = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(value)
            window.setTimeout(() => setCopied(current => (current === value ? null : current)), 2000)
        } catch {
            setCopied(null)
        }
    }

    const android = data?.android
    const nightly = data?.nightly.android

    const primaryAndroid = android
        ? androidPick(android.assets, 'github', 'universal')
            ?? androidPick(android.assets, 'github', 'arm64-v8a')
            ?? android.assets.find(a => a.flavor === 'github')
            ?? android.assets[0]
        : null

    const grouped = android
        ? (['github', 'foss'] as Flavor[])
            .map(flavor => ({
                flavor,
                label: flavor === 'github' ? 'GitHub build' : 'FOSS build',
                note: flavor === 'github' ? 'In-app updates' : 'No updater, no extras',
                assets: ABI_ORDER
                    .map(abi => android.assets.filter(a => a.flavor === flavor && a.abi === abi))
                    .filter(list => list.length > 0)
                    .flat(),
            }))
            .filter(g => g.assets.length > 0)
        : []

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="kicker mb-5">Download</p>
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-6">
                        PlusTube for{' '}
                        <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">Android.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                        Phones, tablets and Android TV. Android 8.0 or newer. Free, open source,
                        and signed builds straight from our GitHub releases.
                    </p>

                    {device && (
                        <p className="mt-6 flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
                            {describeDevice(device)}
                        </p>
                    )}

                    {failed && (
                        <p className="mt-8 flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
                            <TriangleAlert className="mt-0.5 w-4 h-4 shrink-0 text-text-primary" aria-hidden="true" />
                            Couldn't load the release info right now. All builds are always on{' '}
                            <a href="https://github.com/GothwadTech/tubeapp/releases" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub Releases</a>.
                        </p>
                    )}

                    {data && !android && !failed && (
                        <p className="mt-8 flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
                            <TriangleAlert className="mt-0.5 w-4 h-4 shrink-0 text-text-primary" aria-hidden="true" />
                            No release info yet. Check{' '}
                            <a href="https://github.com/GothwadTech/tubeapp/releases" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub Releases</a>.
                        </p>
                    )}

                    {android && (
                        <>
                            <section id="stable" className="mt-16 md:mt-20 scroll-mt-12">
                                <SectionHeader kicker="Stable" title={`PlusTube ${android.version}`}>
                                    <p>
                                        Released {formatDate(android.published)}. The universal APK runs on
                                        every Android device — when in doubt, take that one.
                                    </p>
                                </SectionHeader>

                                {primaryAndroid && (
                                    <div className="mb-10 rounded-2xl border-2 border-text-primary bg-bg-card p-6 md:p-8">
                                        <p className="kicker mb-2">Recommended for you</p>
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <p className="font-display text-xl font-semibold tracking-[-0.02em] text-text-primary">
                                                    {primaryAndroid.name}
                                                </p>
                                                <p className="text-sm text-text-secondary">
                                                    {ABI_LABEL[primaryAndroid.abi]} &middot; {primaryAndroid.flavor === 'github' ? 'GitHub build' : 'FOSS build'} &middot; {formatSize(primaryAndroid.size)}
                                                </p>
                                            </div>
                                            <Button
                                                href={primaryAndroid.url}
                                                variant="primary"
                                                size="md"
                                                icon={<DownloadIcon className="w-4 h-4" />}
                                                iconPosition="left"
                                            >
                                                Download APK
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-10">
                                    {grouped.map(group => (
                                        <Group key={group.flavor} title={`Android · ${group.label}`} note={`${group.note} · v${android.version}`}>
                                            {group.assets.map(asset => (
                                                <Row
                                                    key={asset.name}
                                                    title={ABI_LABEL[asset.abi]}
                                                    detail={asset.name}
                                                    href={asset.url}
                                                    size={asset.size}
                                                />
                                            ))}
                                        </Group>
                                    ))}
                                </div>

                                <p className="mt-4 text-sm text-text-secondary">
                                    <a href={android.release_url} target="_blank" rel="noopener noreferrer" className={linkClass}>Release notes on GitHub</a>
                                    {android.checksums_url && (
                                        <>
                                            {' · '}
                                            <a href={android.checksums_url} className={linkClass}>checksums.txt</a>
                                        </>
                                    )}
                                </p>
                            </section>

                            {nightly && (
                                <section id="nightly" className="mt-20 md:mt-28 scroll-mt-12">
                                    <SectionHeader kicker="Nightly builds" title="Try what's coming next">
                                        <p>Built automatically from the latest code. They aren't in the changelog and they can break, so keep a stable build around.</p>
                                    </SectionHeader>
                                    <p className="mb-8 flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
                                        <TriangleAlert className="mt-0.5 w-4 h-4 shrink-0 text-text-primary" aria-hidden="true" />
                                        The nightly installs next to the stable app as PlusTube Nightly and updates itself, so you can keep both.
                                    </p>
                                    <Group title="Android · PlusTube Nightly" note={`Built ${timeAgo(nightly.created)}${nightly.commit ? ` · ${nightly.commit}` : ''}`}>
                                        <Row title="PlusTube Nightly" detail="Universal APK · installs next to the stable app" href={nightly.apk.url} size={nightly.apk.size} />
                                    </Group>
                                    <p className="mt-4 text-sm text-text-secondary">
                                        <a href={nightly.release_url} target="_blank" rel="noopener noreferrer" className={linkClass}>Nightly release on GitHub</a>
                                        {nightly.checksums_url && (
                                            <>
                                                {' · '}
                                                <a href={nightly.checksums_url} className={linkClass}>checksums.txt</a>
                                            </>
                                        )}
                                    </p>
                                </section>
                            )}

                            <section id="verify" className="mt-20 md:mt-28 scroll-mt-12">
                                <SectionHeader kicker="Verify" title="Check that it's really PlusTube">
                                    <p>
                                        Every release is built from our public source on{' '}
                                        <a href="https://github.com/GothwadTech/tubeapp" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>.
                                        When a release ships a <code className="font-mono text-[13px]">checksums.txt</code>, compare the
                                        APK's SHA-256 against it, or use{' '}
                                        <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer" className={linkClass}>AppVerifier</a>
                                        {' '}to check the signing certificate before installing.
                                    </p>
                                </SectionHeader>
                                <div className="rounded-2xl border border-border-subtle bg-bg-card py-3 pl-5 pr-3">
                                    <p className="kicker mb-1.5">Latest release</p>
                                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                                        <code className="font-mono text-[13px] leading-relaxed text-text-primary break-all select-all">
                                            {android.checksums_url ? android.checksums_url : 'checksums.txt ships with each release when available'}
                                        </code>
                                        {android.checksums_url ? (
                                            <button
                                                type="button"
                                                onClick={() => copyValue(android.checksums_url!)}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-[13px] font-semibold text-text-primary hover:border-text-primary transition-colors"
                                            >
                                                {copied === android.checksums_url ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                                                {copied === android.checksums_url ? 'Copied' : 'Copy'}
                                            </button>
                                        ) : (
                                            <a
                                                href={android.release_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-[13px] font-semibold text-text-primary hover:border-text-primary transition-colors"
                                            >
                                                Open release
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-text-secondary">
                                    Not sure where to start?{' '}
                                    <Link to="/#faq-install" className={linkClass}>Read the install FAQ</Link>
                                    <ArrowRight className="inline w-3.5 h-3.5 ml-1 align-[-2px]" aria-hidden="true" />
                                </p>
                            </section>

                            <p className="mt-16 flex items-center gap-1.5 text-sm text-text-muted">
                                Looking for older versions? See all{' '}
                                <a href="https://github.com/GothwadTech/tubeapp/releases" target="_blank" rel="noopener noreferrer" className={linkClass}>releases on GitHub</a>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </p>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Download
