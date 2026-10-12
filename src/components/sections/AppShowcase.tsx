import { FadeIn } from '@/components/ui/TextReveal'

const mobileScreens = [
    { src: '/screenshots/Shorts.jpeg', label: 'Shorts' },
    { src: '/screenshots/Music.jpeg', label: 'Music' },
    { src: '/screenshots/Personality.jpeg', label: 'Your Taste' },
    { src: '/screenshots/Library.jpeg', label: 'Library' },
    { src: '/screenshots/Artist.jpeg', label: 'Artist' },
    { src: '/screenshots/Channel.jpeg', label: 'Channel' },
    { src: '/screenshots/Subscriptions.jpeg', label: 'Subscriptions' },
    { src: '/screenshots/Home.jpeg', label: 'Home Feed' },
    { src: '/screenshots/VideoPlayer.jpeg', label: 'Video Player' },
    { src: '/screenshots/MusicPlayer.jpeg', label: 'Music Player' },
]

function StripLabel({ title, note }: { title: string; note: string }) {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-baseline justify-between gap-4 mb-6">
            <span className="kicker text-text-secondary">{title}</span>
            <span className="kicker">{note}</span>
        </div>
    )
}

export function AppShowcase() {
    return (
        <section id="showcase" className="bg-bg-secondary border-b border-border-subtle py-20 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-16">
                <FadeIn>
                    <p className="kicker mb-4">01 &middot; Every Screen</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                        Made for Android. All of it.
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                        The same PlusTube on your phone, your tablet and your TV. One private
                        library, one on-device feed, one app built for every screen you own —
                        no desktop filler, no compromises.
                    </p>
                </FadeIn>
            </div>

            <StripLabel title="Phone &middot; Tablet &middot; Android TV" note="Available Now" />
            <div className="marquee w-full mb-6">
                <div className="marquee-track flex w-max gap-6 md:gap-8">
                    {[...mobileScreens, ...mobileScreens].map((screen, i) => (
                        <figure key={i} className="shrink-0 w-[170px] md:w-[210px]">
                            <div className="aspect-[1/2.16] rounded-2xl border border-border-subtle bg-bg-primary overflow-hidden">
                                <img
                                    src={screen.src}
                                    alt={`PlusTube on Android: ${screen.label}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <figcaption className="kicker mt-3 text-center">{screen.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            <p className="max-w-7xl mx-auto px-4 md:px-8 text-sm text-text-muted">
                Screens from PlusTube on Android. Android TV gets its own interface, built for the remote.
            </p>
        </section>
    )
}

export default AppShowcase
