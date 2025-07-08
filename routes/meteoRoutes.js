const express = require('express');
const router = express.Router();
const meteoController = require('../controllers/meteoController');

// Route principale de la météo
router.get('/', meteoController.getAllMeteo);


module.exports = router;
