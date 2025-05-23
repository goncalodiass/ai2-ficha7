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
        Genero.create({
            genero: 'Drama'
        });
        Genero.create({
            genero: 'Ação'
        });
        Genero.create({
            genero: 'Romance'
        });*/
        
        const data = Genero.findAll()
        return data;
    })
        .catch(err => {
            return err;
        });
    res.json(response);
}

controllers.list = async (req, res) => {
    try {
        const data = await Genero.findAll({
            where: { ativo: true }, // Apenas generos ativos
        });
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Erro ao listar generos:", error);
        res.status(500).json({ success: false, message: "Erro ao listar generos." });
    }
};

controllers.get = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Genero.findAll({
            where: { id: id },
        });
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Erro ao obter genero:", error);
        res.status(500).json({ success: false, message: "Erro ao obter genero." });
    }
};

controllers.create = async (req, res) => {
    const { genero } = req.body;
    try {
        const data = await Genero.create({
            genero: genero,
        });
        res.status(200).json({
            success: true,
            message: "Genero registrado com sucesso!",
            data: data,
        });
    } catch (error) {
        console.error("Erro ao criar gênero:", error);
        res.status(500).json({ success: false, message: "Erro ao criar genero." });
    }
};

controllers.update = async (req, res) => {
    const { id } = req.params;
    const { genero } = req.body;
    try {
        const data = await Genero.update(
            { genero: genero },
            { where: { id: id } }
        );
        res.json({ success: true, data: data, message: "Genero atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar genero:", error);
        res.status(500).json({ success: false, message: "Erro ao atualizar genero." });
    }
};

controllers.delete = async (req, res) => {
    const { id } = req.body;
    try {
        // Verifica se o Genero está associado a filmes
        const filmesAssociados = await sequelize.models.filmes.count({
            where: { generoId: id },
        });

        if (filmesAssociados > 0) {
            return res.status(400).json({
                success: false,
                error: "FOREIGN_KEY_CONSTRAINT",
                message: "Não é possível desativar o Genero, pois ele está associado a filmes.",
            });
        }

        // Desativa o Genero
        const result = await Genero.update(
            { ativo: false },
            { where: { id } }
        );

        if (result[0] > 0) {
            res.json({ success: true, message: "Genero desativado com sucesso!" });
        } else {
            res.status(404).json({ success: false, message: "Genero não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao desativar Genero:", error);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

module.exports = controllers;