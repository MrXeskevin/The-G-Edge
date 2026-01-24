import { NextResponse } from 'next/server';

const BASE = "https://api.football-data.org/v4";
const LEAGUES = [2021, 2001, 2014, 2019, 2002, 2015];

export async function GET() {
  try {
    const response = await fetch(`${BASE}/matches?status=LIVE`, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_KEY || ""
      },
      next: { revalidate: 10 } // Cache for 10 seconds
    });

    const data = await response.json();
    const allMatches = data.matches || [];

    // Filter by allowed leagues
    const matches = allMatches.filter((m: any) => LEAGUES.includes(m.competition.id));
    
    console.log(`Live matches found: ${matches.length} (out of ${allMatches.length} total live)`);

    return NextResponse.json(matches);
  } catch (err) {
    console.error("Error fetching live matches:", err);
    return NextResponse.json([], { status: 500 });
  }
}
