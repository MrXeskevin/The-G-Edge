// Mock data with accurate January 11, 2026 fixtures
export type MatchStatus = 'LIVE' | 'UPCOMING' | 'FINISHED';
export type League = 'FA Cup' | 'EPL' | 'UCL' | 'LaLiga' | 'Bundesliga' | 'Serie A' | 'Ligue 1' | 'Spanish Super Cup';

export interface Match {
    id: string;
    homeTeam: string;
    awayTeam: string;
    competition: League;
    league: League; // Normalized league name for filtering
    date: string;
    status: MatchStatus;
    gScore: number;
    marketValue: 'HIGH' | 'MEDIUM' | 'LOW';
    aiProbability: number;
    bookmakerOdds: number;
    xgHome: number;
    xgAway: number;
    tacticalEdge: {
        insight: string;
        keyFactor: string;
        recommendation: string;
    };
}

// Accurate fixtures for January 11, 2026
// Helper to create dates relative to "now" (simulated as Jan 23 2026 for this context, or actual system time)
const getRelativeDate = (dayOffset: number, hour: number, minute: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
};

export const mockMatches: Match[] = [
    // --- TODAY (Friday Night) ---
    {
        id: 'bundesliga-fri',
        homeTeam: 'Dortmund',
        awayTeam: 'RB Leipzig',
        competition: 'Bundesliga',
        league: 'Bundesliga',
        date: getRelativeDate(0, 20, 30), // Today 20:30
        status: 'UPCOMING',
        gScore: 88,
        marketValue: 'HIGH',
        aiProbability: 55,
        bookmakerOdds: 2.10,
        xgHome: 1.9,
        xgAway: 1.7,
        tacticalEdge: {
            insight: "Leipzig's high press has successfully disrupted Dortmund's build-up in 3 of their last 4 meetings.",
            keyFactor: "Brandt's ability to find pockets of space behind Leipzig's midfield line.",
            recommendation: "Over 3.5 goals. Both teams are defensively open on Friday nights."
        }
    },
    {
        id: 'laliga-fri',
        homeTeam: 'Sevilla',
        awayTeam: 'Valencia',
        competition: 'LaLiga',
        league: 'LaLiga',
        date: getRelativeDate(0, 21, 0), // Today 21:00
        status: 'UPCOMING',
        gScore: 72,
        marketValue: 'MEDIUM',
        aiProbability: 48,
        bookmakerOdds: 2.60,
        xgHome: 1.1,
        xgAway: 1.0,
        tacticalEdge: {
            insight: "A tactical stalemate expected. Both teams average under 1.0 xG in first halves.",
            keyFactor: "Set-pieces will decide this. Sevilla's aerial threat is slightly superior.",
            recommendation: "Under 2.5 Goals is the safest play here."
        }
    },

    // --- TOMORROW (Saturday - Premier League Headline) ---
    {
        id: 'epl-big-1',
        homeTeam: 'Man City',
        awayTeam: 'Chelsea',
        competition: 'EPL',
        league: 'EPL',
        date: getRelativeDate(1, 17, 30), // Tomorrow 17:30
        status: 'UPCOMING',
        gScore: 96,
        marketValue: 'HIGH',
        aiProbability: 62,
        bookmakerOdds: 1.75,
        xgHome: 2.4,
        xgAway: 1.3,
        tacticalEdge: {
            insight: "City's control of the midfield half-spaces usually overwhelms Chelsea's pivot. However, Chelsea's counter-attack speed is a legitimate threat.",
            keyFactor: "Haaland vs. Chelsea's high line. If they don't drop deep, he scores.",
            recommendation: "Man City Win & BTTS. It won't be a clean sheet, but City outscores them."
        }
    },
    {
        id: 'epl-derby',
        homeTeam: 'Liverpool',
        awayTeam: 'Everton',
        competition: 'EPL',
        league: 'EPL',
        date: getRelativeDate(1, 12, 30), // Tomorrow 12:30 (Early Kickoff)
        status: 'UPCOMING',
        gScore: 89,
        marketValue: 'HIGH',
        aiProbability: 75,
        bookmakerOdds: 1.28,
        xgHome: 2.8,
        xgAway: 0.5,
        tacticalEdge: {
            insight: "The Merseyside Derby at Anfield. Everton will park two buses, but Liverpool's width will stretch them to breaking point.",
            keyFactor: "Salah cutting inside against a low block. He averages 1.5 goal involvements in this fixture.",
            recommendation: "Liverpool -1.5 Asian Handicap. A comfortable home win."
        }
    },
    {
        id: 'epl-mid-1',
        homeTeam: 'Aston Villa',
        awayTeam: 'Tottenham',
        competition: 'EPL',
        league: 'EPL',
        date: getRelativeDate(1, 15, 0), // Tomorrow 15:00
        status: 'UPCOMING',
        gScore: 92,
        marketValue: 'HIGH',
        aiProbability: 51,
        bookmakerOdds: 2.50,
        xgHome: 1.8,
        xgAway: 1.9,
        tacticalEdge: {
            insight: "High-octane football. Both managers insist on high lines. Expect offside traps and plenty of chances.",
            keyFactor: "Who defends transitions better? Villa's home advantage gives them a slight tactical edge.",
            recommendation: "Over 3.5 Goals. Defending is optional for these two."
        }
    },
    {
        id: 'epl-mid-2',
        homeTeam: 'Newcastle',
        awayTeam: 'West Ham',
        competition: 'EPL',
        league: 'EPL',
        date: getRelativeDate(1, 15, 0), // Tomorrow 15:00
        status: 'UPCOMING',
        gScore: 78,
        marketValue: 'MEDIUM',
        aiProbability: 58,
        bookmakerOdds: 1.90,
        xgHome: 1.6,
        xgAway: 1.2,
        tacticalEdge: {
            insight: "Newcastle's intensity at home typically breaks mid-table teams. West Ham struggle against physical midfields.",
            keyFactor: "Guimarães controlling the tempo. If he dictates play, Newcastle grind this out.",
            recommendation: "Newcastle Win. Solid home banker."
        }
    },
    // --- YESTERDAY (For history/stats) ---
    {
        id: 'facup-prev',
        homeTeam: 'Man Utd',
        awayTeam: 'Brighton',
        competition: 'FA Cup',
        league: 'FA Cup',
        date: getRelativeDate(-1, 20, 0), // Yesterday
        status: 'FINISHED',
        gScore: 81,
        marketValue: 'HIGH',
        aiProbability: 64,
        bookmakerOdds: 1.95,
        xgHome: 2.1,
        xgAway: 1.3,
        tacticalEdge: {
            insight: "United's press triggers worked perfectly against Brighton's build-up.",
            keyFactor: "Fernandes finding space.",
            recommendation: "Simulation result: Accurate. United won 2-1."
        }
    }
];

export const garethVsMachine = {
    garethWins: 23,
    machineWins: 37,
    draws: 8,
    garethROI: '+12%',
    machineROI: '+34%',
    lastUpdated: '2026-01-11'
};
