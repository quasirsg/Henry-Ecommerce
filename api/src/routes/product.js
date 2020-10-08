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



server.post('/', (req, res, next) =>{
	const {name, stock, description, price, enter_date, image} = req.body;

	if (!name || !description || !price || !image)
		return res.status(400).send('a parameter is missing');

	Product.create({
		name: name,
		stock: stock,
		description: description,
		price: price,
		enter_date: enter_date,
		image: image
	}).then( product=> {
		return res.status(200).send(product)
	}).catch(next)
});


server.put('/:id', (req, res, next)=>{
	let productId = req.params.id
	let update= req.body

	Product.findOne({where: {id: productId}})
		.then(product=> {
			if (product === null) {
				return res.status(404).send({message:'Product doesnt exist'});
			}
			product.update(update)
			.then(productUpdate =>{
				return res.status(200).json(productUpdate)
			})
		})
		.catch(next)
		
});


server.delete('/:id', (req,res,next)=>{
	let productId = req.params.id
	
	Product.findOne({where:{id: productId}})
		.then(product=> {
			if (product === null) {
				return res.status(404).send({message:'Product doesnt exist'})
			}
			product.destroy(product)
			.then(()=>{
				return res.status(200).send('Product deleted')
			});
		
		}).catch(next)
 });

module.exports = server;
