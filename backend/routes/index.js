const express = require('express');
const fileRoutes = require('./fileRoutes');
const roomRoutes = require('./roomRoutes');

const router = express.Router();

router.use('/files', fileRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;
