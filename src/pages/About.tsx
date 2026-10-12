import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Owner {
    login: string
    name: string | null
    bio: string | null
    avatar_url: string
    html_url: string
    followers: number
    public_repos: number
}

interface Repo {
    id: string
    label: string
    repo: string
    url: string
}

interface Contributor {
    login: string
    avatar_url: string
    html_url: string
    contributions: number
    repos: string[]
}

interface ContributorsData {
    owner: Owner
    repos: Repo[]
    contributors: Contributor[]
}

const fallbackOwner: Owner = {
    login: 'GothwadTech',
    name: 'Gothwad Tech',
    bio: null,
    avatar_url: 'https://avatars.githubusercontent.com/u/295316515?v=4',
    html_url: 'https://github.com/GothwadTech',
    followers: 0,
    public_repos: 0,
}

function sizedAvatar(url: string, size: number) {
    return `${url}${url.includes('?') ? '&' : '?'}s=${size}`
}

export function About() {
    const [data, setData] = useState<ContributorsData | null>(null)
    const [loaded, setLoaded] = useState(false)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetch('/contributors.json')
            .then(res => res.json())
            .then((json: ContributorsData) => {
                if (json && Array.isArray(json.contributors)) setData(json)
            })
            .catch(() => { })
            .finally(() => setLoaded(true))
    }, [])

    const owner = data?.owner ?? fallbackOwner
    const repos = data?.repos ?? []
    const contributors = data?.contributors ?? []
    const shown = filter === 'all' ? contributors : contributors.filter(c => c.repos.includes(filter))
    const activeRepo = repos.find(r => r.id === filter)

    const tabs = [
        { id: 'all', label: 'All', count: contributors.length },
        ...repos.map(r => ({ id: r.id, label: r.label, count: contributors.filter(c => c.repos.includes(r.id)).length })),
    ]

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <p className="kicker mb-5">About</p>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-6">
                            Why PlusTube{' '}
                            <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">exists.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
                            PlusTube — also known as Gothwad Tube — was born out of frustration with
                            streaming apps that treat watch-time as the goal and people as inventory.
                            Frustration with algorithms optimized for engagement rather than your actual
                            interests. It's our take on what a YouTube client should be: fast, private,
                            and completely on your side.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 py-12 md:py-16 border-t border-border-subtle">
                            <div>
                                <p className="kicker mb-3">Mission</p>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">Software that serves you</h2>
                                <p className="text-text-secondary leading-relaxed">
                                    To build a completely private, on-device media client that puts the user
                                    back in control. Software should serve the person using it, not the
                                    corporation tracking them — and that shouldn't be a premium feature.
                                </p>
                            </div>
                            <div>
                                <p className="kicker mb-3">Open Source</p>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">Built in the open</h2>
                                <p className="text-text-secondary leading-relaxed">
                                    PlusTube is fully open source under GPL-3.0. We believe in transparency,
                                    community contribution, and your right to inspect the code that runs on
                                    your device. Made in India by Gothwad Tech.
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.05}>
                        <section className="py-12 md:py-16 border-t border-border-subtle">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                                <div className="md:col-span-4">
                                    <p className="kicker mb-3">Roots</p>
                                    <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight">
                                        Standing on{' '}
                                        <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">Flow.</span>
                                    </h2>
                                </div>
                                <div className="md:col-span-8">
                                    <p className="text-text-secondary leading-relaxed max-w-2xl">
                                        PlusTube is built on the open-source{' '}
                                        <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer" className="font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary">Flow</a>
                                        {' '}project by A-EDev and its 85+ contributors. We adopted it, rebranded
                                        it as PlusTube under Gothwad Tech, and keep developing it under the same
                                        GPL-3.0 license. Full credit belongs to Flow and everyone who
                                        contributed to it — their work is why this app exists, and their names
                                        stay in the contributor list below, in the changelog, and in the source.
                                    </p>
                                    <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl">
                                        PlusTube also stands on the shoulders of NewPipe, PipePipe, LibreTube,
                                        MetroList and ExoPlayer — see the acknowledgments in the{' '}
                                        <a href="https://github.com/GothwadTech/tubeapp" target="_blank" rel="noopener noreferrer" className="font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary">app repository</a>
                                        {' '}for the full list.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.05}>
                        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12 md:py-16 border-t border-border-subtle">
                            <div className="md:col-span-4">
                                <p className="kicker mb-3">Built by</p>
                                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight">
                                    The team{' '}
                                    <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">behind it.</span>
                                </h2>
                            </div>

                            <div className="md:col-span-8">
                                <div className="rounded-2xl border-2 border-text-primary p-6 md:p-8 flex flex-col sm:flex-row gap-6 sm:items-center">
                                    <img
                                        src={sizedAvatar(owner.avatar_url, 192)}
                                        alt={`${owner.name ?? owner.login}'s GitHub avatar`}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-full bg-bg-elevated ring-1 ring-border-subtle shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-display text-3xl font-semibold tracking-[-0.025em] leading-none">
                                            {owner.name ?? owner.login}
                                        </p>
                                        <p className="kicker mt-2">@{owner.login}</p>
                                        {owner.bio && <p className="mt-4 text-text-secondary leading-relaxed">{owner.bio}</p>}
                                        {owner.followers > 0 && (
                                            <p className="kicker mt-4 flex flex-wrap gap-x-5 gap-y-1">
                                                <span><span className="text-text-primary">{owner.followers}</span> followers</span>
                                                <span><span className="text-text-primary">{owner.public_repos}</span> public repos</span>
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        href={owner.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="primary"
                                        size="sm"
                                        className="self-start sm:self-center shrink-0 px-5 py-2.5"
                                        icon={<ArrowUpRight className="w-4 h-4" />}
                                    >
                                        GitHub
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <section className="py-12 md:py-16 border-t border-border-subtle">
                        <FadeIn>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10">
                                <div className="md:col-span-4">
                                    <p className="kicker mb-3">Contributors</p>
                                    <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight">
                                        {contributors.length > 0 ? `${contributors.length} people` : 'Everyone'} who helped{' '}
                                        <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">build it.</span>
                                    </h2>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-6">
                                    <p className="text-text-secondary leading-relaxed max-w-xl">
                                        Code, translations and fixes from PlusTube, this website, and the
                                        upstream Flow project. Every face below links to their GitHub profile.
                                    </p>
                                    {repos.length > 0 && (
                                        <div className="inline-flex flex-wrap self-start gap-1 rounded-xl border border-border-subtle p-1" role="group" aria-label="Filter by project">
                                            {tabs.map(tab => (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    aria-pressed={filter === tab.id}
                                                    onClick={() => setFilter(tab.id)}
                                                    className={cn(
                                                        'flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                                                        filter === tab.id ? 'bg-text-primary text-bg-primary' : 'text-text-secondary hover:text-text-primary'
                                                    )}
                                                >
                                                    {tab.label}
                                                    <span className={cn('font-mono text-[11px] tabular-nums', filter === tab.id ? 'opacity-70' : 'text-text-muted')}>
                                                        {tab.count}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FadeIn>

                        {!loaded ? (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-x-4 gap-y-7" aria-hidden="true">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2.5">
                                        <div className="w-16 h-16 rounded-full bg-bg-elevated" />
                                        <div className="h-2.5 w-14 rounded bg-bg-elevated" />
                                    </div>
                                ))}
                            </div>
                        ) : shown.length > 0 ? (
                            <ul className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-x-4 gap-y-7">
                                {shown.map(person => (
                                    <li key={person.login}>
                                        <a
                                            href={person.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={`${person.login} · ${person.contributions} ${person.contributions === 1 ? 'contribution' : 'contributions'}`}
                                            className="group flex flex-col items-center gap-2.5 text-center"
                                        >
                                            <img
                                                src={sizedAvatar(person.avatar_url, 128)}
                                                alt=""
                                                width={64}
                                                height={64}
                                                loading="lazy"
                                                className="w-16 h-16 rounded-full bg-bg-elevated ring-1 ring-border-subtle transition-all duration-200 group-hover:ring-2 group-hover:ring-text-primary group-hover:ring-offset-2 group-hover:ring-offset-bg-primary"
                                            />
                                            <span className="w-full truncate text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                                                {person.login}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rounded-2xl border border-border-subtle px-6 py-12 text-center">
                                <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                                    {activeRepo
                                        ? `No outside contributors to the ${activeRepo.label.toLowerCase()} yet. It's maintained by ${owner.login}, and pull requests are welcome.`
                                        : 'The contributor list is unavailable right now.'}
                                </p>
                                {activeRepo && (
                                    <a
                                        href={activeRepo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="kicker inline-flex items-center gap-1.5 mt-5 text-text-primary hover:underline underline-offset-4"
                                    >
                                        {activeRepo.repo}
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                        )}
                    </section>

                    <FadeIn delay={0.1}>
                        <div className="mt-4 rounded-2xl border-2 border-text-primary p-8 md:p-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                            <div>
                                <p className="kicker mb-4">Get involved</p>
                                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight mb-3">
                                    Want to see your face{' '}
                                    <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">up there?</span>
                                </h2>
                                <p className="text-text-secondary max-w-xl leading-relaxed">
                                    Pick up an issue, send a pull request, or help translate PlusTube into
                                    your language.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    href="https://github.com/GothwadTech/tubeapp/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="primary"
                                    size="md"
                                    icon={<ArrowUpRight className="w-4 h-4" />}
                                >
                                    Browse issues
                                </Button>
                                <Button
                                    href="https://github.com/GothwadTech/tubeapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outline"
                                    size="md"
                                    icon={<ArrowUpRight className="w-4 h-4" />}
                                >
                                    Contribute on GitHub
                                </Button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default About
