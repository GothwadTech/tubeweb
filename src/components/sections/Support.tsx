import { ArrowRight, ArrowUpRight, Heart, Star } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'

const timeLinks = [
    { title: 'Report a bug', description: 'Opens the bug report form on GitHub.', href: 'https://github.com/GothwadTech/tubeapp/issues/new?template=bug_report.yml' },
    { title: 'Suggest a feature', description: 'Opens the feature request form.', href: 'https://github.com/GothwadTech/tubeapp/issues/new?template=feature_request.yml' },
    { title: 'Contribute code', description: 'Read the contributing guide and send a pull request.', href: 'https://github.com/GothwadTech/tubeapp/blob/main/CONTRIBUTING.md' },
    { title: 'Translate PlusTube', description: 'Help PlusTube speak your language — open a PR with your strings.', href: 'https://github.com/GothwadTech/tubeapp' },
]

const ecosystemLinks = [
    { title: 'Gothwad Tech', description: 'The home of PlusTube, Gothwad Mail, Gothwad Accounts and more.', href: 'https://www.gothwadtech.com' },
    { title: 'Gothwad Accounts', description: 'One Gothwad account for the whole ecosystem — coming to PlusTube.', href: 'https://github.com/GothwadTech/accounts' },
    { title: 'X / Twitter', description: 'Follow @GothwadTech for release news and updates.', href: 'https://x.com/GothwadTech' },
]

export function Support() {
    return (
        <Section id="support" fullHeight={false} className="py-24 md:py-32 bg-bg-secondary border-b border-border-subtle">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <FadeIn className="lg:col-span-5">
                    <p className="kicker mb-4">05 &middot; Support</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.02] text-text-primary mb-6">
                        Free forever.{' '}
                        <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">Built together.</span>
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        PlusTube has no ads, no telemetry and no paid tier. It grows because people
                        use it, report what breaks, and pitch in. Time or a GitHub star — both move
                        it forward.
                    </p>
                    <p className="kicker mt-6 flex flex-wrap gap-x-5 gap-y-1">
                        <span><span className="text-text-primary">GPL-3.0</span> open source</span>
                        <span><span className="text-text-primary">No</span> ads, ever</span>
                    </p>
                    <Button
                        href="https://github.com/GothwadTech/tubeapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="md"
                        className="mt-6"
                        icon={<Star className="w-4 h-4" />}
                        iconPosition="left"
                    >
                        Star on GitHub
                    </Button>
                </FadeIn>

                <FadeIn delay={0.1} className="lg:col-span-7 flex flex-col gap-4">
                    <div className="rounded-2xl border-2 border-text-primary bg-bg-primary p-6 md:p-8">
                        <p className="kicker mb-3">Give time</p>
                        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary mb-2">Make PlusTube better</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Every bug report, idea and pull request goes straight into the app.
                            PlusTube stands on Flow and its 85+ contributors — that chain of
                            contribution is how it got here.
                        </p>
                        <ul className="mt-5">
                            {timeLinks.map(link => (
                                <li key={link.title}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 rounded-xl px-2 py-3.5 hover:bg-bg-secondary transition-colors"
                                    >
                                        <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{link.title}</span>
                                        <ArrowUpRight className="row-span-2 w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" aria-hidden="true" />
                                        <span className="text-sm text-text-secondary">{link.description}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border-subtle bg-bg-primary p-2">
                        <p className="kicker px-4 pt-3 pb-1">The Gothwad ecosystem</p>
                        <ul>
                            {ecosystemLinks.map(link => (
                                <li key={link.title}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 rounded-xl px-4 py-3.5 hover:bg-bg-secondary transition-colors"
                                    >
                                        <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{link.title}</span>
                                        <ArrowUpRight className="row-span-2 w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" aria-hidden="true" />
                                        <span className="text-sm text-text-secondary">{link.description}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="flex items-center gap-1.5 px-2 text-sm text-text-muted">
                        Made with <Heart className="w-4 h-4 text-accent-primary fill-accent-primary" aria-label="love" /> by
                        Gothwad Tech in India.
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </p>
                </FadeIn>
            </div>
        </Section>
    )
}

export default Support
