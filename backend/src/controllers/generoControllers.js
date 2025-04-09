var Genero = require('../models/genero');  
var sequelize = require('../models/database');

const controllers = {}

sequelize.sync();

controllers.testdata = async (req, res) => { 
    const response = await sequelize.sync().then(function () {
        /** APAGAR após a primeira EXECUÇÃO 
        // Cria Genero
        Genero.create({
            genero: 'Comédia'
        });
        Genero.create({
            genero: 'Drama'
        });
        Genero.create({
            genero: 'Ação'
        });
        Genero.create({
            genero: 'Romance'
        });
        */
        const data  = Genero.findAll()
        return data;
    })
    .catch(err => {
        return err;
    });
    res.json(response);
}
 
controllers.list = async (req, res) => { 
    const data = await Genero.findAll();
    res.json(data);
}

module.exports = controllers