import { useMemo, useState } from 'react';
import { Match, MatchStatus, League } from '@/lib/mockData';

export type FilterType = 'ALL' | 'LIVE' | 'UPCOMING';

interface UseMatchFilterReturn {
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
    filteredMatches: Match[];
}

/**
 * Custom hook for filtering matches by status and league
 * 
 * Filtering rules:
 * - LIVE: Only show matches with status === 'LIVE' from FA Cup, LaLiga, and Bundesliga
 * - UPCOMING: Show matches starting after current time
 * - ALL: Show all matches from supported leagues
 */
export function useMatchFilter(matches: Match[]): UseMatchFilterReturn {
    const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

    const filteredMatches = useMemo(() => {
        const now = new Date();

        switch (activeFilter) {
            case 'LIVE':
                // LIVE: Only FA Cup, LaLiga, and Bundesliga
                const liveLeagues: League[] = ['FA Cup', 'LaLiga', 'Bundesliga'];
                return matches.filter(
                    match => match.status === 'LIVE' && liveLeagues.includes(match.league)
                );

            case 'UPCOMING':
                // UPCOMING: Matches starting after current time
                return matches.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate > now && match.status === 'UPCOMING';
                });

            case 'ALL':
            default:
                // ALL: Show all supported leagues
                const supportedLeagues: League[] = [
                    'FA Cup',
                    'EPL',
                    'UCL',
                    'LaLiga',
                    'Bundesliga',
                    'Serie A',
                    'Ligue 1',
                    'Spanish Super Cup'
                ];
                return matches.filter(match => supportedLeagues.includes(match.league));
        }
    }, [matches, activeFilter]);

    return {
        activeFilter,
        setActiveFilter,
        filteredMatches
    };
}
