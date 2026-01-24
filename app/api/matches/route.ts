import { NextResponse } from 'next/server';
import { fetchLiveMatches, isLiveDataAvailable } from '@/lib/services/footballData';

export const dynamic = 'force-dynamic'; // Don't cache at edge

export async function GET() {
    try {
        const matches = await fetchLiveMatches();
        const isLive = isLiveDataAvailable();

        return NextResponse.json({
            matches,
            source: isLive ? 'live' : 'mock',
            fetchedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('[API /matches] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch matches' },
            { status: 500 }
        );
    }
}
