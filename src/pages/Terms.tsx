import { LegalPage, type LegalSection, AFFILIATION_NOTICE } from '@/components/layout/LegalPage'

const sections: LegalSection[] = [
    {
        id: 'agreement',
        title: 'Agreement to these terms',
        content: (
            <p>These terms cover your use of PlusTube (Gothwad Tube), its apps, and this website. By downloading or using PlusTube, you agree to them. If you don't agree, don't use it — it's free software, and there's no lock-in on either side.</p>
        ),
    },
    {
        id: 'what-plustube-is',
        title: 'What PlusTube is',
        content: (
            <>
                <p>PlusTube is a free, open-source client for YouTube and YouTube Music, licensed under GPL-3.0. It is built on the open-source <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">Flow</a> project by A-EDev and its contributors, and is maintained by Gothwad Tech.</p>
                <ul>
                    <li>PlusTube is <strong>not</strong> affiliated with, endorsed by, or sponsored by YouTube or Google.</li>
                    <li>PlusTube does not host, upload, store, or redistribute any videos or music. Everything plays from YouTube's own servers.</li>
                    <li>The app is provided as-is, with no warranty of any kind, as set out in the GPL-3.0 license.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'content',
        title: 'Content and copyright',
        content: (
            <>
                <p>All videos, music, thumbnails, and other content you access through PlusTube come from YouTube and belong to their respective creators and rights holders. You are responsible for how you use that content.</p>
                <ul>
                    <li>Follow <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube's Terms of Service</a> for the content you watch.</li>
                    <li>If something infringes your copyright, use <a href="https://support.google.com/youtube/answer/2807622" target="_blank" rel="noopener noreferrer">YouTube's copyright removal process</a> — see also our <a href="/dmca">DMCA page</a>.</li>
                    <li>Downloads are for your own offline viewing. Redistributing downloaded content may infringe copyright and is your responsibility.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'acceptable-use',
        title: 'Acceptable use',
        content: (
            <>
                <p>PlusTube is a normal client app. You may use it for personal, lawful viewing and listening. You may not:</p>
                <ul>
                    <li>use it to infringe copyright or bypass access controls you're not allowed to bypass;</li>
                    <li>abuse it to spam, scrape at scale, or attack YouTube's or any other service's infrastructure;</li>
                    <li>misrepresent the app as an official YouTube product.</li>
                </ul>
                <p>Break these and your license to use the app ends — though the source stays open under GPL-3.0 regardless.</p>
            </>
        ),
    },
    {
        id: 'accounts',
        title: 'Gothwad Accounts (coming later)',
        content: (
            <>
                <p>PlusTube works today with no account at all. A future version will offer an <strong>optional</strong> Gothwad Accounts sign-in, only for keeping your subscriptions and watch history in sync across your own devices.</p>
                <ul>
                    <li>The account stores only your basic login and those two data sets. No data collection, no profiling, no advertising.</li>
                    <li>You're responsible for keeping your login credentials safe. You can delete your account and its data at any time.</li>
                    <li>Using Gothwad Accounts is optional; PlusTube keeps its full feature set without it.</li>
                </ul>
                <p>When it ships, additional account terms may apply, and they will be published here.</p>
            </>
        ),
    },
    {
        id: 'ip',
        title: 'Intellectual property',
        content: (
            <>
                <p>The PlusTube source code is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer">GNU GPL v3</a>: you may use, study, share, and modify it under that license. Derivative works must stay open source under GPL-3.0 and keep the attribution to the original <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">Flow</a> project.</p>
                <p>"PlusTube", "Gothwad Tube", and "Gothwad Tech" are names used by Gothwad Tech. YouTube and YouTube Music are trademarks of Google LLC. {AFFILIATION_NOTICE}</p>
            </>
        ),
    },
    {
        id: 'disclaimer',
        title: 'Disclaimer and liability',
        content: (
            <>
                <p>PlusTube is provided <strong>“as is”</strong>, without warranty of any kind, express or implied. To the maximum extent permitted by law, Gothwad Tech is not liable for any damages arising from your use of the app or this website — including lost data, interrupted viewing, or anything a third-party service does.</p>
                <p>The app depends on YouTube and other third-party services that can change or break at any time. We do our best, but availability of any feature is not guaranteed.</p>
            </>
        ),
    },
    {
        id: 'website',
        title: 'This website',
        content: (
            <p>This website is provided for information and downloads. Don't abuse it (no scraping at scale, no attacks). Links to third-party sites like GitHub are provided for convenience; those sites have their own terms.</p>
        ),
    },
    {
        id: 'changes',
        title: 'Changes and contact',
        content: (
            <>
                <p>We may update these terms as PlusTube evolves — for example when Gothwad Accounts ships. The date at the top will change, and edits are visible in this website's public repository. Continuing to use PlusTube after a change means you accept it.</p>
                <p>Questions? Open an issue on <a href="https://github.com/GothwadTech/tubeapp/issues" target="_blank" rel="noopener noreferrer">GitHub</a> or reach Gothwad Tech through <a href="https://www.gothwadtech.com" target="_blank" rel="noopener noreferrer">gothwadtech.com</a>.</p>
            </>
        ),
    },
]

export function Terms() {
    return (
        <LegalPage
            kicker="Terms of Use"
            title="Simple terms,"
            accent="no fine-print traps."
            updated="12 October 2026"
            intro={<p>PlusTube (Gothwad Tube) is free, open-source software from Gothwad Tech. These terms are short and plain on purpose: they cover using the app and this website, the fact that all content comes from YouTube, and the plan for an optional Gothwad Accounts sign-in that syncs only your subscriptions and watch history — with no data collection.</p>}
            sections={sections}
        />
    )
}

export default Terms
