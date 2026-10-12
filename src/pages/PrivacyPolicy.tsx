import { Link } from 'react-router-dom'
import { LegalPage, type LegalSection } from '@/components/layout/LegalPage'

const services = [
    {
        name: 'YouTube and YouTube Music',
        gets: 'Your requests: searches, video and channel IDs, search phrases built from your interests, and your subscribed channel IDs to fetch new uploads.',
        when: 'Whenever you browse or play, and in the background if new-video alerts are on.',
    },
    {
        name: 'SponsorBlock',
        gets: 'The ID of the video you\'re watching, as is. It isn\'t hashed.',
        when: 'When a video plays, if SponsorBlock is on. You can turn it off in the player settings.',
    },
    {
        name: 'DeArrow',
        gets: 'The IDs of videos being shown, to fetch community titles and thumbnails.',
        when: 'When videos are listed, if DeArrow is on. You can turn it off in the player settings.',
    },
    {
        name: 'Return YouTube Dislike',
        gets: 'The ID of the video you\'re watching.',
        when: 'When a video\'s page opens.',
    },
    {
        name: 'Lyrics providers',
        gets: 'The song\'s title and artist. Providers include LRCLIB, KuGou, Paxsenix and SimpMusic.',
        when: 'Only when you open lyrics.',
    },
    {
        name: 'Shazam',
        gets: 'An audio fingerprint of what the microphone hears.',
        when: 'Only while you use song recognition.',
    },
    {
        name: 'PipePipe decoder',
        gets: 'Data from YouTube\'s video player that\'s needed to play videos. Nothing about you.',
        when: 'When playback needs it.',
    },
    {
        name: 'GitHub',
        gets: 'A check for the latest release.',
        when: 'When PlusTube checks for updates. GitHub build only.',
    },
    {
        name: 'Your TV or speaker',
        gets: 'What you cast. Chromecast uses Google\'s Cast service on your phone; DLNA stays on your local network.',
        when: 'Only when you cast.',
    },
]

const permissions = [
    { name: 'Microphone', why: 'Song recognition.' },
    { name: 'Camera', why: 'Scanning the QR code that pairs two devices for sync.' },
    { name: 'Notifications', why: 'Playback controls, download progress and new-video alerts.' },
    { name: 'Wi-Fi and local network', why: 'Syncing between your devices and casting over DLNA.' },
    { name: 'Storage, music and video', why: 'Saving downloads and playing your local media library.' },
    { name: 'Display over other apps', why: 'The floating mini player.' },
    { name: 'Ignore battery optimization', why: 'Keeping background playback and downloads running.' },
]

