import express from 'express';
import {
  getSeasons,
  getTeams,
  getGames,
  getLogos,
  getPlayerDetails,
} from '../controllers/nbaController.js';

const router = express.Router();

router.get('/seasons', getSeasons);
router.get('/teams', getTeams);
router.get('/games', getGames);
router.get('/logos', getLogos);
router.get('/player-details', getPlayerDetails);

export default router;