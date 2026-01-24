// AI Analysis Service - Strict Major Leagues Only
// EPL (39), UCL (2), La Liga (140), Serie A (135), Bundesliga (78), Ligue 1 (61)

import { Fixture } from './footballApi';

// System prompt that constrains AI to analysis only - MAJOR LEAGUES ONLY
export const AI_SYSTEM_PROMPT = `You are a professional football analyst for "The G-Edge".

STRICT CONSTRAINTS (MANDATORY):
1. NO HALLUCINATION: You are forbidden from generating, inventing, or guessing football fixtures, kickoff times, or scores.
2. ANALYSIS ONLY: You may ONLY analyze the specific match provided to you in JSON format.
3. MAJOR LEAGUES ONLY: Your expertise is strictly limited to:
   - English Premier League (EPL)
   - UEFA Champions League (UCL)
   - La Liga (Spain)
   - Serie A (Italy)
   - Bundesliga (Germany)
   - Ligue 1 (France)
4. NO DATA = NO ANALYSIS: If no match data is passed to you, or the data is from an unsupported league, respond exactly: "No live or upcoming matches available for EPL, UCL, La Liga, Serie A, Bundesliga, or Ligue 1."

YOUR ROLE:
Provide professional win probabilities (must sum to 100%), a predicted score, tactical insights, and a risk level (LOW/MEDIUM/HIGH). Be data-driven and avoid generic commentary.`;


export interface MatchAnalysis {
    fixture: Fixture;
    prediction: {
        homeWinProbability: number;
        drawProbability: number;
        awayWinProbability: number;
        predictedScore: { home: number; away: number };
    };
    insights: {
        tactical: string;
        keyFactor: string;
        recommendation: string;
    };
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    gScore: number; // 1-100 confidence score
}

// Generate analysis for a single fixture
// In a real implementation, this would call an AI API (OpenAI, Gemini, etc.)
export function generateAnalysisPrompt(fixture: Fixture): string {
    return `Analyze this football match and provide predictions:

MATCH DATA (from API-Football):
${JSON.stringify(fixture, null, 2)}

Provide:
1. Win probabilities (must sum to 100%)
2. Predicted final score
3. Tactical insight (2-3 sentences)
4. Key factor that will decide the match
5. Betting recommendation
6. Risk level (LOW/MEDIUM/HIGH)
7. G-Score (1-100 confidence rating)

Format your response as JSON.`;
}

// Mock analysis for demo (replace with real AI call)
export function generateMockAnalysis(fixture: Fixture): MatchAnalysis {
    // Use fixture ID as seed for deterministic but varied results
    const seed = fixture.id;
    const homeStrength = 40 + (seed % 30);
    const awayStrength = 30 + ((seed * 7) % 25);
    const total = homeStrength + awayStrength + 25;

    return {
        fixture,
        prediction: {
            homeWinProbability: Math.round((homeStrength / total) * 100),
            drawProbability: Math.round((25 / total) * 100),
            awayWinProbability: Math.round((awayStrength / total) * 100),
            predictedScore: {
                home: Math.floor(seed % 4),
                away: Math.floor((seed * 3) % 3),
            },
        },
        insights: {
            tactical: `${fixture.homeTeam} will likely control possession at ${fixture.venue}. ${fixture.awayTeam} may look to counter-attack.`,
            keyFactor: `Home advantage and crowd support at ${fixture.venue} could be decisive.`,
            recommendation: homeStrength > awayStrength
                ? `Consider ${fixture.homeTeam} to win or draw.`
                : `${fixture.awayTeam} offers value as underdogs.`,
        },
        riskLevel: seed % 3 === 0 ? 'LOW' : seed % 3 === 1 ? 'MEDIUM' : 'HIGH',
        gScore: 50 + (seed % 45),
    };
}
