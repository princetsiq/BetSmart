import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const callPythonScript = (scriptName, args = []) => {
  return new Promise((resolve, reject) => {
    const process = spawn("python", [scriptName, ...args]);
    let data = "";

    process.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on("data", (chunk) => {
      console.error(`Error: ${chunk}`);
    });

    process.on("close", (code) => {
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

app.post("/api/predict", async (req, res) => {
  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const prediction = await response.json();
    res.json(prediction);
  } catch (error) {
    console.error(`Error calling prediction API: ${error}`);
    res.status(500).json({ error: "Failed to get prediction" });
  }
});

app.get("/api/nba/teams", async (req, res) => {
  try {
    const teams = await callPythonScript("fetch_nba_data.py", ["teams"]);
    res.json(teams);
  } catch (error) {
    console.error(`Error fetching teams: ${error}`);
    res.status(500).json({ error: "Failed to fetch teams data" });
  }
});

// app.get('/api/nba/games', async (req, res) => {
//   try {
//     const games = await callPythonScript('fetch_nba_data.py', ['games']);
//     res.json(games);
//   } catch (error) {
//     console.error(`Error fetching games: ${error}`);
//     res.status(500).json({ error: 'Failed to fetch games data' });
//   }
// });

app.get("/api/nba/games", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.page_size, 10) || 9;

  try {
    const games = await callPythonScript("fetch_nba_data.py", [
      "games",
      page,
      pageSize,
    ]);
    res.json(games);
  } catch (error) {
    console.error(`Error fetching games: ${error}`);
    res.status(500).json({ error: "Failed to fetch games data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
