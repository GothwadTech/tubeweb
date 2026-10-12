import { FadeIn } from '@/components/ui/TextReveal'
import { ProductPreview, type ProductScreen } from '@/components/ui/ProductPreview'

const previews: {
    screen: ProductScreen
    index: string
    kicker: string
    title: string
    description: string
}[] = [
    {
        screen: 'feed',
        index: '01',
        kicker: 'A FEED THAT FEELS LIKE YOURS',
        title: 'Curiosity, without the profile.',
        description: 'Recommendations learn on your device. See what shaped your feed, change it, or start fresh whenever you like.',
    },
    {
        screen: 'music',
        index: '02',
        kicker: 'WATCH, LISTEN, MAKE IT YOURS',
        title: 'The details are in your hands.',
        description: 'Background play, lyrics, a real queue and controls that stay out of the way. Your library works offline, too.',
    },
    {
        screen: 'tv',
        index: '03',
        kicker: 'FROM POCKET TO LIVING ROOM',
        title: 'Ready for the big screen.',
        description: 'A TV-first layout built for a remote—not a stretched phone screen. Your experience stays yours on every device.',
    },
]

export function AppShowcase() {
    return (
        <section id="showcase" className="bg-bg-secondary border-b border-border-subtle py-20 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <FadeIn>
                    <div className="mb-12 md:mb-16 max-w-3xl">
                        <p className="kicker mb-4">01 &middot; Every Screen</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                            Made for Android. All of it.
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                            Phone, tablet or TV: PlusTube brings your library and private recommendations along.
                            These original interface illustrations are composed in React and CSS—not copied screenshots.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                    {previews.map((preview, i) => (
                        <FadeIn key={preview.screen} delay={i * 0.07}>
                            <figure className="product-showcase-card h-full">
                                <div className="product-showcase-card__visual">
                                    <div className="product-showcase-card__index">
                                        <span>{preview.index} / 03</span>
                                        <span>ILLUSTRATIVE UI</span>
                                    </div>
                                    <div className={preview.screen === 'tv' ? 'product-showcase-card__device product-showcase-card__device--tv' : 'product-showcase-card__device'}>
                                        <ProductPreview
                                            screen={preview.screen}
                                            className={preview.screen === 'tv' ? 'w-full max-w-[340px]' : 'w-[min(52vw,190px)]'}
                                        />
                                    </div>
                                </div>
                                <figcaption className="product-showcase-card__caption">
                                    <p className="kicker mb-3">{preview.kicker}</p>
                                    <h3>{preview.title}</h3>
                                    <p className="product-showcase-card__description">{preview.description}</p>
                                </figcaption>
                            </figure>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AppShowcase
