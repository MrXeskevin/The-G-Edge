'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, Calendar, Radio, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import FixtureCard from '@/components/FixtureCard';
import FixtureAnalysisModal from '@/components/FixtureAnalysisModal';
import GarethVsMachineStats from '@/components/GarethVsMachineStats';
import { fetchLiveMatches, fetchUpcomingMatches, Fixture } from '@/lib/services/footballApi';

type FilterType = 'live' | 'upcoming';

export default function MatchCenter() {
    const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New State Management
    const [liveMatches, setLiveMatches] = useState<Fixture[]>([]);
    const [upcomingMatches, setUpcomingMatches] = useState<Fixture[]>([]);
    const [filter, setFilter] = useState<FilterType>('live');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

    const fixtures = filter === 'live' ? liveMatches : upcomingMatches;

    const handleFixtureClick = (fixture: Fixture) => {
        setSelectedFixture(fixture);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const tabs: { type: FilterType; label: string; icon: React.ReactNode }[] = [
        { type: 'live', label: 'Live Now', icon: <Radio className="w-4 h-4" /> },
        { type: 'upcoming', label: 'Upcoming Matches', icon: <Calendar className="w-4 h-4" /> },
    ];

    async function loadMatches() {
        console.log("MatchCenter: Starting loadMatches...");
        setIsLoading(true);
        setError(null);
        try {
            console.log("MatchCenter: Fetching live matches...");
            const live = await fetchLiveMatches();
            console.log("MatchCenter: Live matches result:", live);

            if (live.length > 0) {
                setLiveMatches(live);
                setUpcomingMatches([]);
                setFilter('live'); // Auto-switch to live if available
            } else {
                console.log("MatchCenter: Fetching upcoming matches...");
                const upcoming = await fetchUpcomingMatches();
                console.log("MatchCenter: Upcoming matches result:", upcoming);
                setUpcomingMatches(upcoming.length > 0 ? upcoming : []);
                setLiveMatches([]);
                setFilter('upcoming'); // Auto-switch to upcoming if no live
            }
            setLastFetchedAt(new Date().toISOString());
        } catch (err) {
            console.error("MatchCenter: Failed to load matches:", err);
            setError('Failed to fetch matches. Ensure server is running.');
            setLiveMatches([]);
            setUpcomingMatches([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadMatches();
    }, []);

    // Auto-refresh for live matches only
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (filter === 'live' && liveMatches.length > 0) {
            interval = setInterval(loadMatches, 60000);
        }
        return () => clearInterval(interval);
    }, [filter, liveMatches.length]);

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-neon-emerald/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <motion.button
                                className="p-3 glass-card hover:bg-white/10 transition-colors rounded-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Home className="w-5 h-5 text-gray-400" />
                            </motion.button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-white">Match Center</h1>
                            <p className="text-sm text-gray-400">Real-time football intelligence</p>
                        </div>
                    </div>

                    {/* Sync Button */}
                    <div className="flex items-center gap-3">
                        {lastFetchedAt && (
                            <span className="text-xs text-gray-500 hidden sm:block">
                                Last sync: {new Date(lastFetchedAt).toLocaleTimeString()}
                            </span>
                        )}
                        <motion.button
                            onClick={loadMatches}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-white/10 transition-colors rounded-xl font-bold text-sm text-white disabled:opacity-50"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Sync
                        </motion.button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.type}
                            onClick={() => setFilter(tab.type)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all ${filter === tab.type
                                ? 'bg-neon-emerald text-deep-navy shadow-lg shadow-neon-emerald/30'
                                : 'glass-card text-gray-400 hover:bg-white/10'
                                }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {tab.icon}
                            {tab.label}
                            {filter === 'live' && tab.type === 'live' && (
                                <span className="ml-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Fixtures Feed */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-white">
                                {filter === 'live' ? 'Live Matches' : 'Upcoming Matches'}
                            </h2>
                            {filter === 'live' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs font-bold text-red-500 uppercase">
                                        Auto-refresh 60s
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card p-12 text-center"
                            >
                                <Loader2 className="w-8 h-8 text-neon-emerald animate-spin mx-auto mb-4" />
                                <p className="text-gray-400">Loading fixtures from API-Football...</p>
                            </motion.div>
                        )}

                        {/* Error State */}
                        {error && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card p-12 text-center border border-red-500/30"
                            >
                                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                                <p className="text-red-400 font-bold mb-2">Failed to load fixtures</p>
                                <p className="text-gray-500 text-sm">{error}</p>
                                <motion.button
                                    onClick={loadMatches}
                                    className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-bold text-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Try Again
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !error && fixtures.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card p-12 text-center"
                            >
                                <Calendar className="w-8 h-8 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg font-bold">No fixtures available</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {filter === 'live'
                                        ? 'No live fixtures available. Switch to Upcoming tab.'
                                        : 'No upcoming matches scheduled for the next 7 days.'}
                                </p>
                            </motion.div>
                        )}

                        {/* Fixtures Grid */}
                        {!isLoading && !error && fixtures.length > 0 && (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {fixtures.map((fixture, index) => (
                                    <motion.div
                                        key={fixture.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <FixtureCard
                                            fixture={fixture}
                                            onClick={() => handleFixtureClick(fixture)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <GarethVsMachineStats />
                    </div>
                </div>

                {/* Fixture Analysis Modal */}
                <FixtureAnalysisModal
                    fixture={selectedFixture}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </main>
    );
}
