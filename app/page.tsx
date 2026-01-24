'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-neon-emerald/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-emerald/10 border border-neon-emerald/30 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-neon-emerald" />
                        <span className="text-sm font-bold text-neon-emerald tracking-wide">
                            AI-POWERED FOOTBALL INTELLIGENCE
                        </span>
                    </motion.div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6">
                        <span className="block text-white mb-3">The</span>
                        <span className="block text-gradient bg-gradient-to-r from-neon-emerald via-emerald-400 to-green-300 bg-clip-text text-transparent">
                            G-Edge
                        </span>
                    </h1>

                    <p className="text-2xl sm:text-3xl text-gray-300 max-w-3xl mx-auto mb-4 font-semibold">
                        Stop guessing. Start winning.
                    </p>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
                        From narrow analysis to AI-backed insights. Analyze EPL, UCL, LaLiga, Bundesliga,
                        Serie A, and more with the power of 10,000+ match simulations.
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/match-center">
                            <motion.button
                                className="group relative px-10 py-5 text-lg font-black tracking-wide text-white glass-card border-2 border-neon-emerald/40 hover:border-neon-emerald overflow-hidden"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Animated Background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-neon-emerald/20 to-emerald-600/20"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />

                                <span className="relative flex items-center gap-3">
                                    Enter Match Center
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
                >
                    <div className="glass-card p-6 text-center border border-white/10">
                        <Brain className="w-10 h-10 text-neon-emerald mx-auto mb-3" />
                        <div className="text-4xl font-black text-white mb-2">10,000+</div>
                        <div className="text-sm text-gray-400">AI Simulations per Match</div>
                    </div>

                    <div className="glass-card p-6 text-center border border-white/10">
                        <Trophy className="w-10 h-10 text-electric-amber mx-auto mb-3" />
                        <div className="text-4xl font-black text-white mb-2">6</div>
                        <div className="text-sm text-gray-400">Leagues Covered</div>
                    </div>

                    <div className="glass-card p-6 text-center border border-white/10">
                        <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                        <div className="text-4xl font-black text-neon-emerald mb-2">+34%</div>
                        <div className="text-sm text-gray-400">Machine ROI</div>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16"
                >
                    <p className="text-sm text-gray-500">
                        Built with <span className="text-neon-emerald">♥</span> for Gareth Joe
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
