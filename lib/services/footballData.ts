// Football Data API Service
// Fetches live match data from local backend (football-data.org proxy)

import { mockMatches, Match, MatchStatus, League } from '@/lib/mockData';

const BACKEND_URL = 'http://localhost:5001/api';

interface ApiMatch {
    id: number;
    homeTeam: { name: string; shortName?: string };
    awayTeam: { name: string; shortName?: string };
    competition: { name: string; code: string };
    utcDate: string;
    status: string; // SCHEDULED, TIMED, IN_PLAY, PAUSED, FINISHED, POSTPONED, etc.
}

// Map API competition codes to our League type
const mapCompetition = (code: string): League => {
    const competitionMap: Record<string, League> = {
        'PL': 'EPL',
        'PD': 'LaLiga',
        'BL1': 'Bundesliga',
        'SA': 'Serie A',
        'FL1': 'Ligue 1',
        'CL': 'UCL',
        'FAC': 'FA Cup',
    };
    return competitionMap[code] || 'EPL';
};

// Map API status to our MatchStatus
const mapStatus = (status: string): MatchStatus => {
    if (['IN_PLAY', 'PAUSED', 'HALFTIME'].includes(status)) return 'LIVE';
    if (['SCHEDULED', 'TIMED'].includes(status)) return 'UPCOMING';
    return 'FINISHED';
};

// Transform API data to our Match interface
const transformMatch = (apiMatch: ApiMatch): Match => {
    const status = mapStatus(apiMatch.status);
    const competition = mapCompetition(apiMatch.competition.code);

    // Generate pseudo-random but deterministic values based on match id
    const seed = apiMatch.id;
    const gScore = 50 + (seed % 50); // 50-100
    const aiProbability = 30 + (seed % 60); // 30-90
    const xgHome = Number(((seed % 30) / 10).toFixed(1));
    const xgAway = Number((((seed + 17) % 25) / 10).toFixed(1));

    return {
        id: `api-${apiMatch.id}`,
        homeTeam: apiMatch.homeTeam.shortName || apiMatch.homeTeam.name,
        awayTeam: apiMatch.awayTeam.shortName || apiMatch.awayTeam.name,
        competition: competition,
        league: competition,
        date: apiMatch.utcDate,
        status,
        gScore,
        marketValue: gScore >= 80 ? 'HIGH' : gScore >= 60 ? 'MEDIUM' : 'LOW',
        aiProbability,
        bookmakerOdds: Number((1.2 + (seed % 200) / 100).toFixed(2)),
        xgHome,
        xgAway,
        tacticalEdge: {
            insight: `Live data from football-data.org. ${apiMatch.competition.name} fixture.`,
            keyFactor: 'Real-time match data - AI insights updating.',
            recommendation: 'Check back closer to kick-off for detailed analysis.',
        },
    };
};

export async function fetchLiveMatches(): Promise<Match[]> {
    try {
        console.log('[FootballData] Fetching live matches from backend...');
        const response = await fetch(`${BACKEND_URL}/live`, { cache: 'no-store' });

        if (!response.ok) {
            console.error(`[FootballData] Backend error: ${response.status}`);
            return [];
        }

        const matches: ApiMatch[] = await response.json();

        if (!matches || matches.length === 0) {
            console.log('[FootballData] No live matches found');
            return [];
        }

        const transformed = matches.map(transformMatch);
        console.log(`[FootballData] Fetched ${transformed.length} live matches`);
        return transformed;
    } catch (error) {
        console.error('[FootballData] Fetch failed:', error);
        return [];
    }
}

export async function fetchUpcomingMatches(): Promise<Match[]> {
    try {
        console.log('[FootballData] Fetching upcoming matches from backend...');
        const response = await fetch(`${BACKEND_URL}/upcoming`, { cache: 'no-store' });

        if (!response.ok) {
            console.error(`[FootballData] Backend error: ${response.status}`);
            return [];
        }

        const matches: ApiMatch[] = await response.json();

        if (!matches || matches.length === 0) {
            console.log('[FootballData] No upcoming matches found');
            return [];
        }

        const transformed = matches.map(transformMatch);
        console.log(`[FootballData] Fetched ${transformed.length} upcoming matches`);
        return transformed;
    } catch (error) {
        console.error('[FootballData] Fetch failed:', error);
        return [];
    }
}

// Always available now as we have a proxy
export function isLiveDataAvailable(): boolean {
    return true;
}
