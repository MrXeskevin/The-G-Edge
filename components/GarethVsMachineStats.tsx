'use client';

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Percent } from 'lucide-react';
import { garethVsMachine } from '@/lib/mockData';

export default function GarethVsMachineStats() {
    const totalMatches = garethVsMachine.garethWins + garethVsMachine.machineWins + garethVsMachine.draws;
    const machineWinRate = Math.round((garethVsMachine.machineWins / totalMatches) * 100);
    const garethWinRate = Math.round((garethVsMachine.garethWins / totalMatches) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
        >
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-electric-amber" />
                <h2 className="text-xl font-black text-white">Gareth vs. The Machine</h2>
            </div>

            {/* Win Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Gareth</div>
                    <div className="text-4xl font-black text-white mb-1">{garethVsMachine.garethWins}</div>
                    <div className="text-xs text-gray-500">wins</div>
                    <div className="mt-2 text-sm font-semibold text-blue-400">{garethWinRate}% win rate</div>
                </div>

                <div className="text-center border-l border-white/10">
                    <div className="text-sm text-gray-400 mb-2">The Machine</div>
                    <div className="text-4xl font-black text-neon-emerald mb-1">{garethVsMachine.machineWins}</div>
                    <div className="text-xs text-gray-500">wins</div>
                    <div className="mt-2 text-sm font-semibold text-neon-emerald">{machineWinRate}% win rate</div>
                </div>
            </div>

            {/* ROI Comparison */}
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">Gareth ROI</span>
                    </div>
                    <span className="text-lg font-bold text-blue-400">{garethVsMachine.garethROI}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-neon-emerald/10 border border-neon-emerald/20">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-neon-emerald" />
                        <span className="text-sm text-gray-300">Machine ROI</span>
                    </div>
                    <span className="text-lg font-bold text-neon-emerald">{garethVsMachine.machineROI}</span>
                </div>
            </div>

            {/* Last Updated */}
            <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-gray-500">
                Last updated: {garethVsMachine.lastUpdated}
            </div>
        </motion.div>
    );
}
