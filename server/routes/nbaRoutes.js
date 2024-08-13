import express from 'express';
import {
  getSeasons,
  getTeams,
  getGames,
  getLogos,
  getPlayerDetails,
  createUser,
  createUserTeam,
  deleteUserTeam,
  getFollowedTeams,
//   deleteUser,
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

export default router;