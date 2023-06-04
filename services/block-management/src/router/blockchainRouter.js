const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.get('/blocks', blockchainController.getBlocks);
router.post('/blocks', blockchainController.createBlock);

module.exports = router;
