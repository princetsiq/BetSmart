import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const callPythonScript = (scriptName, args = []) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python', [scriptName, ...args]);
    let data = '';

    process.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on('data', (chunk) => {
      console.error(`Error: ${chunk}`);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(`Process exited with code ${code}`);
      } else {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(`Error parsing JSON: ${error.message}`);
        }
      }
    });
  });
};

app.get('/api/nba/seasons', async (_req, res) => {
  try {
    const seasons = [
      "2013-14", "2014-15", "2015-16", "2016-17", 
      "2017-18", "2018-19", "2019-20", "2020-21", 
      "2021-22", "2022-23", "2023-24"
    ];
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seasons' });
  }
});

app.get('/api/nba/teams', async (_req, res) => {
  try {
    const teams = await callPythonScript('fetch_nba_data.py', ['teams']);
    res.json(teams);
  } catch (error) {
    console.error(`Error fetching teams: ${error}`);
    res.status(500).json({ error: 'Failed to fetch teams data' });
  }
});

app.get('/api/nba/games', async (req, res) => {
  const { season, seasonType } = req.query;
  try {
    const games = await callPythonScript('fetch_nba_data.py', ['games', season, seasonType]);
    res.json(games);
  } catch (error) {
    console.error(`Error fetching games: ${error}`);
    res.status(500).json({ error: 'Failed to fetch games data' });
  }
});

app.get('/api/nba/logos', async (_req, res) => {
  try {
    const logos = await callPythonScript('fetch_team_info.py', ['logos']);
    res.json(logos);
  } catch (error) {
    console.error(`Error fetching logos: ${error}`);
    res.status(500).json({ error: 'Failed to fetch logos data' });
  }
});


app.get('/api/nba/player-details', async (req, res) => {
  const { teamId } = req.query;
  try {
    const playerDetails = await callPythonScript('fetch_team_info.py', ['players', teamId]);
    res.json(playerDetails);
  } catch (error) {
    console.error(`Error fetching player images: ${error}`);
    res.status(500).json({ error: 'Failed to fetch player images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});