import { LegalPage, type LegalSection, AFFILIATION_NOTICE } from '@/components/layout/LegalPage'

const sections: LegalSection[] = [
    {
        id: 'what-plustube-is',
        title: 'What PlusTube is',
        content: (
            <p>PlusTube (Gothwad Tube) is a free, open-source app, licensed under GPL-3.0, that plays YouTube's public catalog. It doesn't host, upload, store or redistribute any videos or music. Everything you watch or hear in PlusTube is streamed directly from YouTube.</p>
        ),
    },
    {
        id: 'content-on-youtube',
        title: 'Content on YouTube',
        content: (
            <>
                <p>If a video or song infringes your copyright, the place to act is YouTube, which hosts it. Use <a href="https://support.google.com/youtube/answer/2807622" target="_blank" rel="noopener noreferrer">YouTube's copyright removal process</a>.</p>
                <p>Once YouTube removes something, it's gone from PlusTube too. Removing PlusTube from distribution wouldn't take the content down.</p>
            </>
        ),
    },
    {
        id: 'this-website',
        title: 'This website',
        content: (
            <p>The interface previews on this site are original illustrations rendered in React and CSS. They do not reproduce app screenshots, video thumbnails, channel art or album covers. If you believe a visual on this site uses your work, contact us and we will review it.</p>
        ),
    },
    {
        id: 'source-code',
        title: 'PlusTube\'s source code',
        content: (
            <p>PlusTube's code is public on <a href="https://github.com/GothwadTech/tubeapp" target="_blank" rel="noopener noreferrer">GitHub</a> under GPL-3.0. It is built on the open-source <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">Flow</a> project. If you believe any part of it infringes your rights, open an issue there and we'll look into it.</p>
        ),
    },
    {
        id: 'trademarks',
        title: 'Trademarks',
        content: (
            <p>{AFFILIATION_NOTICE} Other product names mentioned on this site belong to their owners.</p>
        ),
    },
    {
        id: 'contact',
        title: 'Contact',
        content: (
            <p>Open an issue on <a href="https://github.com/GothwadTech/tubeapp/issues" target="_blank" rel="noopener noreferrer">GitHub</a>. For anything you'd rather not post publicly, reach out to Gothwad Tech through <a href="https://www.gothwadtech.com" target="_blank" rel="noopener noreferrer">gothwadtech.com</a>.</p>
        ),
    },
]

export function DMCA() {
    return (
        <LegalPage
            kicker="Copyright & DMCA"
            title="Nothing hosted,"
            accent="nothing to take down."
            updated="12 October 2026"
            intro={<p>PlusTube is a client app. It plays videos that live on YouTube and doesn't store any of them. Here's where to go if you believe something infringes your copyright.</p>}
            sections={sections}
        />
    )
}

export default DMCA
