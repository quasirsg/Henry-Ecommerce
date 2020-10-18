const server = require("express").Router();
const { Product, Category, product_category } = require("../db.js");

server.get("/", (req, res, next) => {
	Product.findAll({
		attributes: ['id', 'name', 'stock', 'description', 'price', 'image'],
		include: {
			attributes: ['id', 'name'],
			model: Category,
			through: {
				attributes: []
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

	Product.findOne({
		where: { id },
		attributes: ['id', 'name', 'stock', 'description', 'price', 'image'],
		include: {
			attributes: ['id', 'name'],
			model: Category,
			through: {
				attributes: []
			}
		}
	})
		.then((products) => {
			if (!products) return res.status(404).json({ message: 'El producto no existe' });

			return res.status(200).json({ products });
		})
		.catch(next);
});

server.post('/', async (req, res, next) => {
	const { name, stock, description, price, image, category } = req.body;
	//Validar campos
	if (!name || !description || !price || !image)
		return res.status(400).json({ message: 'A parameter is missing' });

	try {
		//Agregar el producto
		const product = await Product.create({ name, stock, description, price, image });
		//Asignar categorias al producto
		await product.setCategories(category);
		//Devolver el producto con sus categorias
		const newProduct = await Product.findOne({
			where: { id: product.id },
			attributes: ['id', 'name', 'stock', 'description', 'price', 'image'],
			include: {
				attributes: ['id', 'name'],
				model: Category,
				through: { attributes: [] }
			}
		});
		return res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}

});

server.put('/:id', (req, res, next) => {
	let { id } = req.params;
	let dataProduct = req.body;

	Product.update(dataProduct, { where: { id } })
		.then(response => {
			Product.findOne({
				where: { id },
				attributes: ['id', 'name', 'stock', 'description', 'price', 'image'],
				include: {
					attributes: ['id', 'name'],
					model: Category,
					through: { attributes: [] }
				}
			})
				.then(product => {
					return res.status(200).json(product)
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
			through: {
				attributes: []
			},
			where: {
				name: nameCategory
			}
		}
	})
		.then(data => res.json(data))
		.catch(error => next(error.message))
});

// ================== Agregar y quitar categorias de un producto================

server.post('/:idProducto/category/:idCategoria', (req, res, next) => {
	const { idProducto, idCategoria } = req.params;

	product_category.findOrCreate({
		where: {
			product_id: idProducto,
			category_id: idCategoria
		}
	})
		.then(() => {
			return res.status(200).json({ message: 'Categoria se asigno correctamente a producto' })
		})
		.catch(error => next(error.message));
});

server.delete('/:idProducto/category/:idCategoria', (req, res, next) => {
	const { idProducto, idCategoria } = req.params;

	product_category.destroy({
		where: {
			product_id: idProducto,
			category_id: idCategoria
		}
	})
		.then(() => {
			return res.status(200).json({ message: 'Categoria se elimino correctamente de producto' })
		})
		.catch(error => next(error.message));
});

module.exports = server;
