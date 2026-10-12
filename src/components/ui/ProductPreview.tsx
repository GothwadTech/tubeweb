import type { ReactNode } from 'react'
import {
    BatteryFull,
    Check,
    ChevronRight,
    Compass,
    Heart,
    Home,
    Library,
    ListMusic,
    Pause,
    Play,
    Search,
    ShieldCheck,
    Shuffle,
    Signal,
    SkipBack,
    SkipForward,
    Sparkles,
    Wifi,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type ProductScreen = 'feed' | 'watch' | 'music' | 'library' | 'taste' | 'tv'

interface ProductPreviewProps {
    screen: ProductScreen
    className?: string
}

const screenLabels: Record<ProductScreen, string> = {
    feed: 'personalized home feed',
    watch: 'video player',
    music: 'music player',
    library: 'personal library',
    taste: 'on-device recommendation profile',
    tv: 'Android TV home screen',
}

function StatusBar() {
    return (
        <div className="product-statusbar" aria-hidden="true">
            <span>9:41</span>
            <span className="product-statusbar__signals">
                <Signal />
                <Wifi />
                <BatteryFull />
            </span>
        </div>
    )
}

function AppBar({ section }: { section: string }) {
    return (
        <div className="product-appbar">
            <div className="product-appbar__brand">
                <img src="/icons/icon-192.png" alt="" />
                <span>PlusTube</span>
            </div>
            <span className="product-appbar__section">{section}</span>
            <Search aria-hidden="true" />
        </div>
    )
}

function BottomNav({ active }: { active: 'Home' | 'Explore' | 'Library' | 'You' }) {
    const items = [
        { label: 'Home' as const, Icon: Home },
        { label: 'Explore' as const, Icon: Compass },
        { label: 'Library' as const, Icon: Library },
        { label: 'You' as const, Icon: Sparkles },
    ]

    return (
        <div className="product-bottom-nav" aria-hidden="true">
            {items.map(({ label, Icon }) => (
                <span key={label} className={cn('product-bottom-nav__item', active === label && 'is-active')}>
                    <Icon />
                    <span>{label}</span>
                </span>
            ))}
        </div>
    )
}

function Artwork({ palette, className }: { palette: 'blue' | 'violet' | 'amber' | 'mint' | 'rose'; className?: string }) {
    return (
        <div className={cn('product-artwork', `product-artwork--${palette}`, className)} aria-hidden="true">
            <span className="product-artwork__orbit" />
            <span className="product-artwork__sun" />
            <span className="product-artwork__ridge product-artwork__ridge--back" />
            <span className="product-artwork__ridge product-artwork__ridge--front" />
            <span className="product-artwork__stamp">PT · ORIGINAL</span>
        </div>
    )
}

function FeedScreen() {
    return (
        <>
            <AppBar section="Home" />
            <div className="product-phone__main product-feed">
                <div className="product-screen-heading">
                    <div>
                        <span className="product-eyebrow">A LITTLE MORE YOU</span>
                        <h3>For you</h3>
                    </div>
                    <span className="product-avatar product-avatar--blue">G</span>
                </div>
                <div className="product-chip-row" aria-hidden="true">
                    <span className="is-active">All</span>
                    <span>Fresh</span>
                    <span>Music</span>
                    <span>Ideas</span>
                </div>
                <div className="product-feed-feature">
                    <Artwork palette="violet" className="product-feed-feature__art" />
                    <span className="product-eyebrow">PICKED FOR YOUR CURIOSITY</span>
                    <strong>A little room for a new idea</strong>
                    <span className="product-meta">12 min · chosen on your device</span>
                </div>
                <div className="product-list-heading">
                    <strong>More in your orbit</strong>
                    <ChevronRight aria-hidden="true" />
                </div>
                <div className="product-feed-row">
                    <Artwork palette="amber" className="product-feed-row__art" />
                    <span className="product-feed-row__copy">
                        <span className="product-eyebrow">FIELD NOTES · 8 MIN</span>
                        <strong>Small things, seen differently</strong>
                        <span className="product-meta">An easy watch for later</span>
                    </span>
                </div>
            </div>
            <BottomNav active="Home" />
        </>
    )
}

function WatchScreen() {
    return (
        <>
            <AppBar section="Watching" />
            <div className="product-phone__main product-watch">
                <div className="product-watch__stage">
                    <Artwork palette="blue" className="product-watch__art" />
                    <span className="product-play-button"><Play fill="currentColor" /></span>
                    <span className="product-watch__quality">1080p</span>
                </div>
                <div className="product-progress" aria-hidden="true"><span /></div>
                <div className="product-time-row"><span>08:24</span><span>18:42</span></div>
                <div className="product-watch__title">
                    <strong>Make space for a new idea</strong>
                    <span>Field Notes · 38K views · 2 days ago</span>
                </div>
                <div className="product-channel-row">
                    <span className="product-avatar product-avatar--rose">F</span>
                    <span><strong>Field Notes</strong><small>Creative living</small></span>
                    <span className="product-follow">Subscribe</span>
                </div>
                <div className="product-action-row" aria-hidden="true">
                    <span><Heart /><small>Like</small></span>
                    <span><ListMusic /><small>Save</small></span>
                    <span><Sparkles /><small>Thanks</small></span>
                    <span><ChevronRight /><small>More</small></span>
                </div>
                <div className="product-next-row">
                    <Artwork palette="mint" className="product-next-row__art" />
                    <span><span className="product-eyebrow">UP NEXT · NEURO PICK</span><strong>Follow the interesting thread</strong></span>
                </div>
            </div>
            <BottomNav active="Explore" />
        </>
    )
}

function MusicScreen() {
    return (
        <>
            <AppBar section="Music" />
            <div className="product-phone__main product-music">
                <div className="product-music__eyebrow"><span>NOW PLAYING</span><span>•••</span></div>
                <Artwork palette="rose" className="product-music__cover" />
                <div className="product-music__track">
                    <span><strong>Here, for a while</strong><small>Slowline · Quiet hours</small></span>
                    <Heart aria-hidden="true" />
                </div>
                <div className="product-progress product-progress--music" aria-hidden="true"><span /></div>
                <div className="product-time-row"><span>1:12</span><span>3:48</span></div>
                <div className="product-music__controls" aria-hidden="true">
                    <Shuffle />
                    <SkipBack fill="currentColor" />
                    <span className="product-pause-button"><Pause fill="currentColor" /></span>
                    <SkipForward fill="currentColor" />
                    <ListMusic />
                </div>
                <div className="product-lyrics">
                    <span className="product-eyebrow">NEXT LINE</span>
                    <strong>Let the day unfold at its own pace</strong>
                </div>
            </div>
            <BottomNav active="Library" />
        </>
    )
}

function LibraryScreen() {
    const rows = [
        { title: 'Listen again', detail: '18 videos · updated today', palette: 'blue' as const },
        { title: 'Saved for later', detail: 'A little time, well spent', palette: 'amber' as const },
        { title: 'Quiet hours', detail: '34 tracks · playlist', palette: 'rose' as const },
    ]

    return (
        <>
            <AppBar section="Your library" />
            <div className="product-phone__main product-library">
                <div className="product-screen-heading">
                    <div><span className="product-eyebrow">ALL YOUR GOOD STUFF</span><h3>Library</h3></div>
                    <span className="product-round-button"><Search aria-hidden="true" /></span>
                </div>
                <div className="product-chip-row" aria-hidden="true">
                    <span className="is-active">Playlists</span><span>History</span><span>Downloads</span>
                </div>
                <div className="product-library-feature">
                    <div className="product-library-feature__icon"><ListMusic aria-hidden="true" /></div>
                    <span><strong>Made for your day</strong><small>A mix from your own listening</small></span>
                    <Play fill="currentColor" aria-hidden="true" />
                </div>
                <div className="product-list-heading"><strong>Saved collections</strong><span>3</span></div>
                {rows.map(row => (
                    <div className="product-library-row" key={row.title}>
                        <Artwork palette={row.palette} className="product-library-row__art" />
                        <span><strong>{row.title}</strong><small>{row.detail}</small></span>
                        <ChevronRight aria-hidden="true" />
                    </div>
                ))}
            </div>
            <BottomNav active="Library" />
        </>
    )
}

function TasteScreen() {
    const interests = [
        { label: 'Design', value: '82%', color: 'blue' },
        { label: 'Live music', value: '64%', color: 'violet' },
        { label: 'Slow living', value: '48%', color: 'mint' },
    ]

    return (
        <>
            <AppBar section="Your taste" />
            <div className="product-phone__main product-taste">
                <div className="product-screen-heading">
                    <div><span className="product-eyebrow">PLUS TUBE NEURO</span><h3>Your taste</h3></div>
                    <span className="product-private-pill"><ShieldCheck aria-hidden="true" /> On device</span>
                </div>
                <div className="product-taste-card">
                    <div className="product-taste-card__ring"><span><Sparkles aria-hidden="true" /><strong>38%</strong></span></div>
                    <span><span className="product-eyebrow">YOUR PROFILE</span><strong>Curious listener</strong><small>Still finding its rhythm</small></span>
                </div>
                <div className="product-list-heading"><strong>Interests taking shape</strong><span>See all</span></div>
                <div className="product-interest-list">
                    {interests.map(item => (
                        <div className="product-interest" key={item.label}>
                            <span className={`product-interest__dot product-interest__dot--${item.color}`} />
                            <span className="product-interest__name">{item.label}</span>
                            <span className="product-interest__track"><span style={{ width: item.value }} /></span>
                            <span className="product-interest__value">{item.value}</span>
                        </div>
                    ))}
                </div>
                <div className="product-privacy-note"><Check aria-hidden="true" /><span>Your profile stays on this device. Always.</span></div>
            </div>
            <BottomNav active="You" />
        </>
    )
}

function TvPreview() {
    return (
        <div className="product-tv__layout">
            <div className="product-tv__screen">
                <header className="product-tv__header">
                    <span className="product-tv__brand"><img src="/icons/icon-192.png" alt="" /> PlusTube</span>
                    <span className="product-tv__status"><span /> YOUR FEED, YOURS ALONE</span>
                </header>
                <div className="product-tv__body">
                    <nav className="product-tv__nav" aria-hidden="true">
                        <span className="is-active"><Home /> Home</span>
                        <span><Compass /> Explore</span>
                        <span><Library /> Library</span>
                    </nav>
                    <div className="product-tv__content">
                        <span className="product-eyebrow">TONIGHT, ON YOUR TERMS</span>
                        <h3>A good place to begin.</h3>
                        <p>Pick a thread. Follow it wherever it goes.</p>
                        <div className="product-tv__cards">
                            <Artwork palette="violet" className="product-tv__card-art" />
                            <Artwork palette="blue" className="product-tv__card-art" />
                            <Artwork palette="amber" className="product-tv__card-art" />
                        </div>
                    </div>
                </div>
            </div>
            <span className="product-tv__stand" aria-hidden="true" />
        </div>
    )
}

function ScreenContent({ screen }: { screen: Exclude<ProductScreen, 'tv'> }) {
    const content: Record<Exclude<ProductScreen, 'tv'>, ReactNode> = {
        feed: <FeedScreen />,
        watch: <WatchScreen />,
        music: <MusicScreen />,
        library: <LibraryScreen />,
        taste: <TasteScreen />,
    }

    return <>{content[screen]}</>
}

export function ProductPreview({ screen, className }: ProductPreviewProps) {
    const label = `Code-rendered PlusTube ${screenLabels[screen]} illustration`

    if (screen === 'tv') {
        return (
            <div className={cn('product-tv', className)} role="img" aria-label={label}>
                <TvPreview />
            </div>
        )
    }

    return (
        <div className={cn('product-phone', className)} role="img" aria-label={label}>
            <div className="product-phone__screen">
                <span className="product-phone__island" aria-hidden="true" />
                <StatusBar />
                <ScreenContent screen={screen} />
            </div>
        </div>
    )
}
