import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const ease = [0.16, 1, 0.3, 1] as const

const heroScreens = [
    { src: '/screenshots/VideoPlayer.jpeg', alt: 'PlusTube video player', side: true },
    { src: '/screenshots/Home.jpeg', alt: 'PlusTube home feed', side: false },
    { src: '/screenshots/MusicPlayer.jpeg', alt: 'PlusTube music player', side: true },
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
            className="relative h-[100svh] min-h-[680px] flex flex-col overflow-hidden bg-bg-primary border-b border-border-subtle"
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
                    PlusTube is a free, open-source YouTube and YouTube Music client for Android
                    phones, tablets and TVs. No ads, no tracking, and a feed that learns on your
                    device with PlusTube Neuro — and nowhere else.
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
                className="relative z-10 flex-1 flex justify-center items-start gap-7 mt-12 md:mt-14 px-4"
                aria-hidden="true"
            >
                {heroScreens.map(screen => (
                    <div
                        key={screen.src}
                        className={
                            screen.side
                                ? 'hidden md:block shrink-0 w-[232px] mt-16 rounded-[34px] bg-[#1a1716] p-[7px] border border-border-subtle shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]'
                                : 'shrink-0 w-[min(66vw,268px)] rounded-[34px] bg-[#1a1716] p-[7px] border border-border-subtle shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]'
                        }
                    >
                        <img
                            src={screen.src}
                            alt=""
                            width={575}
                            height={1280}
                            className="block w-full h-auto rounded-[27px]"
                        />
                    </div>
                ))}
            </motion.div>
        </section>
    )
}

export default Hero
