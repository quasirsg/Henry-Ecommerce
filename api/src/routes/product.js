const server = require("express").Router();
const { Product, Category } = require("../db.js");

server.get("/", (req, res, next) => {
	Product.findAll({
		attributes: ['id', 'name', 'stock', 'description', 'price', 'image'],
		include: {
			attributes: ['name'],
			model: Category,
			as: 'categories',
			through: {
				attributes: ['category_id']
			}
		}
	})
		.then((products) => {
			return res.status(200).json({ products });
		})
		.catch(next);
});

server.get("/:id", (req, res, next) => {
	var { id } = req.params;

	Product.findOne({ where: { id } })
		.then((products) => {

			if (!products) return res.status(404).json({ message: 'El producto no existe' });

			return res.status(200).json({ products });
		})
		.catch(next);
});

server.post('/', (req, res, next) => {
	const { name, stock, description, price, image } = req.body;

	if (!name || !description || !price || !image)
		return res.status(400).json({ message: 'A parameter is missing' });

	Product.create({
		name,
		stock,
		description,
		price,
		image
	})
		.then(product => {
			return res.status(200).json(product)
		})
		.catch(next)
});

server.put('/:id', (req, res, next) => {
	let { id } = req.params;
	let update = req.body;

	Product.findOne({ where: { id } })
		.then(product => {

			if (!product) return res.status(404).json({ message: 'Product doesnt exist' });

			product.update(update)
				.then(productUpdate => {
					return res.status(200).json(productUpdate)
				})
		})
		.catch(next)
});

server.delete('/:id', (req, res, next) => {
	let { id } = req.params;

	Product.findOne({ where: { id } })
		.then(product => {

			if (!product) return res.status(404).json({ message: 'Product doesnt exist' })

			product.destroy(product)
				.then(() => {
					return res.status(200).json({ message: 'Product deleted' })
				})

		}).catch(next)
});

server.get('/category/:nameCategory', (req, res, next) => {
	const { nameCategory } = req.params;

	Product.findAll({
		include: {
			attributes: ['name'],
			model: Category,
			as: 'categories',
			through: {
				attributes: ['category_id']
			},
			where: {
				name: nameCategory
			}
		}
	})
		.then(data => res.json(data))
		.catch(error => next(error.message))
});

module.exports = server;
