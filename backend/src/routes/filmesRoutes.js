const express = require('express');
const router = express.Router();

// importer os controladores [2]
const filmeControllers = require('../controllers/filmesControllers');

router.get('/save', (req, res) => {
    res.json({status: 'Filme Saved'});
});

router.get('/testdata', filmeControllers.testdata);

router.get('/list', filmeControllers.list);


module.exports = router;