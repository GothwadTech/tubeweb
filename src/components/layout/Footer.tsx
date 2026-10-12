import { Link } from 'react-router-dom'
import { ArrowRight, Github, Heart, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useStats } from '@/lib/useStats'
import { AFFILIATION_NOTICE } from '@/components/layout/LegalPage'

interface FooterLink {
    label: string
    href: string
    external?: boolean
}

const columns: { title: string; links: FooterLink[] }[] = [
    {
        title: 'Get PlusTube',
        links: [
            { label: 'Download', href: '/download' },
            { label: 'GitHub Releases', href: 'https://github.com/GothwadTech/tubeapp/releases', external: true },
            { label: 'Nightly Builds', href: '/download#nightly' },
            { label: 'Verify Your APK', href: '/download#verify' },
        ],
    },
    {
        title: 'Learn',
        links: [
            { label: 'Features', href: '/#features' },
            { label: 'How Neuro Works', href: '/how-it-works' },
            { label: 'Every Screen', href: '/#showcase' },
            { label: 'Changelog', href: '/changelog' },
        ],
    },
    {
        title: 'Get Help',
        links: [
            { label: 'Report an Issue', href: 'https://github.com/GothwadTech/tubeapp/issues', external: true },
            { label: 'Security', href: 'https://github.com/GothwadTech/tubeapp/security/policy', external: true },
            { label: 'Gothwad Tech', href: 'https://www.gothwadtech.com', external: true },
            { label: 'Follow @GothwadTech', href: 'https://x.com/GothwadTech', external: true },
        ],
    },
]

const aboutLinks: FooterLink[] = [
    { label: 'About PlusTube', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'DMCA', href: '/dmca' },
]

function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const socials = [
    { label: 'GitHub', href: 'https://github.com/GothwadTech', icon: Github },
    { label: 'X / Twitter', href: 'https://x.com/GothwadTech', icon: XIcon },
    { label: 'Gothwad Tech', href: 'https://www.gothwadtech.com', icon: Globe },
]

const RING_CENTER = { x: 560, y: 420 }
const LOGO_HALF = { w: 40, h: 40, r: 16 }
const RING_OFFSETS = [56, 128, 200, 272]

function FooterRings() {
    return (
        <svg
            viewBox="0 0 640 480"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 w-[min(92vw,420px)] md:w-[min(52vw,720px)] opacity-[0.14] xl:opacity-100 text-text-primary"
        >
            {RING_OFFSETS.map(d => (
                <rect
                    key={d}
                    x={RING_CENTER.x - LOGO_HALF.w - d}
                    y={RING_CENTER.y - LOGO_HALF.h - d}
                    width={(LOGO_HALF.w + d) * 2}
                    height={(LOGO_HALF.h + d) * 2}
                    rx={LOGO_HALF.r + d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={36}
                />
            ))}
            <g transform={`translate(${RING_CENTER.x - 48} ${RING_CENTER.y - 48}) scale(1.5)`}>
                <rect x="2" y="2" width="60" height="60" rx="16" fill="#FF3B30" />
                <path d="M25 19.5c0-1.9 2.1-3.1 3.7-2.1l16.6 9.6c1.6.9 1.6 3.2 0 4.2l-16.6 9.6c-1.6.9-3.7-.2-3.7-2.1V19.5z" fill="#FFFFFF" />
                <circle cx="18.5" cy="32" r="3.4" fill="#FFFFFF" opacity="0.9" />
            </g>
        </svg>
    )
}

function FooterLinkItem({ link }: { link: FooterLink }) {
    const className = 'text-[15px] text-text-secondary hover:text-text-primary transition-colors'
    if (link.external) {
        return <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{link.label}</a>
    }
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (link.href.startsWith('/#') && window.location.pathname === '/') {
            e.preventDefault()
            document.querySelector(link.href.replace('/#', '#'))?.scrollIntoView({ behavior: 'smooth' })
        }
    }
    return <Link to={link.href} onClick={onClick} className={className}>{link.label}</Link>
}

export function Footer() {
    const stats = useStats()

    return (
        <footer className="bg-bg-primary px-2 pb-2 md:px-3 md:pb-3">
            <div className="tone-inverse relative overflow-hidden rounded-[24px] md:rounded-[32px]">
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-16">
                    <h2 className="text-6xl md:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] text-text-primary mb-5">
                        PlusTube
                    </h2>
                    <p className="max-w-md text-base md:text-lg font-medium leading-relaxed text-text-primary">
                        Gothwad Tube — a private, open-source YouTube and YouTube Music client for Android.
                        No ads, no tracking. Your feed learns on your device and nowhere else.
                    </p>

                    <Button
                        to="/download"
                        variant="primary"
                        size="md"
                        className="mt-8"
                        icon={<ArrowRight className="w-4 h-4" />}
                    >
                        Download
                    </Button>

                    <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 max-w-2xl">
                        <div>
                            <h3 className="font-sans text-[15px] font-semibold text-text-primary mb-4">Follow Gothwad Tech</h3>
                            <ul className="flex items-center gap-4">
                                {socials.map(social => (
                                    <li key={social.label}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="block text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="font-sans text-[15px] font-semibold text-text-primary mt-10 mb-4">About</h3>
                            <ul className="space-y-3">
                                {aboutLinks.map(link => <li key={link.label}><FooterLinkItem link={link} /></li>)}
                            </ul>
                        </div>

                        {columns.map(column => (
                            <div key={column.title}>
                                <h3 className="font-sans text-[15px] font-semibold text-text-primary mb-4">{column.title}</h3>
                                <ul className="space-y-3">
                                    {column.links.map(link => <li key={link.label}><FooterLinkItem link={link} /></li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 max-w-2xl">
                        <p className="text-base font-medium text-text-primary flex flex-wrap items-center gap-x-1.5">
                            Made with <Heart className="w-4 h-4 text-accent-primary fill-accent-primary" aria-label="love" /> by
                            <a
                                href="https://github.com/GothwadTech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-primary underline decoration-[1.5px] underline-offset-4 hover:text-accent-hover"
                            >
                                Gothwad Tech
                            </a>
                            and
                            <a
                                href="https://github.com/GothwadTech/tubeapp/graphs/contributors"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-[1.5px] underline-offset-4 decoration-text-muted hover:decoration-text-primary"
                            >
                                {stats?.contributors ? `${stats.contributors} contributors` : 'the community'}
                            </a>
                        </p>
                        <p className="kicker">
                            <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GPL-3.0</a>
                            {' '}&middot; &copy; {new Date().getFullYear()} Gothwad Tech
                        </p>
                    </div>

                    <p className="mt-4 text-sm text-text-muted max-w-2xl">
                        PlusTube is built on the open-source{' '}
                        <a
                            href="https://github.com/A-EDev/Flow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-text-muted underline-offset-4 hover:text-text-primary hover:decoration-text-primary transition-colors"
                        >
                            Flow
                        </a>
                        {' '}project by A-EDev and its contributors. Full credit and thanks to everyone who built Flow.
                    </p>
                    <p className="mt-2 text-sm text-text-muted max-w-2xl">
                        Parts of this website's design were inspired by{' '}
                        <a
                            href="https://zen-browser.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-text-muted underline-offset-4 hover:text-text-primary hover:decoration-text-primary transition-colors"
                        >
                            Zen Browser's website
                        </a>
                        .
                    </p>
                    <p className="mt-2 text-sm text-text-muted max-w-2xl">{AFFILIATION_NOTICE}</p>
                </div>

                <FooterRings />
            </div>
        </footer>
    )
}

export default Footer
