const server = require("express").Router();
const { Product, Category } = require("../db.js");
const jwt = require('jsonwebtoken');
server.get('/q/:searchTerm', (req, res, next) => {
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm)
    Product.findAll()
        .then(result => {
            const results = result.filter(product => {
                if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return true;
                } else {
                    return product.description.toLowerCase().includes(searchTerm.toLowerCase());
                }
            });

            return res.status(200).send({ results });
        })
        .catch(next);
});

module.exports = server;