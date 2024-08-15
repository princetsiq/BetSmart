import { callPythonScript } from '../services/pythonService.js';
import db from '../models/index.js'; 
const { User, UserTeam, UserPlayer } = db;

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
    const newUser = await User.create({ 
      email, 
      username, 
      first_name: firstName, 
      last_name: lastName 
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const createUserTeam = async (req, res) => {
  const { teamId, email } = req.body;

  try {
    const newUserTeam = await UserTeam.create({ 
      user_email: email, 
      team_id: teamId 
    });
    res.status(201).json(newUserTeam);
  } catch (error) {
    console.error('Error following team:', error);
    res.status(500).json({ error: 'Failed to follow team' });
  }
};

export const deleteUserTeam = async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;

  try {
    const result = await UserTeam.destroy({
      where: { 
        user_email: email, 
        team_id: teamId 
      },
    });

    if (result > 0) {
      res.status(200).json({ message: 'Team unfollowed successfully' });
    } else {
      res.status(404).json({ error: 'Team not found or not followed' });
    }
  } catch (error) {
    console.error('Error unfollowing team:', error);
    res.status(500).json({ error: 'Failed to unfollow team' });
  }
};

export const getFollowedTeams = async (req, res) => {
  const userEmail = req.query.email;  

  try {
    const followedTeams = await UserTeam.findAll({
      where: { user_email: userEmail },
      attributes: ['team_id'], 
    });
    
    const teamIds = followedTeams.map(team => team.team_id);
    res.status(200).json(teamIds); 
  } catch (error) {
    console.error('Error fetching followed teams:', error);
    res.status(500).json({ error: 'Failed to fetch followed teams' });
  }
};

export const createUserPlayer = async (req, res) => {
  const { playerId, email } = req.body;

  try {
    const newUserPlayer = await UserPlayer.create({ 
      user_email: email, 
      player_id: playerId 
    });
    res.status(201).json(newUserPlayer);
  } catch (error) {
    console.error('Error following player:', error);
    res.status(500).json({ error: 'Failed to follow player' });
  }
};

export const deleteUserPlayer = async (req, res) => {
  const { playerId } = req.params;
  const { email } = req.body;

  try {
    const result = await UserPlayer.destroy({
      where: { 
        user_email: email, 
        player_id: playerId 
      },
    });

    if (result > 0) {
      res.status(200).json({ message: 'Player unfollowed successfully' });
    } else {
      res.status(404).json({ error: 'Player not found or not followed' });
    }
  } catch (error) {
    console.error('Error unfollowing player:', error);
    res.status(500).json({ error: 'Failed to unfollow player' });
  }
};

export const getFollowedPlayers = async (req, res) => {
  const userEmail = req.query.email;  

  try {
    const followedPlayers = await UserPlayer.findAll({
      where: { user_email: userEmail },
      attributes: ['player_id'], 
    });
    
    const playerIds = followedPlayers.map(player => player.player_id);
    res.status(200).json(playerIds); 
  } catch (error) {
    console.error('Error fetching followed players:', error);
    res.status(500).json({ error: 'Failed to fetch followed players' });
  }
};