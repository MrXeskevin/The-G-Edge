require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const BASE = "https://api.football-data.org/v4";
const HEADERS = {
    "X-Auth-Token": process.env.FOOTBALL_DATA_KEY
};

const LEAGUES = [2021, 2001, 2014, 2019, 2002, 2015];

// Live matches
app.get("/api/live", async (req, res) => {
    try {
        console.log(`Fetching live matches...`);
        const response = await axios.get(`${BASE}/matches?status=LIVE`, { headers: HEADERS });
        const allMatches = response.data.matches || [];

        // Filter by allowed leagues
        const matches = allMatches.filter(m => LEAGUES.includes(m.competition.id));
        console.log(`Live matches found: ${matches.length} (out of ${allMatches.length} total live)`);

        res.json(matches);
    } catch (err) {
        console.error("Error fetching live matches:", err.message);
        if (err.response) console.error(err.response.data);
        res.status(500).json([]);
    }
});

// Upcoming matches (next 7 days)
app.get("/api/upcoming", async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];
        const future = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
        console.log(`Fetching upcoming from ${today} to ${future}`);

        const response = await axios.get(
            `${BASE}/matches?dateFrom=${today}&dateTo=${future}`,
            { headers: HEADERS }
        );

        const allMatches = response.data.matches || [];

        // Filter by allowed leagues
        const matches = allMatches
            .filter(m => LEAGUES.includes(m.competition.id))
            .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

        console.log(`Upcoming matches found: ${matches.length} (out of ${allMatches.length} total upcoming)`);
        res.json(matches);
    } catch (err) {
        console.error("Error fetching upcoming matches:", err.message);
        if (err.response) console.error(err.response.data);
        res.status(500).json([]);
    }
});

app.listen(5001, () => {
    console.log("G-Edge backend running on port 5001");
});
