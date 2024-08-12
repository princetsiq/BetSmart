import express from 'express';
import {
  getSeasons,
  getTeams,
  getGames,
  getLogos,
  getPlayerDetails,
  createUser,
} from '../controllers/nbaController.js';

const router = express.Router();

router.get('/nba/seasons', getSeasons);
router.get('/nba/teams', getTeams);
router.get('/nba/games', getGames);
router.get('/nba/logos', getLogos);
router.get('/nba/player-details', getPlayerDetails);
router.post('/users', createUser)

export default router;