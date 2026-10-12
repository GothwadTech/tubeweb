import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductPreview } from '@/components/ui/ProductPreview'

const ease = [0.16, 1, 0.3, 1] as const

const heroScreens = [
    { screen: 'watch' as const, className: 'hidden sm:block w-[clamp(145px,17vw,194px)] rotate-[-7deg] translate-y-8' },
    { screen: 'feed' as const, className: 'w-[clamp(188px,22vw,236px)] relative z-10' },
    { screen: 'music' as const, className: 'hidden sm:block w-[clamp(145px,17vw,194px)] rotate-[7deg] translate-y-8' },
]

const proof = [
    { value: 'Free', label: 'and open source' },
    { value: 'Android 8.0+', label: 'phone · tablet · TV' },
    { value: '0', label: 'ads or trackers' },
]

export function Hero() {
    const reduceMotion = useReducedMotion()

    return (
        <section
            id="hero"
            className="relative min-h-[850px] md:min-h-[970px] flex flex-col overflow-hidden bg-bg-primary border-b border-border-subtle"
        >
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 pt-28 md:pt-40">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease }}
                    className="text-[clamp(2.75rem,6vw,4.75rem)] font-semibold tracking-[-0.035em] leading-[0.98] text-text-primary mb-6"
                >
                    Everything you watch.
                    <br />
                    <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">Nothing that watches you.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.7, ease }}
                    className="text-base md:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed"
                >
                    Meet PlusTube: a free, open-source YouTube and YouTube Music client for Android.
                    Watch without ads, find your own rhythm, and keep recommendations on your device.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.26, duration: 0.7, ease }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <Button to="/download" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                        Get PlusTube
                    </Button>
                    <Button to="/how-it-works" variant="outline" size="md" icon={<Sparkles className="w-4 h-4 text-accent-primary" />}>
                        How Neuro works
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.34, duration: 0.7, ease }}
                    className="kicker mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1"
                >
                    {proof.map(item => (
                        <span key={item.label}>
                            <span className="text-text-primary tabular-nums">{item.value}</span> {item.label}
                        </span>
                    ))}
                </motion.p>
            </div>

            <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.45, duration: 0.9, ease }}
                className="relative z-10 flex flex-1 items-end justify-center gap-3 sm:gap-5 md:gap-8 mt-10 md:mt-12 px-4 pb-12"
                aria-hidden="true"
            >
                {heroScreens.map(({ screen, className }) => (
                    <ProductPreview key={screen} screen={screen} className={className} />
                ))}
            </motion.div>

            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
                <span className="hero-code-note"><Sparkles aria-hidden="true" /> Interface previews, built in code</span>
            </div>
        </section>
    )
}

export default Hero
