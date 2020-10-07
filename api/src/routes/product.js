const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/:id', (req, res, next) => {
	var productId = req.params.id;

	Product.findOne({
		id:productId
	})
		.then(product => {
			res.send(product);
		})
		.catch(next);
});

module.exports = server;
