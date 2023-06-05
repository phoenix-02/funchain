const express = require('express');
const P2PNetwork = require('../controllers/p2pNetwork');

const router = express.Router();
const network = new P2PNetwork();

router.get('/:key', (req, res) => {
    const { key } = req.params;
    network.get(key).once((data) => {
        res.json(data);
    });
});

router.post('/:key', (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    network.put(key, value);
    res.json({ success: true });
});

module.exports = router;
