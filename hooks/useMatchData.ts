'use client';

import { useState, useEffect, useCallback } from 'react';
import { Match } from '@/lib/mockData';

interface MatchDataResult {
    matches: Match[];
    source: 'live' | 'mock';
    fetchedAt: string;
}

export function useMatchData() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
    const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchMatches = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/matches');
            if (!response.ok) {
                throw new Error('Failed to fetch matches');
            }
            const data: MatchDataResult = await response.json();
            setMatches(data.matches);
            setDataSource(data.source);
            setLastFetchedAt(data.fetchedAt);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            console.error('Error fetching matches:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    return {
        matches,
        isLoading,
        dataSource,
        lastFetchedAt,
        error,
        refetch: fetchMatches,
    };
}