function Rows({ rows }: { rows: { title: string; body: React.ReactNode; note?: string }[] }) {
    return (
        <div className="rounded-2xl border border-border-subtle bg-bg-card divide-y divide-border-subtle">
            {rows.map(row => (
                <div key={row.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                    <p className="font-display text-base font-semibold text-text-primary">{row.title}</p>
                    <div className="text-[15px]">
                        <p>{row.body}</p>
                        {row.note && <p className="mt-1.5 text-[13px] text-text-muted">{row.note}</p>}
                    </div>
                </div>
            ))}
        </div>
    )
}

const sections: LegalSection[] = [
    {
        id: 'summary',
        title: 'The short version',
        content: (
            <>
                <p>PlusTube has no account system today, no analytics or telemetry SDK, no crash reporting service, and no advertising identifier. There are no servers operated by the project that receive your data. Watch history, subscriptions, playlists, downloads, and PlusTube Neuro profiles live in a local database on your device. They leave it only if you explicitly export a backup or start a device-to-device sync over your own local network.</p>
                <p>We don't sell data. We can't, because we never collect it.</p>
            </>
        ),
    },
    {
        id: 'on-your-device',
        title: 'On your device',
        content: (
            <>
                <p>PlusTube stores your watch and search history, subscriptions, playlists, downloads, settings, and your PlusTube Neuro video and music profiles on your device.</p>
                <ul>
                    <li><strong>Export it</strong> from Settings, or schedule automatic backups to a folder you choose.</li>
                    <li><strong>Sync it</strong> between your own devices over local Wi-Fi, after pairing them with a QR code and matching codes. It doesn't pass through any server.</li>
                    <li><strong>Delete it</strong> by resetting your profiles in Settings &rsaquo; Your taste, clearing the app's data in Android settings, or uninstalling PlusTube.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'what-the-app-sends',
        title: 'What the app sends, and to whom',
        content: (
            <>
                <p>To show you videos and music, PlusTube talks directly to these services. Every request comes from your own IP address. PlusTube has no servers of its own and doesn't route anything through us, so we never see it. Each service handles your requests under its own privacy policy.</p>
                <Rows rows={services.map(s => ({ title: s.name, body: s.gets, note: s.when }))} />
            </>
        ),
    },
    {
        id: 'permissions',
        title: 'Permissions',
        content: (
            <>
                <p>What each Android permission PlusTube asks for is used for. Nothing is requested at launch; optional features ask when you first use them.</p>
                <Rows rows={permissions.map(p => ({ title: p.name, body: p.why }))} />
            </>
        ),
    },
    {
        id: 'gothwad-accounts',
        title: 'Gothwad Accounts — coming later',
        content: (
            <>
                <p>A future version of PlusTube will offer an optional <strong>Gothwad Accounts</strong> sign-in, so you can keep your subscriptions and watch history in sync across your own devices without doing manual backups.</p>
                <p>Here is exactly what that will and won't be, in advance:</p>
                <ul>
                    <li><strong>Only three things are stored on the account:</strong> your basic login (username and email), your subscriptions, and your watch history. That's it.</li>
                    <li><strong>Ordinary authentication only.</strong> Email and password sign-in with sessions and device management — the same model as the rest of Gothwad Accounts. No hidden tracking.</li>
                    <li><strong>No data collection.</strong> No analytics profiles, no advertising identifiers, no selling or sharing of anything, no third-party ad or tracking SDKs. Your history exists to sync <em>your</em> library, not to profile you.</li>
                    <li><strong>Optional and removable.</strong> PlusTube keeps working fully offline with no account at any time, and deleting your Gothwad Account deletes what it stored.</li>
                </ul>
                <p>When this ships, this policy will be updated with the exact endpoints and retention details, and the change will be visible in this website's public repository.</p>
            </>
        ),
    },
    {
        id: 'telemetry',
        title: 'Analytics and crash reports',
        content: (
            <p>PlusTube contains no analytics, tracking or crash-reporting code. We have no way of knowing how you use the app or whether it crashed. If something goes wrong, you can copy the error details and <a href="https://github.com/GothwadTech/tubeapp/issues/new?template=bug_report.yml" target="_blank" rel="noopener noreferrer">report it on GitHub</a> yourself.</p>
        ),
    },
    {
        id: 'this-website',
        title: 'This website',
        content: (
            <ul>
                <li>It's hosted on <strong>Cloudflare Pages</strong>, which keeps standard server logs, such as your IP address and the pages you request.</li>
                <li>Its fonts are served from this site. Nothing loads from Google.</li>
                <li>The <Link to="/about">About</Link> page loads contributor pictures from <strong>GitHub</strong>, so GitHub sees your IP address when you open it.</li>
                <li>Your light or dark mode choice is saved in your browser. There are no cookies, analytics or trackers.</li>
            </ul>
        ),
    },
    {
        id: 'children',
        title: 'Children',
        content: (
            <p>PlusTube doesn't knowingly collect any personal information from anyone, including children, because it doesn't collect personal information at all. If you believe a child has provided personal information to us through some other channel, contact us and we will delete it.</p>
        ),
    },
    {
        id: 'changes-and-contact',
        title: 'Changes and contact',
        content: (
            <>
                <p>When this policy changes, the date at the top changes, and the edit is visible in the website's public repository on GitHub.</p>
                <p>Questions? Open an issue on <a href="https://github.com/GothwadTech/tubeapp/issues" target="_blank" rel="noopener noreferrer">GitHub</a> or reach Gothwad Tech through <a href="https://www.gothwadtech.com" target="_blank" rel="noopener noreferrer">gothwadtech.com</a>.</p>
            </>
        ),
    },
]

export function PrivacyPolicy() {
    return (
        <LegalPage
            kicker="Privacy Policy"
            title="Your data"
            accent="stays yours."
            updated="12 October 2026"
            intro={<p>PlusTube (Gothwad Tube) has no analytics, no trackers and no servers that receive your data. What you do in the app stays on your device. To show you videos and music, the app talks directly to YouTube and a few other services, listed below with exactly what each one receives. A future optional Gothwad Accounts sign-in will sync only your subscriptions and watch history — no data collection — and this page explains that in advance.</p>}
            sections={sections}
        />
    )
}

export default PrivacyPolicy
