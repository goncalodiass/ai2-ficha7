var Filmes = require('../models/filmes');
var Genero = require('../models/genero');
var sequelize = require('../models/database');

const controllers = {};

sequelize.sync();

controllers.testdata = async (req, res) => {
    const response = await sequelize.sync().then(function () {
        /*
        //APAGAR após a primeira EXECUÇÃO 
        // Cria Genero
       Genero.create({
            genero: 'Comédia'
        });
        // Cria Filme 
        Filmes.create({
            título: 'American Pyscho',
            descrição: 'Em Nova York, em 1987, o belo jovem profissional Patrick Bateman tem uma segunda vida como um horrível assassino em série durante a noite. O elenco é formado pelo detetive, a noiva, a amante, o colega de trabalho e a secretária. Esta é uma comédia de humor seco que examina os elementos que transformam um homem em um monstro',
            foto: 'https://m.media-amazon.com/images/M/MV5BNzBjM2I5ZjUtNmIzNy00OGNkLWIwZDMtOTAwYWUwMzA2YjdlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            generoId: 1
        })
        Filmes.create({
            título: 'Fight Club	',
            descrição: 'rule 1: you do not talk about Fight Club',
            foto: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            generoId: 1
        })
        Filmes.create({
            título: 'Scarface',
            descrição: 'The World is Yours',
            foto: 'https://m.media-amazon.com/images/M/MV5BNDUzYjY0NmUtMDM4OS00Y2Q5LWJiODYtNTk0ZTk0YjZhMTg1XkEyXkFqcGc@._V1_.jpg',
            generoId: 1
        })*/

        const data = Filmes.findAll()
        return data;
    })
        .catch(err => {
            return err;
        });
    res.json(response);
}


controllers.list = async (req, res) => {
    try {
        const data = await Filmes.findAll({
            where: { ativo: true }, // Apenas filmes ativos
            include: [Genero],
        });
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Erro ao listar filmes:", error);
        res.status(500).json({ success: false, message: "Erro ao listar filmes." });
    }
};

controllers.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Filmes.findAll({
            where: { id: id },
            include: [Genero],
        });
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Erro ao obter filme:", error);
        res.status(500).json({ success: false, message: "Erro ao obter filme." });
    }
};

controllers.create = async (req, res) => {
    const { titulo, descricao, foto, genero } = req.body;
    try {
        const data = await Filmes.create({
            título: titulo,
            descrição: descricao,
            foto: foto,
            generoId: genero,
        });
        res.status(200).json({
            success: true,
            message: "Filme registrado com sucesso!",
            data: data,
        });
    } catch (error) {
        console.error("Erro ao criar filme:", error);
        res.status(500).json({ success: false, message: "Erro ao criar filme." });
    }
};

controllers.update = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, foto, genero } = req.body;
    try {
        const data = await Filmes.update(
            {
                título: titulo,
                descrição: descricao,
                foto: foto,
                generoId: genero,
            },
            {
                where: { id: id },
            }
        );
        res.json({ success: true, data: data, message: "Filme atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
        res.status(500).json({ success: false, message: "Erro ao atualizar filme." });
    }
};

controllers.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Filmes.update(
            { ativo: false },
            { where: { id } }
        );

        if (result[0] > 0) {
            res.json({ success: true, message: "Filme desativado com sucesso!" });
        } else {
            res.status(404).json({ success: false, message: "Filme não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao desativar filme:", error);
        res.status(500).json({ success: false, message: "Erro ao desativar filme." });
    }
};

module.exports = controllers;
