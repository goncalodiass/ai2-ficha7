var Sequelize = require('sequelize');
var sequelize = require('./database');

var Genero = sequelize.define('genero', {
    genero: Sequelize.STRING,
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, // Por padrão, o Gênero será ativo
    }
},
{
    timestamps: false,
});

module.exports = Genero;