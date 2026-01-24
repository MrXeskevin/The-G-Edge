'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Shield } from 'lucide-react';
import Image from 'next/image';
import { Fixture } from '@/lib/services/footballApi';
import { formatKickoffTime, formatMatchDate } from '@/hooks/useFixtures';

interface FixtureCardProps {
    fixture: Fixture;
    onClick: () => void;
}

export default function FixtureCard({ fixture, onClick }: FixtureCardProps) {
    const isLive = fixture.status === 'LIVE';
    const isFinished = fixture.status === 'FINISHED';

    const [leagueLogoError, setLeagueLogoError] = useState(false);
    const [homeLogoError, setHomeLogoError] = useState(false);
    const [awayLogoError, setAwayLogoError] = useState(false);

    return (
        <motion.div
            onClick={onClick}
            className="glass-card glass-card-hover p-5 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            {/* Header: League & Status */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {fixture.leagueLogo && !leagueLogoError ? (
                        <Image
                            src={fixture.leagueLogo}
                            alt={fixture.league}
                            width={20}
                            height={20}
                            className="rounded"
                            onError={() => setLeagueLogoError(true)}
                        />
                    ) : (
                        <Shield className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-xs font-semibold tracking-wider text-gray-400 truncate max-w-[150px]">
                        {fixture.league}
                    </span>
                </div>

                {/* Live Indicator */}
                {isLive && (
                    <motion.div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/40"
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black text-red-500 tracking-wide">
                            {fixture.elapsed}&apos;
                        </span>
                    </motion.div>
                )}

                {/* Finished Badge */}
                {isFinished && (
                    <span className="text-xs font-bold text-gray-500 px-2 py-1 rounded-full bg-gray-500/10">
                        FT
                    </span>
                )}

                {/* Kickoff Time */}
                {!isLive && !isFinished && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatKickoffTime(fixture.date)}</span>
                    </div>
                )}
            </div>

            {/* Teams & Score */}
            <div className="space-y-3 mb-4">
                {/* Home Team */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {fixture.homeTeamLogo && !homeLogoError ? (
                            <Image
                                src={fixture.homeTeamLogo}
                                alt={fixture.homeTeam}
                                width={28}
                                height={28}
                                className="rounded"
                                onError={() => setHomeLogoError(true)}
                            />
                        ) : (
                            <Shield className="w-7 h-7 text-gray-600" />
                        )}
                        <span className="text-lg font-bold text-white truncate max-w-[180px]">
                            {fixture.homeTeam}
                        </span>
                    </div>
                    {(isLive || isFinished) && (
                        <span className="text-2xl font-black text-white">
                            {fixture.homeScore ?? 0}
                        </span>
                    )}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Away Team */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {fixture.awayTeamLogo && !awayLogoError ? (
                            <Image
                                src={fixture.awayTeamLogo}
                                alt={fixture.awayTeam}
                                width={28}
                                height={28}
                                className="rounded"
                                onError={() => setAwayLogoError(true)}
                            />
                        ) : (
                            <Shield className="w-7 h-7 text-gray-600" />
                        )}
                        <span className="text-lg font-bold text-white truncate max-w-[180px]">
                            {fixture.awayTeam}
                        </span>
                    </div>
                    {(isLive || isFinished) && (
                        <span className="text-2xl font-black text-white">
                            {fixture.awayScore ?? 0}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer: Date & Venue */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
                <span>{formatMatchDate(fixture.date)}</span>
                <div className="flex items-center gap-1 truncate max-w-[150px]">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{fixture.venue}</span>
                </div>
            </div>

            {/* Hover Indicator */}
            <div className="mt-3 text-center">
                <span className="text-xs text-gray-500">Click for AI Analysis →</span>
            </div>
        </motion.div>
    );
}
