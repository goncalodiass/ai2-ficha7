const express = require('express');
const router = express.Router();

// importer os controladores [2]
const filmeControllers = require('../controllers/filmesControllers');


// Rotas
router.get('/save', (req, res) => {
    res.json({status: 'Filme Saved'});
});

router.get('/testdata', filmeControllers.testdata);

router.get('/list', filmeControllers.list);

router.get('/get/:id', filmeControllers.get);

router.post('/create', filmeControllers.create);

router.put('/update/:id', filmeControllers.update);

router.post('/delete', filmeControllers.delete);




module.exports = router;