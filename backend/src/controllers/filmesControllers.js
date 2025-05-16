var Filmes = require('../models/filmes');
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
        // Cria Filme 
        Filmes.create({
            título: 'American pyscho',
            descrição: 'american pyscho',
            foto: 'americanpyscho.jpg',
            generoId: 1
        })**/

        const data = Filmes.findAll()
        return data;
    })
        .catch(err => {
            return err;
        });
    res.json(response);
}

controllers.list = async (req, res) => {
    const data = await Filmes.findAll({
        where: { ativo: true }, // Apenas filmes ativos
        include: [Genero]
    })
        .then((data) => data)
        .catch((error) => error);

    res.json({ success: true, data: data });
}

controllers.get = async (req, res) => {
    const { id } = req.params;
    const data = await Filmes.findAll({
        where: { id: id },
        include: [Genero]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.create = async (req, res) => {
    // data 
    const { titulo, descricao, foto, genero } = req.body;

    // create 
    const data = await Filmes.create({
        título: titulo,
        descrição: descricao,
        foto: foto,
        generoId: genero
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        });
    // return res
    res.status(200).json({
        success: true,
        message: "Registado",
        data: data
    });
};

controllers.update = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, foto, genero } = req.body;

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
    )
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });

    res.json({ success: true, data: data, message: "Atualizado com sucesso!" });
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
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

module.exports = controllers;
