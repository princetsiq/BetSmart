// import User from '../models/user.js';
import { callPythonScript } from '../services/pythonService.js';
import db from '../models/index.js'; 
const { User } = db;

export const getSeasons = async (_req, res) => {
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
};

export const getTeams = async (_req, res) => {
  try {
    const teams = await callPythonScript('fetch_nba_data.py', ['teams']);
    res.json(teams);
  } catch (error) {
    console.error(`Error fetching teams: ${error}`);
    res.status(500).json({ error: 'Failed to fetch teams data' });
  }
};

export const getGames = async (req, res) => {
  const { season, seasonType } = req.query;
  try {
    const games = await callPythonScript('fetch_nba_data.py', ['games', season, seasonType]);
    res.json(games);
  } catch (error) {
    console.error(`Error fetching games: ${error}`);
    res.status(500).json({ error: 'Failed to fetch games data' });
  }
};

export const getLogos = async (_req, res) => {
  try {
    const logos = await callPythonScript('fetch_team_info.py', ['logos']);
    res.json(logos);
  } catch (error) {
    console.error(`Error fetching logos: ${error}`);
    res.status(500).json({ error: 'Failed to fetch logos data' });
  }
};

export const getPlayerDetails = async (req, res) => {
  const { teamId } = req.query;
  try {
    const playerDetails = await callPythonScript('fetch_team_info.py', ['players', teamId]);
    res.json(playerDetails);
  } catch (error) {
    console.error(`Error fetching player images: ${error}`);
    res.status(500).json({ error: 'Failed to fetch player images' });
  }
};

export const createUser = async (req, res) => {
  const { email, username, firstName, lastName } = req.body;
  try {
    const newUser = await User.create({ email, username, first_name: firstName, last_name: lastName });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};