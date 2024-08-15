import express from 'express';
import {
  getSeasons,
  getTeams,
  getGames,
  getLogos,
  getPlayerDetails,
  createUser,
//   deleteUser,
  createUserTeam,
  deleteUserTeam,
  getFollowedTeams,
  getFollowedPlayers,
  createUserPlayer,
  deleteUserPlayer,

} from '../controllers/nbaController.js';

const router = express.Router();

router.get('/nba/seasons', getSeasons);
router.get('/nba/teams', getTeams);
router.get('/nba/games', getGames);
router.get('/nba/logos', getLogos);
router.get('/nba/player-details', getPlayerDetails);

router.post('/users', createUser)
// router.post('/delete-users', deleteUser)

router.get('/followed-teams', getFollowedTeams)
router.post('/user-teams', createUserTeam);
router.delete('/user-teams/:teamId', deleteUserTeam);

router.get('/followed-players', getFollowedPlayers)
router.post('/user-players', createUserPlayer);
router.delete('/user-players/:playerId', deleteUserPlayer);

export default router;