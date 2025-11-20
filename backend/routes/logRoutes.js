
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logcontroller');
const { verifyToken } = require('../middleware/auth');

router.post('/log', verifyToken, logController.saveLogHandler);
router.get('/log/:userId', verifyToken, logController.getLog);
module.exports = router;
