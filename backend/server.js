const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Contest Tracker API is running' });
});

app.get('/api/contests', async (req, res) => {
  try {
    const nowISO = new Date().toISOString();

    const url =
      `https://clist.by/api/v4/contest/` +
      `?limit=100` +
      `&start__gte=${nowISO}` +
      `&order_by=start`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `ApiKey ${process.env.CLIST_USERNAME}:${process.env.CLIST_API_KEY}`,
      },
    });

    const allowedPlatforms = [
      'codeforces',
      'codechef',
      'leetcode',
      'atcoder',
      'topcoder',
      'hackerrank',
      'hackerearth',
    ];

    const contests = response.data.objects
      .filter(contest =>
        allowedPlatforms.some(p =>
          contest.resource?.toLowerCase().includes(p)
        )
      )
      .map(contest => ({
        id: contest.id,
        name: contest.event,
        site: contest.resource,
        start_time: contest.start,
        duration: contest.duration,
        url: contest.href,
      }));

    res.json({
      success: true,
      contests,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contests',
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
