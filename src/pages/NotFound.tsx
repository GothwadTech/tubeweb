import { Header } from '@/components/layout/Header'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFound() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden selection:bg-accent-primary/20">
            <Header />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none z-0">
                <div className="absolute inset-0 bg-accent-primary/5 md:bg-accent-primary/10 blur-[100px] md:blur-[120px] rounded-full mix-blend-screen animate-pulse duration-1000" />
            </div>

            <main className="flex-1 w-full pt-20 pb-12 flex flex-col items-center justify-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center flex flex-col items-center px-4"
                >
                    <p className="text-[clamp(5rem,18vw,11rem)] font-semibold tracking-[-0.05em] leading-none text-text-primary">
                        4<span className="font-serif italic font-normal text-text-muted">0</span>4
                    </p>

                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-text-primary mb-4 mt-4">
                        You're off the grid.
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto mb-10 font-medium leading-relaxed">
                        The page you are looking for doesn't exist, has been moved, or got lost between the videos.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <Button to="/" variant="primary" size="lg" className="px-8 py-5 text-base" icon={<Home className="w-5 h-5" />}>
                            Return Home
                        </Button>
                        <Button
                            to="/download"
                            variant="secondary"
                            size="lg"
                            className="px-8 py-5 text-base"
                            icon={<Download className="w-5 h-5" />}
                            iconPosition="left"
                        >
                            Get PlusTube
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="px-8 py-5 text-base"
                            icon={<ArrowLeft className="w-5 h-5" />}
                            iconPosition="left"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </motion.div>

            </main>
        </div>
    )
}

export default NotFound
