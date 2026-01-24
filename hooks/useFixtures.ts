'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Fixture, fetchLiveMatches, fetchUpcomingMatches } from '@/lib/services/footballApi';

export type FilterType = 'live' | 'upcoming';

export function useFixtures(initialFilter: FilterType = 'live') {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>(initialFilter);
    const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasInitialLoaded = useRef(false);

    const loadMatches = useCallback(async (currentFilter: FilterType) => {
        setIsLoading(true);
        setError(null);

        try {
            // Logic based on user request:
            // 1. Fetch Live Matches
            // 2. If present -> set Live
            // 3. Else -> fetch Upcoming -> set Upcoming

            const live = await fetchLiveMatches();

            if (live.length > 0) {
                setFixtures(live);
                if (!hasInitialLoaded.current) {
                    setFilter('live');
                }
            } else {
                const upcoming = await fetchUpcomingMatches();
                setFixtures(upcoming);
                if (!hasInitialLoaded.current) {
                    setFilter('upcoming');
                }
            }

            hasInitialLoaded.current = true;
            setLastFetchedAt(new Date().toISOString());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setFixtures([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch and refetch on filter change
    useEffect(() => {
        loadMatches(filter);
    }, [filter, loadMatches]);

    // Auto-refresh every 60 seconds for live tab
    useEffect(() => {
        if (filter === 'live') {
            intervalRef.current = setInterval(() => {
                loadMatches('live');
            }, 60000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [filter, loadMatches]);

    return {
        fixtures,
        isLoading,
        error,
        filter,
        setFilter,
        lastFetchedAt,
        refetch: () => loadMatches(filter),
    };
}

// Format kickoff time to user's local timezone
export function formatKickoffTime(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatMatchDate(isoDate: string): string {
    const date = new Date(isoDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    }

    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

