const express = require('express');
const router = express.Router();

// importer os controladores [2]
const generoControllers = require('../controllers/generoControllers');


// Rotas
router.get('/save', (req, res) => {
    res.json({status: 'Genero Saved'});
});

router.get('/testdata', generoControllers.testdata);

router.get('/list', generoControllers.list);

router.get('/get/:id', generoControllers.get);

router.post('/create', generoControllers.create);

router.put('/update/:id', generoControllers.update);

router.post('/delete', generoControllers.delete);




module.exports = router;