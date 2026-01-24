'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertTriangle, Shield, Target, Brain } from 'lucide-react';
import Image from 'next/image';
import { Fixture } from '@/lib/services/apiFootball';
import { generateMockAnalysis, MatchAnalysis } from '@/lib/services/aiAnalysis';
import { useState, useEffect } from 'react';
import { formatKickoffTime, formatMatchDate } from '@/hooks/useFixtures';

interface FixtureAnalysisModalProps {
    fixture: Fixture | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function FixtureAnalysisModal({ fixture, isOpen, onClose }: FixtureAnalysisModalProps) {
    const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        if (fixture && isOpen) {
            setIsAnalyzing(true);
            // Simulate AI analysis delay
            const timer = setTimeout(() => {
                const result = generateMockAnalysis(fixture);
                setAnalysis(result);
                setIsAnalyzing(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [fixture, isOpen]);

    if (!fixture) return null;

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'LOW': return 'text-neon-emerald bg-neon-emerald/10 border-neon-emerald';
            case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
            case 'HIGH': return 'text-red-400 bg-red-400/10 border-red-400';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400';
        }
    };

    const getGScoreColor = (score: number) => {
        if (score >= 80) return 'text-neon-emerald border-neon-emerald';
        if (score >= 60) return 'text-green-400 border-green-400';
        if (score >= 40) return 'text-yellow-400 border-yellow-400';
        return 'text-red-400 border-red-400';
    };

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
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card border border-white/10 rounded-2xl pointer-events-auto shadow-2xl"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-deep-navy/95 backdrop-blur-lg p-6 border-b border-white/10 flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-neon-emerald" />
                                    <h2 className="text-xl font-black text-white">AI Analysis</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Match Header */}
                                <div className="glass-card p-4 border border-white/10">
                                    <div className="text-xs text-gray-500 mb-3 text-center">
                                        {fixture.league} • {formatMatchDate(fixture.date)} at {formatKickoffTime(fixture.date)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            {fixture.homeTeamLogo && (
                                                <Image src={fixture.homeTeamLogo} alt="" width={48} height={48} />
                                            )}
                                            <span className="text-sm font-bold text-white text-center">{fixture.homeTeam}</span>
                                        </div>
                                        <div className="text-2xl font-black text-gray-500 px-4">VS</div>
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            {fixture.awayTeamLogo && (
                                                <Image src={fixture.awayTeamLogo} alt="" width={48} height={48} />
                                            )}
                                            <span className="text-sm font-bold text-white text-center">{fixture.awayTeam}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Loading State */}
                                {isAnalyzing && (
                                    <div className="text-center py-12">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-12 h-12 border-3 border-neon-emerald border-t-transparent rounded-full mx-auto mb-4"
                                        />
                                        <p className="text-gray-400">Analyzing fixture data...</p>
                                    </div>
                                )}

                                {/* Analysis Results */}
                                {analysis && !isAnalyzing && (
                                    <>
                                        {/* G-Score & Risk */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${getGScoreColor(analysis.gScore)}`}>
                                                <div className="text-4xl font-black">{analysis.gScore}</div>
                                                <div className="text-xs font-semibold opacity-70">G-SCORE</div>
                                            </div>
                                            <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${getRiskColor(analysis.riskLevel)}`}>
                                                <AlertTriangle className="w-6 h-6 mb-1" />
                                                <div className="text-lg font-bold">{analysis.riskLevel}</div>
                                                <div className="text-xs opacity-70">RISK LEVEL</div>
                                            </div>
                                        </div>

                                        {/* Win Probabilities */}
                                        <div className="glass-card p-4 border border-white/10">
                                            <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                                                <Target className="w-4 h-4" /> Win Probability
                                            </h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-white">{fixture.homeTeam}</span>
                                                        <span className="text-neon-emerald font-bold">{analysis.prediction.homeWinProbability}%</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${analysis.prediction.homeWinProbability}%` }}
                                                            className="h-full bg-neon-emerald rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-white">Draw</span>
                                                        <span className="text-gray-400 font-bold">{analysis.prediction.drawProbability}%</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${analysis.prediction.drawProbability}%` }}
                                                            className="h-full bg-gray-400 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-white">{fixture.awayTeam}</span>
                                                        <span className="text-purple-400 font-bold">{analysis.prediction.awayWinProbability}%</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${analysis.prediction.awayWinProbability}%` }}
                                                            className="h-full bg-purple-400 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Predicted Score */}
                                        <div className="glass-card p-4 border border-white/10 text-center">
                                            <h3 className="text-sm font-bold text-gray-400 mb-3">Predicted Score</h3>
                                            <div className="text-4xl font-black text-white">
                                                {analysis.prediction.predictedScore.home} - {analysis.prediction.predictedScore.away}
                                            </div>
                                        </div>

                                        {/* Insights */}
                                        <div className="space-y-3">
                                            <div className="glass-card p-4 border border-white/10">
                                                <h4 className="text-xs font-bold text-neon-emerald mb-2 flex items-center gap-2">
                                                    <Shield className="w-3 h-3" /> Tactical Insight
                                                </h4>
                                                <p className="text-sm text-gray-300">{analysis.insights.tactical}</p>
                                            </div>
                                            <div className="glass-card p-4 border border-white/10">
                                                <h4 className="text-xs font-bold text-yellow-400 mb-2 flex items-center gap-2">
                                                    <TrendingUp className="w-3 h-3" /> Key Factor
                                                </h4>
                                                <p className="text-sm text-gray-300">{analysis.insights.keyFactor}</p>
                                            </div>
                                            <div className="glass-card p-4 border border-neon-emerald/30 bg-neon-emerald/5">
                                                <h4 className="text-xs font-bold text-neon-emerald mb-2">💡 Recommendation</h4>
                                                <p className="text-sm text-gray-300">{analysis.insights.recommendation}</p>
                                            </div>
                                        </div>

                                        {/* Data Source Notice */}
                                        <div className="text-center text-xs text-gray-500 pt-4 border-t border-white/5">
                                            Analysis based on fixture data from API-Football.
                                            <br />
                                            Fixture ID: {fixture.id}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
