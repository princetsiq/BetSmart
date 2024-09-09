import { callPythonScript } from '../services/pythonService.js';
import db from '../models/index.js'; 
const { User, UserTeam, UserPlayer, UserPfp } = db;

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

export const getMyTeams = async (req, res) => {
  const { teamIds } = req.query;

  try {
    const teamDetails = await callPythonScript('fetch_nba_data.py', ['followed', ...teamIds]);
    res.json(teamDetails);

  } catch (error) {
    console.error(`Error fetching individual team details: ${error}`);
    res.status(500).json({ error: 'Failed to fetch team details' });
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
    console.error(`Error fetching player details: ${error}`);
    res.status(500).json({ error: 'Failed to fetch player details' });
  }
};

export const getMyPlayers = async (req, res) => {
  const { playerIds } = req.query;

  try {
    const playerDetails = await callPythonScript('fetch_team_info.py', ['followed', ...playerIds]);

    res.json(playerDetails);
  } catch (error) {
    console.error(`Error fetching individual player details: ${error}`);
    res.status(500).json({ error: 'Failed to fetch player details' });
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

export const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await User.destroy({
      where: { email }, 
    });

    if (result > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const getUsername = async (req, res) => {
  const userEmail = req.query.email;

  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ['username'],
    });

    res.send(user.username);
  } catch (error) {
    console.error('Error fetching username:', error);
    res.status(500).json({ error: 'Failed to fetch username' });
  }
};

export const updateUsername = async (req, res) => {
  const { userEmail, username } = req.body;

  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    await user.save();
    res.json({ message: 'Username updated successfully' });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ error: 'Failed to update username' });
  }
};

export const getProfilePicture = async (req, res) => {
  const userEmail = req.query.email;

  try {
    const userPfp = await UserPfp.findOne({ where: { email: userEmail } });

    if (!userPfp) {
      return res.status(404).json({ error: 'User profile picture not found' });
    }

    let imageBase64 = null;
    if (userPfp.image) {
      imageBase64 = `data:image/jpeg;base64,${userPfp.image.toString('base64')}`;
    }

    res.json({
      pfpType: userPfp.pfpType,
      initials: userPfp.initials,
      image: imageBase64, 
    });
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ error: 'Failed to fetch profile picture' });
  }
};

export const updateProfilePicture = async (req, res) => {
  const { email, pfpType, initials } = req.body;
  const image = req.file;

  try {
    const userPfp = await UserPfp.findOne({ where: { email } });

    if (!userPfp) {
      return res.status(404).json({ error: 'User profile picture not found' });
    }

    if (pfpType) userPfp.pfpType = pfpType;
    if (initials) userPfp.initials = initials;
    // if (initials !== undefined && initials !== null) userPfp.initials = initials;
    if (image) userPfp.image = image.buffer;

    // if (pfpType) userPfp.pfpType = pfpType;
    // if (pfpType === 'initials') {
    //   if (initials) {
    //     userPfp.initials = initials;
    //   } else {
    //     return res.status(400).json({ error: 'Initials are required when pfpType is initials' });
    //   }
    // } else {
    //   userPfp.initials = null;
    // }

    // if (pfpType === 'image') {
    //   if (image) {
    //     userPfp.image = image;
    //   } else {
    //     return res.status(400).json({ error: 'Image is required when pfpType is image' });
    //   }
    // } else {
    //   userPfp.image = null;
    // }

    await userPfp.save();

    res.json({ message: 'Profile picture updated successfully', userPfp });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
};

export const deleteProfilePicture = async (req, res) => {
  const { email } = req.body;

  try {
    const userPfp = await UserPfp.findOne({ where: { email } });

    if (!userPfp) {
      return res.status(404).json({ error: 'User profile picture not found' });
    }

    userPfp.pfpType = 'silhouette';
    userPfp.image = null;

    await userPfp.save();

    res.json({ message: 'Profile picture reset to default silhouette', userPfp });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ error: 'Failed to delete profile picture' });
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