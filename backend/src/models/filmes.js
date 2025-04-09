
var Sequelize = require('sequelize');
var sequelize = require('./database');

// importa o modelo – chave forasteira generoID
var Genero = require('./genero');
var Filmes = sequelize.define('filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    título: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descrição: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    foto: {
        type: Sequelize.STRING
    },
    generoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
            model: Genero,
            key: 'id'
        },
    },
}, 
{
        timestamps: false,
});

Filmes.belongsTo(Genero);
module.exports = Filmes;
