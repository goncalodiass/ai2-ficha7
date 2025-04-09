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
    const data = await Genero.findAll()
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.get = async (req, res) => {
    const { id } = req.params;
    const data = await Genero.findAll({
        where: { id: id }
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
    const { genero } = req.body;

    // create 
    const data = await Genero.create({
        genero: genero,
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: "+error)
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
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { genero } = req.body;
    // Update data
    const data = await Genero.update({
        genero: genero
    },
        {
            where: { id: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Updated successful" });
}

controllers.delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Genero.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

module.exports = controllers