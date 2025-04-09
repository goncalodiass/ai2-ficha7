var Filmes = require('../models/filmes');
var Genero = require('../models/genero');  
var sequelize = require('../models/database');

const controllers = {}

sequelize.sync();

controllers.testdata = async (req, res) => { 
    const response = await sequelize.sync().then(function () {
        /** APAGAR após a primeira EXECUÇÃO **/
        // Cria Genero
        Genero.create({
            genero: 'Comédia'
        });
        // Cria Filme 
        Filmes.create ({
            título: 'American pyscho',
            descrição: 'american pyscho',
            foto: 'americanpyscho.jpg',
            generoId: 1
        })
    
        const data  = Filmes.findAll()
        return data;
    })
    .catch(err => {
        return err;
    });
    res.json(response);
}
 
controllers.list = async (req, res) => { 
    const data = await Filmes.findAll();
    res.json(data);
}

module.exports = controllers