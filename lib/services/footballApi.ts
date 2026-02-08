// Safe API-Football Helper - PROXY VERSION
// Fetches data from local Express backend (football-data.org)

// Interface compatible with existing UI components
export interface Fixture {
    id: number;
    homeTeam: string;
    homeTeamLogo: string;
    awayTeam: string;
    awayTeamLogo: string;
    league: string;
    leagueId: number;
    leagueLogo: string;
    date: string; // ISO string
    status: 'LIVE' | 'UPCOMING' | 'FINISHED';
    statusShort: string;
    elapsed: number | null;
    homeScore: number | null;
    awayScore: number | null;
    venue: string;
}

const BACKEND_URL = "/api";

// Helpers to transform football-data.org structure to our Fixture interface
const transformToFixture = (match: any): Fixture => {
    const isLive = match.status === 'IN_PLAY' || match.status === 'PAUSED';
    const isFinished = match.status === 'FINISHED';

    let status: Fixture['status'] = 'UPCOMING';
    if (isLive) status = 'LIVE';
    if (isFinished) status = 'FINISHED';

    return {
        id: match.id,
        homeTeam: match.homeTeam.shortName || match.homeTeam.name,
        homeTeamLogo: match.homeTeam.crest,
        awayTeam: match.awayTeam.shortName || match.awayTeam.name,
        awayTeamLogo: match.awayTeam.crest,
        league: match.competition.name,
        leagueId: match.competition.id,
        leagueLogo: match.competition.emblem,
        date: match.utcDate,
        status: status,
        statusShort: match.status, // e.g. "TIMED", "IN_PLAY"
        elapsed: null, // football-data.org free tier doesn't always provide elapsed time in list
        homeScore: match.score.fullTime.home ?? match.score.halfTime.home,
        awayScore: match.score.fullTime.away ?? match.score.halfTime.away,
        venue: "TBD" // Not standard in list response
    };
};

export async function fetchLiveMatches(): Promise<Fixture[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/live`);
        if (!res.ok) throw new Error("Status " + res.status);
        const matches = await res.json();
        return matches.map(transformToFixture);
    } catch (error) {
        console.error("Fetch Live Matches Error:", error);
        return [];
    }
}

export async function fetchUpcomingMatches(): Promise<Fixture[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/upcoming`);
        if (!res.ok) throw new Error("Status " + res.status);
        const matches = await res.json();
        return matches.map(transformToFixture);
    } catch (error) {
        console.error("Fetch Upcoming Matches Error:", error);
        return [];
    }
}


