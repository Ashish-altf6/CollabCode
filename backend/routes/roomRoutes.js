const express = require('express');
const {
  getUserRooms,
  createRoom,
  deleteRoom,
  joinRoom
} = require('../controllers/roomController');

const router = express.Router();

router.get('/:userId', getUserRooms);
router.post('/', createRoom);
router.post('/join', joinRoom);
router.delete('/:roomId', deleteRoom);

module.exports = router;
