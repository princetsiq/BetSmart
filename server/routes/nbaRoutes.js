import express from 'express';
import multer from 'multer';
import {
  getSeasons,
  getTeams,
  getGames,
  getLogos,
  getPlayerDetails,
  createUser,
  deleteUser,
  getUsername,
  updateUsername,
  getProfilePicture,
  updateProfilePicture,
  deleteProfilePicture,
  getFollowedTeams,
  getMyTeams,
  createUserTeam,
  deleteUserTeam,
  getFollowedPlayers,
  getMyPlayers,
  createUserPlayer,
  deleteUserPlayer,
} from '../controllers/nbaController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/nba/seasons', getSeasons);
router.get('/nba/teams', getTeams);
router.get('/nba/games', getGames);
router.get('/nba/logos', getLogos);
router.get('/nba/player-details', getPlayerDetails);

router.post('/create-user', createUser);
router.delete('/delete-user', deleteUser)

router.get('/get-username', getUsername);
router.put('/update-username', updateUsername);

router.get('/get-picture', getProfilePicture);
router.put('/update-picture', upload.single('profilePicture'), updateProfilePicture);
router.delete('/delete-picture', deleteProfilePicture);

router.get('/followed-teams', getFollowedTeams);
router.get('/my-teams', getMyTeams);
router.post('/user-teams', createUserTeam);
router.delete('/user-teams/:teamId', deleteUserTeam);

router.get('/followed-players', getFollowedPlayers);
router.get('/my-players', getMyPlayers);
router.post('/user-players', createUserPlayer);
router.delete('/user-players/:playerId', deleteUserPlayer);

export default router;