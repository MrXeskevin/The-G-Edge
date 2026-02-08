import { NextResponse } from 'next/server';

const BASE = "https://api.football-data.org/v4";
const LEAGUES = [2021, 2001, 2014, 2019, 2002, 2015];

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const future = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
    
    console.log(`Fetching upcoming from ${today} to ${future}`);

    const response = await fetch(
      `${BASE}/matches?dateFrom=${today}&dateTo=${future}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_KEY || ""
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    const data = await response.json();
    const allMatches = data.matches || [];

    // Filter by allowed leagues
    const matches = allMatches
      .filter((m: any) => LEAGUES.includes(m.competition.id))
      .sort((a: any, b: any) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

    console.log(`Upcoming matches found: ${matches.length} (out of ${allMatches.length} total upcoming)`);
    
    return NextResponse.json(matches);
  } catch (err) {
    console.error("Error fetching upcoming matches:", err);
    return NextResponse.json([], { status: 500 });
  }
}
