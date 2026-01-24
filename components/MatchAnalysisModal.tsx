'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, TrendingUp, AlertTriangle, Target, BarChart3, Zap } from 'lucide-react';
import { Match } from '@/lib/mockData';

interface MatchAnalysisModalProps {
    match: Match | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function MatchAnalysisModal({ match, isOpen, onClose }: MatchAnalysisModalProps) {
    if (!match) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="glass-card border-2 border-white/20 h-full flex flex-col">
                                {/* Header */}
                                <div className="relative p-6 border-b border-white/10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Brain className="w-5 h-5 text-neon-emerald" />
                                                <span className="text-xs font-bold tracking-wider text-neon-emerald">
                                                    AI TACTICAL ANALYSIS
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-black text-white mb-1">
                                                {match.homeTeam} vs {match.awayTeam}
                                            </h2>
                                            <p className="text-sm text-gray-400">{match.competition} • G-Score: <span className="text-neon-emerald font-bold">{match.gScore}</span></p>
                                        </div>

                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="glass-card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target className="w-4 h-4 text-purple-400" />
                                                <span className="text-xs text-gray-400 font-semibold">AI PROBABILITY</span>
                                            </div>
                                            <div className="text-3xl font-black text-white">{match.aiProbability}%</div>
                                        </div>

                                        <div className="glass-card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <BarChart3 className="w-4 h-4 text-blue-400" />
                                                <span className="text-xs text-gray-400 font-semibold">BOOKMAKER ODDS</span>
                                            </div>
                                            <div className="text-3xl font-black text-white">{match.bookmakerOdds}</div>
                                        </div>

                                        <div className="glass-card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="w-4 h-4 text-green-400" />
                                                <span className="text-xs text-gray-400 font-semibold">xG HOME</span>
                                            </div>
                                            <div className="text-3xl font-black text-white">{match.xgHome}</div>
                                        </div>

                                        <div className="glass-card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="w-4 h-4 text-orange-400" />
                                                <span className="text-xs text-gray-400 font-semibold">xG AWAY</span>
                                            </div>
                                            <div className="text-3xl font-black text-white">{match.xgAway}</div>
                                        </div>
                                    </div>

                                    {/* Tactical Edge */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Brain className="w-5 h-5 text-neon-emerald" />
                                            <h3 className="text-lg font-bold text-white">The G-Edge Insight</h3>
                                        </div>

                                        <div className="glass-card p-5 border-l-4 border-neon-emerald">
                                            <p className="text-gray-300 leading-relaxed">
                                                {match.tacticalEdge.insight}
                                            </p>
                                        </div>

                                        <div className="glass-card p-5 border-l-4 border-purple-500">
                                            <div className="flex items-start gap-3">
                                                <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-sm font-bold text-purple-400 mb-1">KEY FACTOR</h4>
                                                    <p className="text-gray-300 text-sm leading-relaxed">
                                                        {match.tacticalEdge.keyFactor}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass-card p-5 border-l-4 border-electric-amber">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 text-electric-amber mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-sm font-bold text-electric-amber mb-1">RECOMMENDATION</h4>
                                                    <p className="text-gray-300 text-sm leading-relaxed">
                                                        {match.tacticalEdge.recommendation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cheeky AI Note */}
                                    <div className="glass-card p-4 bg-neon-emerald/5 border-neon-emerald/30">
                                        <p className="text-sm text-gray-400 italic">
                                            <span className="font-bold text-neon-emerald">AI Note:</span> "Gareth, I've run 10,000 simulations on this one. The data doesn't lie. Trust the process. 🧠"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
