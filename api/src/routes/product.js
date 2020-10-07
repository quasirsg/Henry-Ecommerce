const server = require("express").Router();
const { Product } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll({})
    .then((products) => {
      // console.log(products);
      return res.status(200).send({ products });
    })
    .catch(next);
});

server.get("/:id", (req, res, next) => {
  var productId = req.params.id;
  
  Product.findOne({
    where: { id: productId },
  })
    .then((products) => {
	  // console.log(products);
	  if (products === null) {
		  return res.status(404).send({message:'El proyecto no existe'});
	  }
      return res.status(200).send({ products });
    })
    .catch(next);
});

module.exports = server;
