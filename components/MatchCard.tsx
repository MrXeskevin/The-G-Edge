'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Trophy, Calendar, BarChart3 } from 'lucide-react';
import { Match } from '@/lib/mockData';

interface MatchCardProps {
    match: Match;
    onClick: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 85) return 'text-neon-emerald';
        if (score >= 70) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-electric-amber';
    };

    const getScoreGlow = (score: number) => {
        if (score >= 85) return 'shadow-neon-emerald/50';
        if (score >= 70) return 'shadow-green-400/50';
        return 'shadow-electric-amber/50';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            onClick={onClick}
            className="glass-card glass-card-hover p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            {/* Header: Competition Badge, Status & Date */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Trophy className={`w-4 h-4 ${match.competition === 'UCL' ? 'text-blue-400' : 'text-purple-400'}`} />
                    <span className="text-xs font-semibold tracking-wider text-gray-400">
                        {match.competition}
                    </span>

                    {/* Live Indicator */}
                    {match.status === 'LIVE' && (
                        <motion.div
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/40"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-black text-red-500 tracking-wide">LIVE</span>
                        </motion.div>
                    )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(match.date)}</span>
                </div>
            </div>

            {/* Teams */}
            <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{match.homeTeam}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">xG {match.xgHome}</span>
                    </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{match.awayTeam}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">xG {match.xgAway}</span>
                    </div>
                </div>
            </div>

            {/* G-Score & Market Value */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white/5 to-white/10 border-2 ${getScoreColor(match.gScore)} border-current shadow-lg ${getScoreGlow(match.gScore)}`}>
                        <div className="text-center">
                            <div className={`text-xl font-black ${getScoreColor(match.gScore)}`}>
                                {match.gScore}
                            </div>
                            <div className="text-[10px] text-gray-500 font-semibold">G-SCORE</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">AI Probability</span>
                        </div>
                        <span className="text-sm font-bold text-white">{match.aiProbability}%</span>
                    </div>
                </div>

                {/* Market Value Badge */}
                <motion.div
                    className={`px-3 py-1.5 rounded-full border font-bold text-xs tracking-wide ${match.marketValue === 'HIGH'
                        ? 'bg-neon-emerald/10 border-neon-emerald text-neon-emerald'
                        : match.marketValue === 'MEDIUM'
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                            : 'bg-gray-500/10 border-gray-500 text-gray-500'
                        }`}
                    whileHover={{ scale: 1.05 }}
                >
                    {match.marketValue === 'HIGH' && <TrendingUp className="inline w-3 h-3 mr-1" />}
                    {match.marketValue === 'LOW' && <TrendingDown className="inline w-3 h-3 mr-1" />}
                    {match.marketValue} VALUE
                </motion.div>
            </div>

            {/* Hover indicator */}
            <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="text-xs text-gray-500">Click for AI Analysis →</span>
            </div>
        </motion.div>
    );
}
