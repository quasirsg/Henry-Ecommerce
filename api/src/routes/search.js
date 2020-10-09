const server = require("express").Router();
const { Product } = require("../db.js");

server.get('/q/:searchTerm', (req, res, next) => {
    const searchTerm = req.params.searchTerm;
    Product.findAll({})
        .then(result => {
            const results = result.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
            return res.status(200).send({ results });
        })
        .catch(next);
});

module.exports = server;