const server = require('express').Router();
const express = require('express');
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});


server.post('/', (req, res) =>{
	const {name, stock, description, price, enter_date, image} = req.body;
	Product.create({
		name: name,
		stock: stock,
		description: description,
		price: price,
		enter_date: enter_date,
		image: image
	}).then( product=> {
		res.send(product)
	})
});


server.put('/:id', (req, res)=>{
	let productId = req.params.id
	let update= req.body

	Product.findOne({where: {id: productId}})
		.then(product=> {
			product.update(update)
			.then(productUpdate =>{
				res.json(productUpdate)
			})
		})
		
});


server.delete('/:id', (req,res)=>{
	let productId = req.params.id
	
		Product.destroy({where:{id: productId}}).then(()=>{
			res.send('Product deleted')
		});

});

module.exports = server;
