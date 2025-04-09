var Sequelize = require('sequelize');
var sequelize = require('./database');

var Genero = sequelize.define('genero', {
    genero: Sequelize.STRING
    },
    {
        timestamps: false,
    }
);

module.exports = Genero